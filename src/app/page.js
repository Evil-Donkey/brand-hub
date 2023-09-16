import fetchAPI from './lib/api'
import Header from './components/Header'
import Intro from './components/HomepageIntro'
import Blocks from './components/HomepageBlocks'
import KeyList from './components/HomepageKeyList'
import Spotlight from './components/BrandSpotlight'
import FormRequest from './components/FormRequest'
import Footer from './components/Footer'
import styles from './Homepage.module.scss'

export const metadata = {
  title: 'Brand Hub',
  description: '',
}

export default async function Home() {

  const data = await fetchAPI(`
    query getHomepage {
      page(id: "5", idType: DATABASE_ID) {
        content(format: RENDERED)
        title(format: RENDERED)
        homepage {
          telephone
          email
          keyList {
            keyItem
          }
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
          brandSpotlightCopy
          brandSpotlight {
            ... on Brand {
              id
              author {
                node {
                  authorCustomFields {
                    authorNiceName
                    urlSlug
                  }
                }
              }
              title(format: RENDERED)
              slug
              brandOptions {
                spotlightFeaturedImage {
                  altText
                  mediaDetails {
                    height
                    width
                  }
                  sizes(size: SPOTLIGHT_SIZE)
                  sourceUrl(size: SPOTLIGHT_SIZE)
                }
              }
            }
          }
        }
      }
    }
  `);

  const title = data?.page?.title;
  const content = data?.page?.content;
  const telephone = data?.page?.homepage?.telephone;
  const email = data?.page?.homepage?.email;
  const keyList = data?.page?.homepage?.keyList;
  const sections = data?.page?.homepage?.sections;
  const brandSpotlight = data?.page?.homepage?.brandSpotlight;
  const brandSpotlightCopy = data?.page?.homepage?.brandSpotlightCopy;

  return (
    <main className={styles.homepageMainWrap}>
      <Header fullMenu={true} />
      <Intro title={title} content={content} telephone={telephone} email={email} />
      <KeyList keyList={keyList} />
      <Blocks sections={sections} />
      <Spotlight brandSpotlight={brandSpotlight} brandSpotlightCopy={brandSpotlightCopy} />
      <FormRequest />
      <Footer border={false} />
    </main>
  )
}
