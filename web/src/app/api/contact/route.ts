import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Función para enviar notificación a Discord
async function sendDiscordNotification(name: string, email?: string, whatsapp?: string, message: string) {
  if (!process.env.DISCORD_WEBHOOK_URL) {
    console.log('⚠️ Discord webhook URL no configurada');
    return null;
  }

  const embed = {
    title: "📧 Nuevo mensaje de contacto",
    color: 0x0147FF, // Azul de NovaLabs
    thumbnail: {
      url: "https://novalabss.com/logo.png" // Opcional: logo de la empresa
    },
    fields: [
      {
        name: "👤 Nombre",
        value: name,
        inline: true
      },
      {
        name: "📧 Email",
        value: email || "No proporcionado",
        inline: true
      },
      {
        name: "📱 WhatsApp",
        value: whatsapp || "No proporcionado",
        inline: true
      },
      {
        name: "💬 Mensaje",
        value: message.length > 1000 ? message.substring(0, 1000) + "..." : message,
        inline: false
      }
    ],
    footer: {
      text: "NovaLabs - Formulario de contacto",
      icon_url: "https://novalabss.com/favicon.ico" // Opcional: favicon
    },
    timestamp: new Date().toISOString()
  };

  const webhookData = {
    content: "🚀 **Nuevo contacto desde novalabss.com**",
    embeds: [embed]
  };

  try {
    const response = await fetch(process.env.DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookData)
    });

    if (!response.ok) {
      throw new Error(`Discord webhook failed: ${response.status}`);
    }

    console.log('✅ Notificación de Discord enviada correctamente');
    return { success: true };
    
  } catch (error) {
    console.error('❌ Error enviando notificación a Discord:', error);
    return { error };
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, whatsapp, message } = await request.json();

    // Validar campos requeridos
    if (!name || !message) {
      return NextResponse.json(
        { error: 'Nombre y mensaje son requeridos' },
        { status: 400 }
      );
    }

    // Validar que al menos email o whatsapp estén presentes
    if (!email && !whatsapp) {
      return NextResponse.json(
        { error: 'Debes proporcionar al menos un email o WhatsApp para contactarte' },
        { status: 400 }
      );
    }

    // Validar formato de email si está presente
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: 'Formato de email inválido' },
          { status: 400 }
        );
      }
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
              <div class="value">${email || 'No proporcionado'}</div>
            </div>
            
            <div class="field">
              <div class="label">WhatsApp:</div>
              <div class="value">${whatsapp || 'No proporcionado'}</div>
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

    // Enviar email con Resend
    const emailResult = await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: process.env.TO_EMAIL!,
      subject: `💬 Nuevo contacto de ${name}`,
      html: htmlTemplate,
      reply_to: email || undefined,
    });

    console.log('✅ Email enviado correctamente:', emailResult);

    // Enviar notificación a Discord (en paralelo, no bloquea si falla)
    const discordResult = await sendDiscordNotification(name, email, whatsapp, message);
    
    return NextResponse.json(
      { 
        message: 'Mensaje enviado correctamente',
        email: { id: emailResult.id },
        discord: discordResult
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