import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // Middleware adicional aquí si es necesario
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Rutas que requieren autenticación
        if (req.nextUrl.pathname.startsWith("/dashboard")) {
          return !!token
        }
        return true
      },
    },
  }
)

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/projects/:path*",
    "/billing/:path*"
  ]
}