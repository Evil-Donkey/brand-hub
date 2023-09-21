import fetchAPI from '@/app/lib/api'
import Header from '@/app/components/Header'
import Intro from '@/app/components/HomepageIntro'
import Blocks from '@/app/components/HomepageBlocks'
import FormRequest from '@/app/components/FormRequest'
import Footer from '@/app/components/Footer'
import styles from '@/app/Homepage.module.scss'

export const metadata = {
  title: 'Why - Brand Hub',
  description: '',
}

export default async function Why() {

  const data = await fetchAPI(`
    query getWhyPage {
      page(id: "236", idType: DATABASE_ID) {
        title(format: RENDERED)
        why {
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
  const sections = data?.page?.why?.sections;
  const telephone = dataHomepage?.page?.homepage?.telephone;
  const email = dataHomepage?.page?.homepage?.email;

  return (
    <main className={styles.homepageMainWrap}>
      <Header fullMenu={true} />
      <Intro title={title} telephone={telephone} email={email} />
      <Blocks sections={sections} />
      <FormRequest />
      <Footer border={false} telephone={telephone} email={email} />
    </main>
  )
};