"use client"

import { SessionProvider } from "next-auth/react"
import { PageTransitionProvider } from "@/hooks/usePageTransition"

interface ProvidersProps {
  children: React.ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <PageTransitionProvider>
        {children}
      </PageTransitionProvider>
    </SessionProvider>
  )
}