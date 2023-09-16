'use client'

import { useState } from 'react'
import PasswordContext from './lib/passwordContext'
import GoogleAnalytics from './components/GoogleAnalytics'
import { robotoFlex, robotoSlab } from './utils/fonts'
import 'bootstrap/dist/css/bootstrap.css'
import './globals.css'

export default function RootLayout({ children, params }) {
  const [match, setMatch] = useState(false);
  const [storedPwd, setStoredPwd] = useState(null);  

  return (
    <html lang="en">
      <GoogleAnalytics GA_TRACKING_ID={process.env.GA_TRACKING_ID} />
      <body className={`${robotoSlab.variable} ${robotoFlex.className}`}>
        <PasswordContext.Provider value={{ match, setMatch, storedPwd, setStoredPwd }}>
          {children}
        </PasswordContext.Provider>
      </body>
    </html>
  )
}
