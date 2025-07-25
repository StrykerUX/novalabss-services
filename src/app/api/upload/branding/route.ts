import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_TYPES = {
  logo: ['.png', '.svg', '.pdf', '.jpg', '.jpeg'],
  brandGuide: ['.pdf', '.doc', '.docx'],
  images: ['.png', '.jpg', '.jpeg', '.webp']
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('files') as File[]
    const type = formData.get('type') as string

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files provided' },
        { status: 400 }
      )
    }

    if (!type || !Object.keys(ALLOWED_TYPES).includes(type)) {
      return NextResponse.json(
        { error: 'Invalid upload type' },
        { status: 400 }
      )
    }

    const allowedExtensions = ALLOWED_TYPES[type as keyof typeof ALLOWED_TYPES]
    const uploadedUrls: string[] = []

    // Crear directorio de uploads si no existe
    const uploadDir = join(process.cwd(), 'public', 'uploads', 'branding', type)
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    for (const file of files) {
      // Validar tamaño
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: `File ${file.name} is too large. Maximum size: 10MB` },
          { status: 400 }
        )
      }

      // Validar tipo
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
      if (!allowedExtensions.includes(fileExtension)) {
        return NextResponse.json(
          { error: `File type ${fileExtension} not allowed for ${type}` },
          { status: 400 }
        )
      }

      // Generar nombre único
      const timestamp = Date.now()
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
      const fileName = `${timestamp}_${sanitizedName}`
      const filePath = join(uploadDir, fileName)

      // Guardar archivo
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      await writeFile(filePath, buffer)

      // Agregar URL pública
      const publicUrl = `/uploads/branding/${type}/${fileName}`
      uploadedUrls.push(publicUrl)

      console.log(`✅ File uploaded: ${fileName} (${(file.size / 1024 / 1024).toFixed(2)}MB)`)
    }

    return NextResponse.json({
      success: true,
      urls: uploadedUrls,
      message: `${files.length} file(s) uploaded successfully`
    })

  } catch (error) {
    console.error('❌ Upload error:', error)
    return NextResponse.json(
      { error: 'Internal server error during upload' },
      { status: 500 }
    )
  }
}