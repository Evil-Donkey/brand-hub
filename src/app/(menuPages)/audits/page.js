import fetchAPI from '@/app/lib/api'
import Header from '@/app/components/Header'
import Intro from '@/app/components/PageIntro'
import AuditsBlocks from '@/app/components/AuditsBlocks'
import Footer from '@/app/components/Footer'
import styles from '@/app/Homepage.module.scss'

export async function generateMetadata() {
  try {
    const data = await fetchAPI(`
      query getContactPage {
        page(id: "770", idType: DATABASE_ID) {
          seo {
            title
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
      title: seo?.title,
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
  } catch (error) {
    console.error('Failed to generate metadata for audits page:', error.message);
    return {
      title: 'Audits | Brand Hub',
      description: 'Brand Hub Audits',
    }
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
  const content = data?.page?.content;
  const features = data?.page?.audits?.auditsFeatures;
  const telephone = dataOptions?.acfOptionsThemeSettings?.themeSettings?.telephone;
  const email = dataOptions?.acfOptionsThemeSettings?.themeSettings?.email;

  return (
    <main className={styles.homepageMainWrap}>
      <Header fullMenu={true} />
      <Intro title={title} content={content} cta="Request a quote" email={email} />
      <AuditsBlocks features={features} />

      <Footer border={false} telephone={telephone} email={email} />
    </main>
  )
};