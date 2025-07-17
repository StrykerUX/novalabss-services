# 🗑️ Reset de Base de Datos - NovaLabs

Este documento explica cómo resetear completamente la base de datos y configurar solo tu admin.

## 🔧 Configuración Previa

### 1. **Configurar Variables de Entorno**

Asegúrate de tener estas variables en tu archivo `.env`:

```bash
# Administrador principal (para reset automático)
ADMIN_EMAIL="abraham.stryker117@gmail.com"
ADMIN_NAME="Abraham Stryker"

# Otros administradores autorizados
ADMIN_EMAILS="abraham.stryker117@gmail.com,admin@novalabs.com"

# Contraseña temporal para admins
ADMIN_DEFAULT_PASSWORD="NovaLabs2024!"
```

## 🚀 Métodos de Reset

### **Opción 1: Reset Rápido (Solo limpiar datos)**
```bash
npm run db:reset
```
- ✅ Elimina todos los usuarios, proyectos y sesiones
- ✅ Crea automáticamente tu admin desde ADMIN_EMAIL
- ✅ Mantiene la estructura de tablas
- ⚡ Más rápido

### **Opción 2: Reset Completo (Recrear todo)**
```bash
npm run db:reset-full
```
- ✅ Elimina completamente el archivo de base de datos
- ✅ Recrea todas las tablas desde cero
- ✅ Crea automáticamente tu admin desde ADMIN_EMAIL
- 🔄 Más lento pero más limpio

### **Opción 3: Manual (Control total)**

1. **Eliminar archivo de base de datos:**
```bash
rm prisma/dev.db
```

2. **Recrear estructura:**
```bash
npm run db:push
```

3. **Crear admin manualmente:**
```bash
node reset-database.js
```

## 🔐 Login como Admin

Después del reset, puedes hacer login con:

- **Email:** `abraham.stryker117@gmail.com` (o el que hayas configurado en ADMIN_EMAIL)
- **Password:** `NovaLabs2024!` (o el que hayas configurado en ADMIN_DEFAULT_PASSWORD)

## 📊 Verificar que funciona

1. **Verifica la base de datos:**
```bash
npm run db:studio
```

2. **Inicia el servidor:**
```bash
npm run dev
```

3. **Ve a la página de login:**
```
http://localhost:3000/auth/signin
```

4. **Haz login con tus credenciales de admin**

5. **Ve al dashboard admin:**
```
http://localhost:3000/admin
```

## 🧪 Probar el Flujo Completo

### 1. **Simular un pago (desarrollo)**
- Ve a la landing page
- Completa el checkout
- El webhook creará automáticamente un proyecto

### 2. **Verificar sincronización**
- El usuario aparecerá en `/admin/users`
- El proyecto aparecerá en `/admin/projects`
- El dashboard del usuario mostrará el proyecto real

### 3. **Probar gestión admin**
- Edita el progreso del proyecto
- Cambia el estado del proyecto
- Verifica que se actualiza en el dashboard del usuario

## 🛠️ Comandos Útiles

```bash
# Ver logs de la base de datos
npm run db:studio

# Hacer push de cambios al schema
npm run db:push

# Solo resetear datos (mantener estructura)
npm run db:reset

# Reset completo + recrear
npm run db:reset-full

# Ver el estado de Prisma
npx prisma migrate status

# Generar cliente de Prisma
npx prisma generate
```

## ⚠️ Importante

- **Esto borrará TODOS los datos** - úsalo solo en desarrollo
- **En producción** usa migraciones en lugar de resets
- **Respalda** siempre antes de hacer reset en un ambiente importante
- **Las variables de entorno** deben estar configuradas antes del reset

## 🔍 Troubleshooting

### Si el reset falla:
```bash
# Matar procesos que usen la DB
sudo fuser -k prisma/dev.db

# Eliminar manualmente
rm prisma/dev.db

# Recrear desde cero
npm run db:push
node reset-database.js
```

### Si no aparece el admin:
- Verifica que `ADMIN_EMAIL` esté en `.env`
- Revisa los logs del script de reset
- Usa `npm run db:studio` para verificar

### Si hay problemas de permisos:
```bash
chmod +x reset-database.js
chmod 755 prisma/
```