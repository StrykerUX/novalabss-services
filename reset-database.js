const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

async function resetDatabase() {
  try {
    console.log('🗑️  Reseteando base de datos...')
    
    // Eliminar todos los datos de las tablas en orden correcto
    console.log('📄 Eliminando sesiones...')
    await prisma.session.deleteMany({})
    
    console.log('🔑 Eliminando cuentas...')
    await prisma.account.deleteMany({})
    
    console.log('📂 Eliminando proyectos...')
    await prisma.project.deleteMany({})
    
    console.log('👥 Eliminando usuarios...')
    await prisma.user.deleteMany({})
    
    console.log('🎫 Eliminando tokens de verificación...')
    await prisma.verificationToken.deleteMany({})
    
    console.log('✅ Base de datos reseteada completamente')
    
    // Crear admin desde variables de entorno
    const adminEmail = process.env.ADMIN_EMAIL
    const adminName = process.env.ADMIN_NAME || 'Administrator'
    
    if (adminEmail) {
      console.log('👑 Creando administrador...')
      
      const admin = await prisma.user.create({
        data: {
          email: adminEmail,
          name: adminName,
          role: 'ADMIN'
        }
      })
      
      console.log(`✅ Administrador creado: ${admin.email} (ID: ${admin.id})`)
    } else {
      console.log('⚠️  No se encontró ADMIN_EMAIL en variables de entorno')
      console.log('   Agrega ADMIN_EMAIL=tu@email.com al archivo .env para crear un admin automáticamente')
    }
    
    console.log('🎉 Reset completado exitosamente')
    
  } catch (error) {
    console.error('❌ Error durante el reset:', error)
  } finally {
    await prisma.$disconnect()
  }
}

async function deleteDatabase() {
  try {
    console.log('🗑️  Eliminando archivo de base de datos...')
    
    const dbPath = path.join(__dirname, 'prisma', 'dev.db')
    
    if (fs.existsSync(dbPath)) {
      fs.unlinkSync(dbPath)
      console.log('✅ Archivo de base de datos eliminado')
    } else {
      console.log('ℹ️  No se encontró archivo de base de datos')
    }
    
  } catch (error) {
    console.error('❌ Error eliminando base de datos:', error)
  }
}

// Ejecutar el script
async function main() {
  const args = process.argv.slice(2)
  
  if (args.includes('--delete-file')) {
    // Eliminar archivo completamente y recrear
    await deleteDatabase()
    console.log('🔨 Ejecuta: npm run db:push para recrear las tablas')
  } else {
    // Solo limpiar datos pero mantener estructura
    await resetDatabase()
  }
}

main()