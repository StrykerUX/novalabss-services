const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    // Crear usuario admin
    const admin = await prisma.user.upsert({
      where: { email: 'admin@novalabs.com' },
      update: {},
      create: {
        email: 'admin@novalabs.com',
        name: 'Admin NovaLabs',
        role: 'ADMIN'
      }
    });

    console.log('✅ Usuario admin creado:', admin);

    // Crear algunos usuarios de ejemplo
    const users = await Promise.all([
      prisma.user.upsert({
        where: { email: 'juan@empresa.com' },
        update: {},
        create: {
          email: 'juan@empresa.com',
          name: 'Juan Pérez',
          role: 'USER',
          company: 'Empresa ABC'
        }
      }),
      prisma.user.upsert({
        where: { email: 'maria@startup.com' },
        update: {},
        create: {
          email: 'maria@startup.com',
          name: 'María González',
          role: 'USER',
          company: 'Startup XYZ'
        }
      }),
      prisma.user.upsert({
        where: { email: 'carlos@negocio.com' },
        update: {},
        create: {
          email: 'carlos@negocio.com',
          name: 'Carlos Ruiz',
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