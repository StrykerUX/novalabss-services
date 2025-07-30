const { PrismaClient } = require('@prisma/client');
const readline = require('readline');

const prisma = new PrismaClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function createAdmin() {
  try {
    console.log('🔐 Crear nuevo administrador\n');
    
    const email = await askQuestion('Email del administrador: ');
    const name = await askQuestion('Nombre completo: ');
    
    // Verificar si ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      console.log('❌ Ya existe un usuario con ese email');
      return;
    }

    // Crear admin
    const admin = await prisma.user.create({
      data: {
        email,
        name,
        role: 'ADMIN'
      }
    });

    console.log('✅ Administrador creado exitosamente:');
    console.log(`   Email: ${admin.email}`);
    console.log(`   Nombre: ${admin.name}`);
    console.log(`   Rol: ${admin.role}`);
    
    // Agregar a .env
    console.log('\n📝 Agregar este email a ADMIN_EMAILS en tu .env:');
    console.log(`ADMIN_EMAILS="${email}"`);

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

async function listAdmins() {
  try {
    const admins = await prisma.user.findMany({
      where: { role: 'ADMIN' },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true
      }
    });

    console.log('\n👥 Administradores registrados:');
    console.log('=====================================');
    
    if (admins.length === 0) {
      console.log('No hay administradores registrados');
    } else {
      admins.forEach((admin, index) => {
        console.log(`${index + 1}. ${admin.name} (${admin.email})`);
        console.log(`   Creado: ${admin.createdAt.toLocaleDateString()}`);
        console.log('');
      });
    }

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

async function removeAdmin() {
  try {
    const email = await askQuestion('Email del administrador a eliminar: ');
    
    const admin = await prisma.user.findUnique({
      where: { email, role: 'ADMIN' }
    });

    if (!admin) {
      console.log('❌ No se encontró un administrador con ese email');
      return;
    }

    const confirm = await askQuestion(`¿Eliminar a ${admin.name} (${admin.email})? (y/N): `);
    
    if (confirm.toLowerCase() === 'y') {
      await prisma.user.delete({
        where: { id: admin.id }
      });
      
      console.log('✅ Administrador eliminado exitosamente');
      console.log('📝 Recuerda remover el email de ADMIN_EMAILS en tu .env');
    } else {
      console.log('❌ Operación cancelada');
    }

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

async function main() {
  console.log('🚀 Gestión de Administradores NovaLabs\n');
  console.log('1. Crear administrador');
  console.log('2. Listar administradores');
  console.log('3. Eliminar administrador');
  console.log('4. Salir\n');

  const choice = await askQuestion('Selecciona una opción (1-4): ');

  switch (choice) {
    case '1':
      await createAdmin();
      break;
    case '2':
      await listAdmins();
      break;
    case '3':
      await removeAdmin();
      break;
    case '4':
      console.log('👋 ¡Hasta luego!');
      break;
    default:
      console.log('❌ Opción inválida');
  }

  rl.close();
  await prisma.$disconnect();
}

main().catch(console.error);