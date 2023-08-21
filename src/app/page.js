import fetchAPI from './lib/api'
import Intro from './components/HomepageIntro'
import Blocks from './components/HomepageBlocks'
import FormRequest from './components/FormRequest'
import Footer from './components/Footer'
import styles from './Homepage.module.scss'

export default async function Home() {

  const data = await fetchAPI(`
    query getHomepage {
      page(id: "5", idType: DATABASE_ID) {
        content(format: RENDERED)
        homepage {
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

  const content = data?.page?.content;
  const sections = data?.page?.homepage?.sections;

  return (
    <main className={styles.homepageMainWrap}>
      <Intro content={content} />
      <Blocks sections={sections} />
      <FormRequest />
      <Footer border={false} />
    </main>
  )
}
