import fetchAPI from '@/app/lib/api'
import Header from '@/app/components/Header'
import Intro from '@/app/components/HomepageIntro'
import PricingOptions from '@/app/components/PricingOptions'
import FormRequest from '@/app/components/FormRequest'
import Footer from '@/app/components/Footer'
import styles from '@/app/Homepage.module.scss'

export const metadata = {
  title: 'Pricing - Brand Hub',
  description: '',
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
          }
        }
      }
    }
  `);

  const dataHomepage = await fetchAPI(`
    query getHomepage {
      page(id: "5", idType: DATABASE_ID) {
        homepage {
          telephone
          email
        }
      }
    }
  `);

  const title = data?.page?.title;
  const telephone = dataHomepage?.page?.homepage?.telephone;
  const email = dataHomepage?.page?.homepage?.email;
  const pricingOptions = data?.page?.pricing?.options;

  return (
    <main className={styles.homepageMainWrap}>
      <Header fullMenu={true} />
      <Intro title={title} telephone={telephone} email={email} />
      <PricingOptions pricingOptions={pricingOptions} />
      <FormRequest />
      <Footer border={false} />
    </main>
  )
}
