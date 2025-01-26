import fetchAPI from '@/app/lib/api'
import Header from '@/app/components/Header'
import Intro from '@/app/components/PageIntro'
import PageFlexibleContent from '@/app/components/PageFlexibleContent'
import Faqs from '@/app/components/Faqs'
import Disclaimer from '@/app/components/Disclaimer'
import Footer from '@/app/components/Footer'
import styles from '@/app/Homepage.module.scss'

export async function generateMetadata() {

  const data = await fetchAPI(`
    query getAlternativePage {
      page(id: "1176", idType: DATABASE_ID) {
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

export default async function Pricing() {

  const data = await fetchAPI(`
    query getPricingPage {
      page(id: "1176", idType: DATABASE_ID) {
        title(format: RENDERED)
        content(format: RENDERED)
        disclaimer {
          disclaimer
        }
        pageOptions {
          backgroundColor
          textColor
          faq
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
        flexibleContent {
          flexibleContent {
            ... on Page_Flexiblecontent_FlexibleContent_TwoColumnsTextimage {
              fieldGroupName
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
                textColour
                buttons {
                  fieldGroupName
                  label
                  style
                  url
                }
                mobileImageBottom {
                  altText
                  mediaDetails {
                    height
                    width
                  }
                  mediaItemUrl
                }
                mobileImageTop {
                  altText
                  mediaDetails {
                    height
                    width
                  }
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
                name
                price
                services
                theme
              }
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
            ... on Page_Flexiblecontent_FlexibleContent_Comparison {
              backgroundColor
              fieldGroupName
              options {
                features
                name
                priceCopy
                priceFrom
                priceTo
                dollars
                services
                theme
                ukBadge
                logo {
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
      acfFlexibleContentComparisonFeaturesOptions
      acfFlexibleContentComparisonServicesOptions
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
  const disclaimer = data?.page?.disclaimer.disclaimer;
  const featuredImage = data?.page?.featuredImage;
  const telephone = dataOptions?.acfOptionsThemeSettings?.themeSettings?.telephone;
  const email = dataOptions?.acfOptionsThemeSettings?.themeSettings?.email;
  const flexibleContent = data?.page?.flexibleContent?.flexibleContent;
  const features = data?.acfFlexibleContentComparisonFeaturesOptions;
  const services = data?.acfFlexibleContentComparisonServicesOptions;
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
        hideSignUp={false}
        discountBarCopy={discountBarCopy}
      />

      <Intro 
        backgroundColor={backgroundColor} 
        color={color} 
        content={content}
        title={title} 
        c1={8} 
        c2={4}
        featuredImage={featuredImage}
        isComparising={true}
      />
      
      <PageFlexibleContent 
        data={flexibleContent} 
        features={features} 
        services={services} 
      />

      {faq && <Faqs data={faqs} bookDemoUrl={bookDemoUrl} />}

      {disclaimer && <Disclaimer disclaimer={disclaimer} />}
      
      <Footer 
        border={false} 
        telephone={telephone} 
        email={email} 
        color={color}
        backgroundColor={backgroundColor} 
      />
    </main>
  )
}
