import { Button } from '@/components/ui/button'
import SignInbuttonWrapper from '@/components/ui/SignInbuttonWrapper'
import React from 'react'

const page = () => {
  return (
    <div className="flex flex-col bg-blue-500 w-screen h-screen     items-center justify-center min-h-screen py-2">
      <SignInbuttonWrapper >
        <Button variant="default" className='bg-white  text-black hover:bg-gray-200 '> 🔏 Sign In</Button>
      </SignInbuttonWrapper>
    </div >
  )
}

export default page