const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function debugProjects() {
  try {
    console.log('🔍 Debugeando proyectos...')
    
    // Verificar todos los usuarios
    const users = await prisma.user.findMany({
      include: {
        projects: true
      }
    })
    
    console.log('\n👥 USUARIOS EN BASE DE DATOS:')
    console.log(`Total usuarios: ${users.length}`)
    
    users.forEach((user, index) => {
      console.log(`\n${index + 1}. ${user.name} (${user.email})`)
      console.log(`   Role: ${user.role}`)
      console.log(`   Creado: ${user.createdAt}`)
      console.log(`   Proyectos: ${user.projects.length}`)
      
      if (user.projects.length > 0) {
        user.projects.forEach((project, pIndex) => {
          console.log(`     ${pIndex + 1}. ${project.name}`)
          console.log(`        Estado: ${project.status}`)
          console.log(`        Progreso: ${project.progress}%`)
          console.log(`        Plan: ${project.plan}`)
          console.log(`        Creado: ${project.createdAt}`)
        })
      } else {
        console.log(`     ❌ Sin proyectos`)
      }
    })
    
    // Verificar todos los proyectos
    const allProjects = await prisma.project.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
            role: true
          }
        }
      }
    })
    
    console.log(`\n📂 TODOS LOS PROYECTOS:`)
    console.log(`Total proyectos: ${allProjects.length}`)
    
    if (allProjects.length === 0) {
      console.log('❌ No hay proyectos en la base de datos')
      console.log('\n🔧 POSIBLES CAUSAS:')
      console.log('1. El webhook de Stripe no se está ejecutando')
      console.log('2. El webhook no está creando proyectos')
      console.log('3. Hay un error en la lógica de creación')
    } else {
      allProjects.forEach((project, index) => {
        console.log(`\n${index + 1}. ${project.name}`)
        console.log(`   Usuario: ${project.user.name} (${project.user.email})`)
        console.log(`   Estado: ${project.status}`)
        console.log(`   Progreso: ${project.progress}%`)
        console.log(`   Plan: ${project.plan}`)
        console.log(`   Fase: ${project.currentPhase}`)
        console.log(`   Creado: ${project.createdAt}`)
        console.log(`   Actualizado: ${project.updatedAt}`)
      })
    }
    
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

debugProjects()