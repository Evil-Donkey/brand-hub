import GoogleAnalytics from './components/GoogleAnalytics'
import { robotoFlex, robotoSlab } from './utils/fonts'
import 'bootstrap/dist/css/bootstrap.css'
import './globals.css'

export const metadata = {
  title: {
    template: '%s | Brand Hub',
    default: 'Brand Hub - Home for all your brand assets',
  },
}

export default function RootLayout({ children, params }) {
  return (
    <html lang="en">
      <GoogleAnalytics GA_TRACKING_ID={process.env.GA_TRACKING_ID} />
      <body className={`${robotoSlab.variable} ${robotoFlex.className}`}>
        {children}
      </body>
    </html>
  )
}
