import fetchAPI from '@/app/lib/api'
import Header from '@/app/components/Header'
import Intro from '@/app/components/HomepageIntro'
import PricingOptions from '@/app/components/PricingOptions'
import FormRequest from '@/app/components/FormRequest'
import Footer from '@/app/components/Footer'
import styles from '@/app/Homepage.module.scss'

export async function generateMetadata() {

  const data = await fetchAPI(`
    query getContactPage {
      page(id: "250", idType: DATABASE_ID) {
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
    title: 'Pricing | Brand Hub',
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

export default async function Pricing() {

  const data = await fetchAPI(`
    query getPricingPage {
      page(id: "250", idType: DATABASE_ID) {
        title(format: RENDERED)
        pricing {
          options {
            backgroundColor
            included
            name
            textColor
            image {
              altText
              mediaDetails {
                height
                width
              }
              mediaItemUrl
            }
            imageMonthly {
              altText
              mediaDetails {
                height
                width
              }
              mediaItemUrl
            }
          }
        }
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
  const telephone = dataOptions?.acfOptionsThemeSettings?.themeSettings?.telephone;
  const email = dataOptions?.acfOptionsThemeSettings?.themeSettings?.email;
  const pricingOptions = data?.page?.pricing?.options;

  return (
    <main className={styles.homepageMainWrap}>
      <Header fullMenu={true} />
      <Intro title={title} telephone={telephone} email={email} />
      <PricingOptions pricingOptions={pricingOptions} />
      <FormRequest />
      <Footer border={false} telephone={telephone} email={email} />
    </main>
  )
}
