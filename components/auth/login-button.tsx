'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

interface LoginButtonrops {
  children: React.ReactNode
  mode?: "modal" | "redirect"
  asChild?: boolean;
}

export const LoginButton = ({ children, mode = "redirect" }: LoginButtonrops) => {

  const router = useRouter()
  const onClick = () => {
    router.push("/auth/login")
  }

  if (mode === "modal") {
    return (
      <span>
        implement modal
      </span>
    )
  }
  return (
    <div className='flex items-center justify-center mt-4'>

      <span onClick={onClick} >{children}</span>
    </div>
  )
}
