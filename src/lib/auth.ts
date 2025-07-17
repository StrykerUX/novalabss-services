import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Buscar usuario en la base de datos
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user) {
          // Lista de administradores autorizados (solo Abraham y emails autorizados)
          const adminEmails = [
            "abraham.stryker117@gmail.com",
            "admin@novalabs.com"
          ];
          
          const adminPassword = "NovaLabs2024!"; // Cambiar después del primer uso
          
          // Usuario de prueba hardcodeado
          if (credentials.email === "test@test.com" && credentials.password === "test123") {
            const newTestUser = await prisma.user.create({
              data: {
                email: credentials.email,
                name: "Usuario de Prueba",
                role: "USER"
              }
            });
            
            return {
              id: newTestUser.id,
              email: newTestUser.email,
              name: newTestUser.name,
              role: "USER"
            }
          }
          
          if (adminEmails.includes(credentials.email) && credentials.password === adminPassword) {
            const newAdmin = await prisma.user.create({
              data: {
                email: credentials.email,
                name: credentials.email === "abraham.stryker117@gmail.com" ? "Abraham Stryker" : "Admin NovaLabs",
                role: "ADMIN"
              }
            });
            
            return {
              id: newAdmin.id,
              email: newAdmin.email,
              name: newAdmin.name,
              role: "ADMIN"
            }
          }
          
          return null
        }

        // Verificar contraseña con bcrypt
        if (user.password) {
          const isValid = await bcrypt.compare(credentials.password, user.password)
          if (!isValid) {
            return null
          }
        } else {
          // Si no tiene password pero es admin, verificar con password hardcodeado
          const adminEmails = [
            "abraham.stryker117@gmail.com",
            "admin@novalabs.com"
          ];
          
          const adminPassword = "NovaLabs2024!";
          
          if (adminEmails.includes(credentials.email) && credentials.password === adminPassword && user.role === "ADMIN") {
            return {
              id: user.id,
              email: user.email,
              name: user.name || "Admin NovaLabs",
              role: user.role
            }
          }
          
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      }
    })
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session, token }) {
      if (session?.user && token) {
        session.user.id = token.sub
        session.user.role = token.role
      }
      return session
    },
    async jwt({ user, token }) {
      if (user) {
        token.sub = user.id
        token.role = user.role
      } else if (token.sub) {
        // Si no hay user pero hay token, buscar el rol en la base de datos
        const dbUser = await prisma.user.findUnique({
          where: { id: token.sub as string }
        })
        if (dbUser) {
          token.role = dbUser.role
        }
      }
      return token
    },
  },
  session: {
    strategy: "jwt",
  },
}