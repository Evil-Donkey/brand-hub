'use client'

import { useState } from 'react'
import PasswordContext from '../../lib/passwordContext'

export default function BrandLayout({
  children
}) {
  const [match, setMatch] = useState(false);
  const [storedPwd, setStoredPwd] = useState(null);

  return (
    <PasswordContext.Provider value={{ match, setMatch, storedPwd, setStoredPwd }}>
      <section>
        {children}
      </section>
    </PasswordContext.Provider>
  )
}