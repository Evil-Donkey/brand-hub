import Script from 'next/script'
import GoogleAnalytics from './components/GoogleAnalytics'
import GoogleTagManager from './components/GoogleTagManager'
import Hotjar from './components/Hotjar'
import { anton, openSans, robotoFlex, robotoSlab } from './utils/fonts'
import 'bootstrap/dist/css/bootstrap.css'
import './globals.css'

const GTM_ID = process.env.GTM_ID
const GA_TRACKING_ID = process.env.GA_TRACKING_ID
const HOTJAR_ID = process.env.HOTJAR_ID

export const metadata = {
  title: {
    template: '%s | Brand Hub',
    default: 'Brand Hub - Home for all your brand assets',
  },
}

export default function RootLayout({ children, params }) {
  return (
    <html lang="en">
      <GoogleAnalytics GA_TRACKING_ID={GA_TRACKING_ID} />
      <GoogleTagManager GTM_ID={GTM_ID} />
      <Hotjar HOTJAR_ID={HOTJAR_ID} />
      <body className={`${robotoSlab.variable} ${anton.variable} ${openSans.variable} ${robotoFlex.className}`}>
        {children}
        <noscript
            dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display: none; visibility: hidden;"></iframe>`,
            }} 
        />
      </body>
    </html>
  )
}
