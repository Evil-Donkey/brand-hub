import fetchAPI from '@/app/lib/api'
import Header from '@/app/components/Header'
import Intro from '@/app/components/HomepageIntro'
import Blocks from '@/app/components/HomepageBlocks'
import FormRequest from '@/app/components/FormRequest'
import Footer from '@/app/components/Footer'
import styles from '@/app/Homepage.module.scss'

export async function generateMetadata() {

  const data = await fetchAPI(`
    query getContactPage {
      page(id: "231", idType: DATABASE_ID) {
        seo {
          metaDesc
          schema {
            raw
          }
          title
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
    title: 'Contact us | Brand Hub',
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

export default async function Contact() {

  const data = await fetchAPI(`
    query getContactPage {
      page(id: "231", idType: DATABASE_ID) {
        title(format: RENDERED)
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

  const dataContact = await fetchAPI(`
    query getHomepage {
      page(id: "231", idType: DATABASE_ID) {
        contactUs {
          sections {
            copy
            ctaLabel
            ctaUrl
            image {
              mediaItemUrl
              mediaDetails {
                height
                width
              }
              altText
            }
          }
        }
      }
    }
  `);

  const title = data?.page?.title;
  const telephone = dataOptions?.acfOptionsThemeSettings?.themeSettings?.telephone;
  const email = dataOptions?.acfOptionsThemeSettings?.themeSettings?.email;
  const sections = dataContact?.page?.contactUs?.sections;

  return (
    <main className={styles.homepageMainWrap}>
      <Header fullMenu={true} />
      <Intro title={title} telephone={telephone} email={email} />
      <Blocks sections={sections} />
      <FormRequest />
      <Footer border={false} telephone={telephone} email={email} />
    </main>
  )
}
