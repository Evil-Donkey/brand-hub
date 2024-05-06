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
      page(id: "883", idType: DATABASE_ID) {
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
    title: 'Unlimited Brand Servicing',
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

export default async function Why() {

  const data = await fetchAPI(`
    query getHomePage {
      page(id: "883", idType: DATABASE_ID) {
        content(format: RENDERED)
        title(format: RENDERED)
        pageOptions {
          backgroundColor
          textColor
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

  const backgroundColor = data?.page?.pageOptions?.backgroundColor;
  const color = data?.page?.pageOptions?.textColor;
  const title = data?.page?.title;
  const content = data?.page?.content;
  const telephone = dataHomepage?.page?.homepage?.telephone;
  const email = dataHomepage?.page?.homepage?.email;

  return (
    <main className={styles.homepageMainWrap}>
      <Header fullMenu={true} backgroundColor={backgroundColor} color={color} />
      <Intro backgroundColor={backgroundColor} color={color} content={content} title={title} />
      <Footer border={false} telephone={telephone} email={email} />
    </main>
  )
};