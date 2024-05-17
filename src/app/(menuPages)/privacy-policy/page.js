import fetchAPI from '../../lib/api'
import Header from '@/app/components/Header'
import Footer from '../../components/Footer'
import styles from './PrivacyPolicy.module.scss'

export async function generateMetadata() {

  const data = await fetchAPI(`
    query getContactPage {
      page(id: "3", idType: DATABASE_ID) {
        seo {
          metaDesc
          opengraphUrl
          opengraphTitle
          opengraphDescription
          opengraphType
          opengraphSiteName
          opengraphImage {
            mediaItemUrl
            mediaDetails {
              height
              width
            }
          }
        }
      }
    }
  `);

  const seo = data?.page?.seo;
 
  const opengraphType = seo?.opengraphType || 'website';

  return {
    title: 'Privacy Policy | Brand Hub',
    description: seo?.metaDesc,
    openGraph: {
      title: seo?.openGraphTitle,
      description: seo?.openGraphTitle,
      url: seo?.openGraphTitle,
      siteName: seo?.openGraphTitle,
      images: seo?.opengraphImage ? [{
        url: seo?.opengraphImage?.mediaItemUrl,
        width: seo?.opengraphImage?.mediaDetails.width,
        height: seo?.opengraphImage?.mediaDetails.height,
      }] : [],
      type: opengraphType,
    }
  }
}

export default async function PrivacyPolicy() {

  const data = await fetchAPI(`
    query getPrivacyPolicy {
      page(id: "3", idType: DATABASE_ID) {
        title
        content(format: RENDERED)
      }
    }
  `);

  const dataOptions = await fetchAPI(`
    query ThemeSettings {
      acfOptionsThemeSettings {
        themeSettings {
          email
          telephone
        }
      }
    }
  `);

  const title = data?.page?.title;
  const content = data?.page?.content;
  const telephone = dataOptions?.acfOptionsThemeSettings?.themeSettings?.telephone;
  const email = dataOptions?.acfOptionsThemeSettings?.themeSettings?.email;
  
  return (
    <main className={styles.pageWrap}>
      <Header fullMenu={true} />
      <div className='container py-5'>
        <div className='row row-cols-1'>
          <div className='col mb-5'>
            <h1>{title}</h1>
          </div>
          <div className='col'>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      </div>
      <Footer border={true} telephone={telephone} email={email} />
    </main>
  )
}