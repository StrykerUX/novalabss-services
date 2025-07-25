import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const BRANDING_EXPERT_PROMPT = `
Eres un experto en branding y diseño web con 15 años de experiencia ayudando a empresas a definir su identidad visual. 

Tu tarea es analizar la información del negocio del cliente y sus preferencias para generar recomendaciones específicas y profesionales de branding.

REGLAS IMPORTANTES:
1. Las recomendaciones deben ser específicas para la industria del cliente
2. Los colores deben estar en formato hexadecimal válido
3. El estilo debe ser coherente con el objetivo del negocio
4. Incluye justificación psicológica de las decisiones
5. Considera la audiencia objetivo
6. Responde SIEMPRE en formato JSON válido
7. Sé conciso pero específico en las recomendaciones
`

interface BrandingRequest {
  prompt: string
  brandingQuestions: {
    personality: string
    emotion: string
    differentiation: string
  }
}

export async function POST(request: NextRequest) {
  try {
    const { prompt, brandingQuestions } = await request.json() as BrandingRequest

    if (!prompt || !brandingQuestions) {
      return NextResponse.json(
        { error: 'Missing required data for AI analysis' },
        { status: 400 }
      )
    }

    console.log('🤖 Starting AI branding analysis...')

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: BRANDING_EXPERT_PROMPT
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 1000
    })

    const responseContent = completion.choices[0].message.content
    
    if (!responseContent) {
      throw new Error('No response from OpenAI')
    }

    const aiAnalysis = JSON.parse(responseContent)

    // Validar que el response tenga la estructura esperada
    const requiredFields = ['brandPersonality', 'recommendedColors', 'styleDirection', 'confidence']
    const missingFields = requiredFields.filter(field => !(field in aiAnalysis))
    
    if (missingFields.length > 0) {
      console.error('❌ Missing fields in AI response:', missingFields)
      throw new Error(`AI response missing fields: ${missingFields.join(', ')}`)
    }

    // Validar formato de colores
    if (aiAnalysis.recommendedColors && Array.isArray(aiAnalysis.recommendedColors)) {
      aiAnalysis.recommendedColors = aiAnalysis.recommendedColors.map((colorItem: any) => {
        if (typeof colorItem === 'string') {
          return { color: colorItem, name: 'Color recomendado', usage: 'General' }
        }
        return colorItem
      }).filter((colorItem: any) => {
        // Validar formato hexadecimal
        return colorItem.color && /^#[0-9A-F]{6}$/i.test(colorItem.color)
      })
    }

    // Asegurar que confidence esté entre 0 y 1
    if (aiAnalysis.confidence > 1) {
      aiAnalysis.confidence = aiAnalysis.confidence / 100
    }

    console.log('✅ AI analysis completed successfully')
    console.log('📊 Confidence:', aiAnalysis.confidence)
    console.log('🎨 Style direction:', aiAnalysis.styleDirection)
    console.log('🌈 Colors count:', aiAnalysis.recommendedColors?.length || 0)

    return NextResponse.json({
      success: true,
      analysis: aiAnalysis,
      metadata: {
        model: "gpt-4o-mini",
        timestamp: new Date().toISOString(),
        inputData: {
          personality: brandingQuestions.personality,
          emotion: brandingQuestions.emotion,
          hasDifferentiation: !!brandingQuestions.differentiation
        }
      }
    })

  } catch (error) {
    console.error('❌ AI branding analysis error:', error)
    
    // Error específico de OpenAI
    if (error instanceof Error && error.message.includes('API key')) {
      return NextResponse.json(
        { error: 'OpenAI API configuration error' },
        { status: 500 }
      )
    }

    // Error de parsing JSON
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid JSON response from AI' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        error: 'AI analysis failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Endpoint para verificar el estado de la API de OpenAI
export async function GET() {
  try {
    // Test simple para verificar conectividad
    const testCompletion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: "Test connection. Respond with 'OK'." }
      ],
      max_tokens: 5
    })

    return NextResponse.json({
      status: 'healthy',
      message: 'OpenAI API is working',
      model: 'gpt-4o-mini',
      response: testCompletion.choices[0].message.content
    })

  } catch (error) {
    return NextResponse.json(
      { 
        status: 'error',
        message: 'OpenAI API not accessible',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}