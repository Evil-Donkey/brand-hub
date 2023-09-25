import fetchAPI from './lib/api'
import Header from './components/Header'
import Intro from './components/HomepageIntro'
import Blocks from './components/HomepageBlocks'
import KeyList from './components/HomepageKeyList'
import Spotlight from './components/BrandSpotlight'
import FormRequest from './components/FormRequest'
import Footer from './components/Footer'
import styles from './Homepage.module.scss'


export async function generateMetadata() {

  const data = await fetchAPI(`
    query getContactPage {
      page(id: "5", idType: DATABASE_ID) {
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
 
  return {
    title: 'Home | Brand Hub',
    description: seo.metaDesc,
    openGraph: {
      title: seo.openGraphTitle,
      description: seo.openGraphTitle,
      url: seo.openGraphTitle,
      siteName: seo.openGraphTitle,
      images: [
        {
          url: seo.opengraphImage?.mediaItemUrl,
          width: seo.opengraphImage?.mediaDetails.width,
          height: seo.opengraphImage?.mediaDetails.height,
        }
      ],
      type: seo.opengraphType,
    },
  }
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
      <Footer border={false} telephone={telephone} email={email} />
    </main>
  )
}
