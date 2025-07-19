"use client"
import { SignOutButton, useUser } from '@clerk/nextjs'
import React from 'react'

const Contactpage = () => {
  const {isSignedIn}=useUser()
  return (
    <div>
      {isSignedIn ? (
        <>
        <div className="text-white">Signed in</div>
        </>
      ):
      (
      <div>
       Contact
      </div>
      )
    }
    </div>
  )
}

export default Contactpage
