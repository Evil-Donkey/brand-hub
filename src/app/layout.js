import Script from 'next/script'
import fetchAPI from './lib/api'
import GoogleAnalytics from './components/GoogleAnalytics'
import GoogleConsentMode from './components/GoogleConsentMode'
import GoogleTagManager from './components/GoogleTagManager'
import Hotjar from './components/Hotjar'
import { anton, openSans, robotoFlex, robotoSlab, permanentMarker } from './utils/fonts'
import Footer from './components/Footer'
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

let telephone = null;
let email = null;

try {
  const dataOptions = await fetchAPI(`
    query ThemeSettings {
      acfOptionsThemeSettings {
        themeSettings {
          email
          telephone
          bookDemoUrl
          discountBarCopy
          faqs {
            answer
            question
          }
        }
      }
    }
  `);

  telephone = dataOptions?.acfOptionsThemeSettings?.themeSettings?.telephone;
  email = dataOptions?.acfOptionsThemeSettings?.themeSettings?.email;
} catch (error) {
  console.error('Failed to fetch theme settings:', error.message);
  // Continue with null values - the app will still work without these
}

export default function RootLayout({ children, params }) {
  return (
    <html lang="en">
      <body className={`${robotoSlab.variable} ${anton.variable} ${openSans.variable} ${robotoFlex.className} ${permanentMarker.variable}`}>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display: none; visibility: hidden;"></iframe>`,
          }}
        />
        {children}
        <Footer 
          border={false} 
          telephone={telephone} 
          email={email} 
          color='#FFFFFF'
          backgroundColor='#231F20' 
        />
        <GoogleAnalytics GA_TRACKING_ID={GA_TRACKING_ID} />
        <GoogleConsentMode />
        <GoogleTagManager GTM_ID={GTM_ID} />
        <Script src='https://cdn-cookieyes.com/client_data/d26ba0914ff0166d644773ea/script.js' strategy='beforeInteractive' />
        <Hotjar HOTJAR_ID={HOTJAR_ID} />
      </body>
    </html>
  )
}
