import fetchAPI from '@/app/lib/api'
import Header from '@/app/components/Header'
import BrandersHero from '@/app/components/BrandersHero'
import BrandersGrid from '@/app/components/BrandersGrid'
import styles from './Branders.module.scss'

export async function generateMetadata() {

  const data = await fetchAPI(`
    query getBrandersPage {
      page(id: "531", idType: DATABASE_ID) {
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
}

export default async function Branders() {

  const data = await fetchAPI(`
    query getBrandersPage {
      page(id: "531", idType: DATABASE_ID) {
        title(format: RENDERED)
        content(format: RENDERED)
        pageOptions {
          backgroundColor
          textColor
          faq
        }
        branders {
          join
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
                specialBadge
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

  const backgroundColor = data?.page?.pageOptions?.backgroundColor;
  const color = data?.page?.pageOptions?.textColor;
  const title = data?.page?.title;
  const content = data?.page?.content;
  const branders = data?.page?.branders?.branders;
  const join = data?.page?.branders?.join;
  const telephone = dataOptions?.acfOptionsThemeSettings?.themeSettings?.telephone;
  const email = dataOptions?.acfOptionsThemeSettings?.themeSettings?.email;

  return (
    <main className={styles.pageWrap}>
      <Header 
        fullMenu={true} 
        backgroundColor={backgroundColor} 
        color={color}
      />
      <BrandersHero content={content} title={title} join={join} />
      <BrandersGrid branders={branders} />
    </main>
  )
};