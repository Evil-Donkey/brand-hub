import fetchAPI from './lib/api'
import Header from './components/Header'
import Intro from './components/HomepageIntro'
import PageFlexibleContent from './components/PageFlexibleContent'
import Faqs from './components/Faqs'
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
 
  const opengraphType = seo?.opengraphType || 'website';

  return {
    title: 'Unlimited Brand Servicing | Brand Hub',
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
                month
                name
                price
                services
                servicesRow
                theme
                type
              }
            }
            ... on Page_Flexiblecontent_FlexibleContent_SingleCentredColumn {
              fieldGroupName
              backgroundColor
              copy
              textColor
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
  const homepageRotatingList = data?.page?.homepageRotatingList?.rotatingList;
  const telephone = dataOptions?.acfOptionsThemeSettings?.themeSettings?.telephone;
  const email = dataOptions?.acfOptionsThemeSettings?.themeSettings?.email;
  const flexibleContent = data?.page?.flexibleContent?.flexibleContent;
  const faq = data?.page?.pageOptions?.faq;
  const bookDemoUrl = dataOptions?.acfOptionsThemeSettings?.themeSettings?.bookDemoUrl;
  const faqs = dataOptions?.acfOptionsThemeSettings?.themeSettings?.faqs;

  return (
    <main className={styles.homepageMainWrap}>
      <Header 
        fullMenu={true} 
        backgroundColor={backgroundColor} 
        color={color}
        bookDemoUrl={bookDemoUrl}
      />
      
      <Intro 
        backgroundColor={backgroundColor} 
        color={color} 
        content={content} 
        title={title} 
        isHome={true}
        homepageRotatingList={homepageRotatingList}
      />

      <PageFlexibleContent 
        data={flexibleContent}
      />

      {faq && <Faqs data={faqs} bookDemoUrl={bookDemoUrl} />}

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