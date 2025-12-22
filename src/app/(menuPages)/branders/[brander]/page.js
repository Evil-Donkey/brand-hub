import fetchAPI from '@/app/lib/api'
import Header from '@/app/components/Header'
import BranderHero from "@/app/components/BranderHero"
import BranderContent from "@/app/components/BranderContent"
import styles from './Brander.module.scss'

export const dynamicParams = true
export const revalidate = 10

export async function generateMetadata({ params: {brander} }) {
  try {
    const data = await fetchAPI(`
      query getBrandsByAuthor {
        brander(id: "${brander}", idType: SLUG) {
          title(format: RENDERED)
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
    console.error(`Failed to generate metadata for brander ${brander}:`, error.message);
    return {
      title: `${brander} | Brand Hub`,
      description: `Brand Hub - ${brander}`,
    }
  }
}

export async function generateStaticParams() {
  try {
    const branders = await fetchAPI(`
      query getBranders {
        branders {
          nodes {
            id
            slug
          }
        }
      }
    `);

    const branderArray = branders?.branders?.nodes;

    if (!branderArray || branderArray.length === 0) {
      return [];
    }

    return branderArray.map((brander) => ({
      brander: brander.slug
    }))
  } catch (error) {
    console.error('Failed to generate static params for branders:', error.message);
    // Return empty array - pages will be generated on-demand due to dynamicParams = true
    return [];
  }
}


export default async function Page({ params: { brander } }) {

  const data = await fetchAPI(`
    query getBranderByAuthor {
      brander(id: "${brander}", idType: SLUG) {
        id
        slug
        title(format: RENDERED)
        content(format: RENDERED)
        pageOptions {
          backgroundColor
          textColor
          faq
        }
        seo {
          metaDesc
          title
          fullHead
        }
        featuredImage {
          node {
            altText
            mediaDetails {
              height
              width
            }
            mediaItemUrl
          }
        }
        branderOptions {
          branderName
          branderQuote
          branderPhoto {
            altText
            mediaItemUrl
            mediaDetails {
              height
              width
            }
          }
          copyColumns {
            copy
          }
        }
      }
    }`
  );

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

  const backgroundColor = data?.brander?.pageOptions?.backgroundColor;
  const color = data?.brander?.pageOptions?.textColor;

  const branderData = data?.brander ?? null;
  const title = branderData?.title ?? null;
  const content = branderData?.content ?? null;
  const featuredImage = branderData?.featuredImage?.node ?? null;
  const branderContent = branderData?.branderOptions ?? null;

  return branderData ? (
    <main className={styles.pageWrap}>
      <Header 
        fullMenu={true} 
        backgroundColor={backgroundColor} 
        color={color}
      />
      <BranderHero content={content} title={title} featuredImage={featuredImage} />
      <BranderContent content={branderContent} />
    </main>
  ) : null
}