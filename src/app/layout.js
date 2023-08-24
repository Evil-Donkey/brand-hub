import 'bootstrap/dist/css/bootstrap.css'
import './globals.css'
import GoogleAnalytics from './components/GoogleAnalytics';
import { robotoFlex, robotoSlab } from './utils/fonts';

export const metadata = {
  title: 'Brand Hub',
  description: '',
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
