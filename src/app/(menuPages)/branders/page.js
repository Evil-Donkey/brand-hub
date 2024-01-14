import fetchAPI from '@/app/lib/api'
import Header from '@/app/components/Header'
import BrandersHero from '@/app/components/BrandersHero'
import BrandersGrid from '@/app/components/BrandersGrid'
import Footer from '@/app/components/Footer'
import styles from './Branders.module.scss'

export async function generateMetadata() {

  const data = await fetchAPI(`
    query getBrandersPage {
      page(id: "531", idType: DATABASE_ID) {
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
    title: 'Branders',
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

export default async function Branders() {

  const data = await fetchAPI(`
    query getBrandersPage {
      page(id: "531", idType: DATABASE_ID) {
        title(format: RENDERED)
        content(format: RENDERED)
        branders {
          branders {
            ... on Brander {
              id
              slug
              branderOptions {
                thumbnail {
                  mediaItemUrl
                }
                branderQuote
                branderName
              }
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
  const content = data?.page?.content;
  const branders = data?.page?.branders?.branders;
  const telephone = dataHomepage?.page?.homepage?.telephone;
  const email = dataHomepage?.page?.homepage?.email;

  return (
    <main className={styles.pageWrap}>
      <Header fullMenu={true} color="#ffffff" />
      <BrandersHero content={content} title={title} />
      <BrandersGrid branders={branders} />
      <Footer border={false} telephone={telephone} email={email} color="#ffffff" />
    </main>
  )
};