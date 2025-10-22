'use client'
import LoginModal from '@/app/components/cms/LoginModal'
import React from 'react'

function LoginPage() {
  return (
    <div>
        <LoginModal showLogin={true} setShowLogin={() => {}}/>
    </div>
  )
}

export default LoginPage