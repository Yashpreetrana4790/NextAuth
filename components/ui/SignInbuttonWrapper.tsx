'use client'
import { useRouter } from 'next/navigation'
import React from 'react'


interface Props {
  children: React.ReactNode
  mode?: 'redirect' | 'modal'
}




const SignInbuttonWrapper = ({ children, mode = 'redirect' }: Props) => {

  const router = useRouter()

  const modehandler = () => {
    if (mode === 'redirect') {
      router.push('/auth/login')
    } else {
      console.log('modal')
    }
  }


  return (
    <div onClick={modehandler}>
      {children}
    </div>
  )
}

export default SignInbuttonWrapper