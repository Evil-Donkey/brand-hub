'use client'

import { useState } from 'react'
import PasswordContext from '@/app/lib/passwordContext'

export default function BrandLayout({
  children
}) {
  const [match, setMatch] = useState(false);
  const [storedPwd, setStoredPwd] = useState(null);
  return (
    <section>
      <PasswordContext.Provider value={{ match, setMatch, storedPwd, setStoredPwd }}>
        {children}
      </PasswordContext.Provider>
    </section>
  )
}