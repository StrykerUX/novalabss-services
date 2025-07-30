const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    // Obtener emails de administradores desde variables de entorno
    const adminEmailsString = process.env.ADMIN_EMAILS || "";
    const adminEmails = adminEmailsString.split(',').map(email => email.trim()).filter(Boolean);

    if (adminEmails.length === 0) {
      console.log('⚠️ No hay emails de administradores configurados en ADMIN_EMAILS');
      return;
    }

    // Crear usuarios admin desde variables de entorno
    const admins = await Promise.all(
      adminEmails.map(email => 
        prisma.user.upsert({
          where: { email },
          update: {},
          create: {
            email,
            name: email.includes("abraham") ? "Abraham Stryker" : "Admin NovaLabs",
            role: 'ADMIN'
          }
        })
      )
    );

    console.log('✅ Usuarios admin creados:', admins.length);

    // Crear algunos usuarios de ejemplo (sin emails hardcodeados)
    const users = await Promise.all([
      prisma.user.upsert({
        where: { email: 'demo-juan@example.com' },
        update: {},
        create: {
          email: 'demo-juan@example.com',
          name: 'Juan Pérez (Demo)',
          role: 'USER',
          company: 'Empresa ABC'
        }
      }),
      prisma.user.upsert({
        where: { email: 'demo-maria@example.com' },
        update: {},
        create: {
          email: 'demo-maria@example.com',
          name: 'María González (Demo)',
          role: 'USER',
          company: 'Startup XYZ'
        }
      }),
      prisma.user.upsert({
        where: { email: 'demo-carlos@example.com' },
        update: {},
        create: {
          email: 'demo-carlos@example.com',
          name: 'Carlos Ruiz (Demo)',
          role: 'USER',
          company: 'Negocio 123'
        }
      })
    ]);

    console.log('✅ Usuarios de ejemplo creados:', users.length);

    // Crear algunos proyectos de ejemplo
    const projects = await Promise.all([
      prisma.project.create({
        data: {
          name: 'Landing Page - Empresa ABC',
          status: 'EN_DESARROLLO',
          progress: 75,
          currentPhase: 'Desarrollo de contenido',
          estimatedDelivery: '23h 45min',
          plan: 'Rocket',
          userId: users[0].id
        }
      }),
      prisma.project.create({
        data: {
          name: 'E-commerce - Startup XYZ',
          status: 'EN_REVISION',
          progress: 90,
          currentPhase: 'Revisión final',
          estimatedDelivery: '12h 30min',
          plan: 'Rocket',
          userId: users[1].id
        }
      }),
      prisma.project.create({
        data: {
          name: 'Portfolio - Negocio 123',
          status: 'EN_DESARROLLO',
          progress: 45,
          currentPhase: 'Diseño inicial',
          estimatedDelivery: '2d 15h',
          plan: 'Rocket',
          userId: users[2].id
        }
      })
    ]);

    console.log('✅ Proyectos de ejemplo creados:', projects.length);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();