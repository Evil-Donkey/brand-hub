import fetchAPI from '@/app/lib/api'
import Header from '@/app/components/Header'
import Intro from '@/app/components/HomepageIntro'
import AuditsBlocks from '@/app/components/AuditsBlocks'
import Footer from '@/app/components/Footer'
import styles from '@/app/Homepage.module.scss'

export async function generateMetadata() {

  const data = await fetchAPI(`
    query getContactPage {
      page(id: "770", idType: DATABASE_ID) {
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
    title: 'Audits',
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

export default async function Audits() {

  const data = await fetchAPI(`
    query getAuditsPage {
      page(id: "770", idType: DATABASE_ID) {
        title(format: RENDERED)
        content(format: RENDERED)
        audits {
          auditsFeatures {
            description
            title
            graphic {
              altText
              mediaItemUrl
                mediaDetails {
                  width
                  height
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
  const features = data?.page?.audits?.auditsFeatures;
  const telephone = dataHomepage?.page?.homepage?.telephone;
  const email = dataHomepage?.page?.homepage?.email;

  return (
    <main className={styles.homepageMainWrap}>
      <Header fullMenu={true} />
      <Intro title={title} content={content} cta="Request a quote" email={email} />
      <AuditsBlocks features={features} />

      <Footer border={false} telephone={telephone} email={email} />
    </main>
  )
};