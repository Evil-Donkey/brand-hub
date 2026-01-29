import fetchAPI from '@/app/lib/api'
import Header from '@/app/components/Header'
import HomeIntro from '@/app/components/HomepageIntro'
import PageFlexibleContent from '@/app/components/PageFlexibleContent'
import Socials from '../../components/Socials'
import styles from '@/app/Homepage.module.scss'

export async function generateMetadata() {

  const data = await fetchAPI(`
    query getContactPage {
      page(id: "1577", idType: DATABASE_ID) {
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
      page(id: "1577", idType: DATABASE_ID) {
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
          mobileFeaturedImage {
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
                seoTitle
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
              fieldGroupName
              codeHubPrice
              codeHubSignUpUrl
              designCodeHubPrice
              designCodeHubSignUpUrl
              designHubPrice
              designHubSignUpUrl
              options {
                style
                features
                name
                services
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
            ... on Page_Flexiblecontent_FlexibleContent_TextSlider {
              fieldGroupName
              style
              slider {
                author
                copy
              }
            }
            ... on Page_Flexiblecontent_FlexibleContent_WebsiteManagement {
              backgroundColor
              contentPrice
              contentSignUpUrl
              coreContentPrice
              coreContentSignUpUrl
              corePrice
              coreSignUpUrl
              fieldGroupName
              options {
                name
                services
                style
              }
            }
            ... on Page_Flexiblecontent_FlexibleContent_LogosGrid {
              fieldGroupName
              heading
              logos {
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
      acfFlexibleContentFeaturesOptions
      acfFlexibleContentServicesOptions
      acfFlexibleContentServicesRowOptions
      acfFlexibleContentWebsiteManagementServicesOptions
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
  const flexibleContent = data?.page?.flexibleContent?.flexibleContent;
  const websiteManagementServices = data?.acfFlexibleContentWebsiteManagementServicesOptions;
  const features = data?.acfFlexibleContentFeaturesOptions;
  const services = data?.acfFlexibleContentServicesOptions;
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
        hideSignUp={true}
        discountBarCopy={discountBarCopy}
      />
      
      <PageFlexibleContent 
        data={flexibleContent} 
        features={features}
        services={services} 
        websiteManagement={true}
        websiteManagementServices={websiteManagementServices}
        faq={faqs}
        bookDemoUrl={bookDemoUrl}
      />

      <Socials />
    </main>
  )
}
