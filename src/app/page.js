import fetchAPI from './lib/api'
import Header from './components/Header'
import HomeIntro from './components/HomepageIntro'
import PageFlexibleContent from './components/PageFlexibleContent'
import Footer from './components/Footer'
import Socials from './components/Socials'
import styles from './Homepage.module.scss'

export async function generateMetadata() {

  const data = await fetchAPI(`
    query getContactPage {
      page(id: "5", idType: DATABASE_ID) {
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

export default async function Why() {

  const data = await fetchAPI(`
    query getHomePage {
      page(id: "5", idType: DATABASE_ID) {
        content(format: RENDERED)
        title(format: RENDERED)
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
        pageOptions {
          backgroundColor
          textColor
          faq
        }
        homepageRotatingList {
          rotatingList {
            text
          }
        }
        flexibleContent {
          flexibleContent {
            ... on Page_Flexiblecontent_FlexibleContent_TwoColumnsTextimage {
              backgroundColor
              fieldGroupName
              textColor
              rows {
                copy
                image {
                  altText
                  mediaDetails {
                    height
                    width
                  }
                  mediaItemUrl
                }
                video {
                  mediaItemUrl
                }
                dropColour
                backgroundColour
                buttonLabel
                buttonUrl
              }
            }
            ... on Page_Flexiblecontent_FlexibleContent_ThreeColumnsGrid {
              backgroundColor
              fieldGroupName
              heading
              textColor
              grid {
                copy
                icon {
                  altText
                  mediaDetails {
                    height
                    width
                  }
                  mediaItemUrl
                }
              }
            }
            ... on Page_Flexiblecontent_FlexibleContent_Pricing {
              backgroundColor
              fieldGroupName
              options {
                ctaLabel
                ctaUrl
                features
                name
                price
                services
                theme
              }
            }
            ... on Page_Flexiblecontent_FlexibleContent_Faq {
              fieldGroupName
              faq
            }
            ... on Page_Flexiblecontent_FlexibleContent_SingleCentredColumn {
              fieldGroupName
              backgroundColor
              copy
              textColor
            }
            ... on Page_Flexiblecontent_FlexibleContent_TwoBoxes {
              backgroundColor
              fieldGroupName
              heading
              textColor
              boxes {
                backgroundColor
                color
                copy
                graphic {
                  altText
                  mediaDetails {
                    height
                    width
                  }
                  mediaItemUrl
                }
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
          bookDemoUrl
          discountBarCopy
          faqs {
            answer
            question
          }
        }
      }
    }
  `);

  const backgroundColor = data?.page?.pageOptions?.backgroundColor;
  const color = data?.page?.pageOptions?.textColor;
  const title = data?.page?.title;
  const content = data?.page?.content;
  const featuredImage = data?.page?.featuredImage;
  const homepageRotatingList = data?.page?.homepageRotatingList?.rotatingList;
  const telephone = dataOptions?.acfOptionsThemeSettings?.themeSettings?.telephone;
  const email = dataOptions?.acfOptionsThemeSettings?.themeSettings?.email;
  const flexibleContent = data?.page?.flexibleContent?.flexibleContent;
  const faq = data?.page?.pageOptions?.faq;
  const bookDemoUrl = dataOptions?.acfOptionsThemeSettings?.themeSettings?.bookDemoUrl;
  const discountBarCopy = dataOptions?.acfOptionsThemeSettings?.themeSettings?.discountBarCopy;
  const faqs = dataOptions?.acfOptionsThemeSettings?.themeSettings?.faqs;

  return (
    <main className={styles.homepageMainWrap}>
      <Header 
        fullMenu={true} 
        backgroundColor={backgroundColor} 
        color={color}
        bookDemoUrl={bookDemoUrl}
        discountBarCopy={discountBarCopy}
      />
      
      <HomeIntro 
        backgroundColor={backgroundColor} 
        color={color} 
        content={content} 
        title={title} 
        featuredImage={featuredImage}
      />

      <PageFlexibleContent 
        data={flexibleContent}
        faq={faqs}
        bookDemoUrl={bookDemoUrl}
      />

      <Socials />

      <Footer 
        border={false} 
        telephone={telephone} 
        email={email} 
        color={color}
        backgroundColor={backgroundColor} 
      />
    </main>
  )
};