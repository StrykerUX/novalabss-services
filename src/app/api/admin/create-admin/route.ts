import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    // Verificar que el usuario actual es admin
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { email, name } = await request.json();

    if (!email || !name) {
      return NextResponse.json({ error: "Email y nombre son requeridos" }, { status: 400 });
    }

    // Verificar que el email está en la lista de administradores autorizados
    const adminEmails = process.env.ADMIN_EMAILS?.split(',') || [];
    
    if (!adminEmails.includes(email)) {
      return NextResponse.json({ 
        error: "Email no autorizado. Debe estar en ADMIN_EMAILS del servidor" 
      }, { status: 403 });
    }

    // Verificar si ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json({ error: "Ya existe un usuario con ese email" }, { status: 400 });
    }

    // Crear admin
    const admin = await prisma.user.create({
      data: {
        email,
        name,
        role: 'ADMIN'
      }
    });

    return NextResponse.json({
      message: "Administrador creado exitosamente",
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role
      }
    });

  } catch (error) {
    console.error("Error creando admin:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}