import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validar campos requeridos
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Formato de email inválido' },
        { status: 400 }
      );
    }

    // Template HTML para el email
    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Nuevo mensaje de contacto - NovaLabs</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #0147FF 0%, #0147FF80 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; color: #0147FF; }
            .value { background: white; padding: 15px; border-radius: 5px; margin-top: 5px; }
            .message-box { background: white; padding: 20px; border-radius: 5px; border-left: 4px solid #0147FF; }
            .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🚀 Nuevo Mensaje de Contacto</h1>
            <p>NovaLabs - Sitios web que convierten</p>
          </div>
          
          <div class="content">
            <div class="field">
              <div class="label">Nombre:</div>
              <div class="value">${name}</div>
            </div>
            
            <div class="field">
              <div class="label">Email:</div>
              <div class="value">${email}</div>
            </div>
            
            <div class="field">
              <div class="label">Asunto:</div>
              <div class="value">${subject}</div>
            </div>
            
            <div class="field">
              <div class="label">Mensaje:</div>
              <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
            </div>
          </div>
          
          <div class="footer">
            <p>Mensaje enviado desde el formulario de contacto de novalabss.com</p>
            <p>Fecha: ${new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })}</p>
          </div>
        </body>
      </html>
    `;

    // Enviar email
    const data = await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: process.env.TO_EMAIL!,
      subject: `💬 Nuevo contacto: ${subject}`,
      html: htmlTemplate,
      reply_to: email,
    });

    console.log('✅ Email enviado correctamente:', data);

    return NextResponse.json(
      { 
        message: 'Mensaje enviado correctamente',
        id: data.id 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('❌ Error enviando email:', error);
    
    return NextResponse.json(
      { error: 'Error interno del servidor. Por favor intenta nuevamente.' },
      { status: 500 }
    );
  }
}