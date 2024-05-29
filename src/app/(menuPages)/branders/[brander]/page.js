import fetchAPI from '@/app/lib/api'
import Header from '@/app/components/Header'
import BranderHero from "@/app/components/BranderHero"
import BranderContent from "@/app/components/BranderContent"
import Footer from '@/app/components/Footer'
import styles from './Brander.module.scss'

export const dynamicParams = true
export const revalidate = 10

export async function generateMetadata({ params: {brander} }) {
  const data = await fetchAPI(`
    query getBrandsByAuthor {
      brander(id: "${brander}", idType: SLUG) {
        title(format: RENDERED)
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
 
  const opengraphType = seo?.opengraphType || 'website';

  return {
    title: 'Branders | Brand Hub',
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

export async function generateStaticParams() {
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

  return branderArray.map((brander) => ({
    brander: brander.slug
  }))
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
  const telephone = dataOptions?.acfOptionsThemeSettings?.themeSettings?.telephone;
  const email = dataOptions?.acfOptionsThemeSettings?.themeSettings?.email;

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
      <Footer border={false} telephone={telephone} email={email} color="#ffffff" />
    </main>
  ) : null
}