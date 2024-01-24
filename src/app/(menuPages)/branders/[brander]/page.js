import parse from "html-react-parser"
import Head from "next/head"
import fetchAPI from '../../../lib/api'
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

  const seo = data?.brander?.seo;
 
  return {
    title: data?.brand?.title,
    description: seo?.metaDesc,
    openGraph: {
      title: seo?.openGraphTitle,
      description: seo?.openGraphTitle,
      url: seo?.openGraphTitle,
      siteName: seo?.openGraphTitle,
      images: [
        {
          url: seo?.opengraphImage?.mediaItemUrl,
          width: seo?.opengraphImage?.mediaDetails.width,
          height: seo?.opengraphImage?.mediaDetails.height,
        }
      ],
      type: seo?.opengraphType,
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

  const telephone = dataHomepage?.page?.homepage?.telephone ?? null;
  const email = dataHomepage?.page?.homepage?.email ?? null;

  const branderData = data?.brander ?? null;
  const title = branderData.title ?? null;
  const content = branderData.content ?? null;
  const featuredImage = branderData.featuredImage?.node ?? null;
  const branderContent = branderData.branderOptions ?? null;

  return branderData ? (
    <main className={styles.pageWrap}>
      <Header fullMenu={true} color="#ffffff" />
      <BranderHero content={content} title={title} featuredImage={featuredImage} />
      <BranderContent content={branderContent} />
      <Footer border={false} telephone={telephone} email={email} color="#ffffff" />
    </main>
  ) : null
}