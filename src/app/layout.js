import 'bootstrap/dist/css/bootstrap.css'
import './globals.css'
import { robotoFlex, robotoSlab } from './utils/fonts';

export const metadata = {
  title: 'Brand Hub',
  description: '',
}

export default function RootLayout({ children, params }) {
  return (
    <html lang="en">
      <body className={`${robotoSlab.variable} ${robotoFlex.className}`}>{children}</body>
    </html>
  )
}
