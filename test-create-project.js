const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function testCreateProject() {
  try {
    console.log('🧪 Probando creación manual de proyecto...')
    
    // Buscar el usuario hello@nova.com
    const user = await prisma.user.findUnique({
      where: { email: 'hello@nova.com' }
    })
    
    if (!user) {
      console.log('❌ Usuario hello@nova.com no encontrado')
      return
    }
    
    console.log(`✅ Usuario encontrado: ${user.name} (${user.email})`)
    
    // Crear proyecto manualmente
    const project = await prisma.project.create({
      data: {
        name: 'Plan Rocket - hello',
        userId: user.id,
        status: 'EN_DESARROLLO',
        progress: 0,
        currentPhase: 'Configuración inicial - Pago confirmado',
        estimatedDelivery: '3 días',
        plan: 'Rocket'
      }
    })
    
    console.log('🚀 Proyecto creado exitosamente:')
    console.log(`   ID: ${project.id}`)
    console.log(`   Nombre: ${project.name}`)
    console.log(`   Estado: ${project.status}`)
    console.log(`   Usuario: ${user.email}`)
    
    // Verificar que el proyecto se creó
    const userWithProjects = await prisma.user.findUnique({
      where: { email: 'hello@nova.com' },
      include: { projects: true }
    })
    
    console.log(`\n✅ Verificación: Usuario ahora tiene ${userWithProjects.projects.length} proyecto(s)`)
    
  } catch (error) {
    console.error('❌ Error creando proyecto:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testCreateProject()