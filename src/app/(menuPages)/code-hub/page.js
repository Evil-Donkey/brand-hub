import fetchAPI from '@/app/lib/api'
import Header from '@/app/components/Header'
import HomeIntro from '@/app/components/HomepageIntro'
import PageFlexibleContent from '@/app/components/PageFlexibleContent'
import Socials from '../../components/Socials'
import styles from '@/app/Homepage.module.scss'

export async function generateMetadata() {
  try {
    const data = await fetchAPI(`
      query getContactPage {
        page(id: "1369", idType: DATABASE_ID) {
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
    console.error('Failed to generate metadata for code-hub page:', error.message);
    return {
      title: 'Code Hub | Brand Hub',
      description: 'Brand Hub Code Hub',
    }
  }
}

export default async function Pricing() {
  try {
    const data = await fetchAPI(`
    query getPricingPage {
      page(id: "1369", idType: DATABASE_ID) {
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
          themeColour
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
            ... on Page_Flexiblecontent_FlexibleContent_SingleColumn {
              copy
              darkMode
              heading
              fieldGroupName
              buttons {
                label
                style
                url
              }
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
            ... on Page_Flexiblecontent_FlexibleContent_Service {
              fieldGroupName
              otherServiceCopy
              features
              otherServiceUrl
              price
              service
              services
              signUpUrl
              icon {
                altText
                mediaItemUrl
                mediaDetails {
                  height
                  width
                }
              }
              otherServiceIcon {
                altText
                mediaItemUrl
                mediaDetails {
                  height
                  width
                }
              }
            }
          }
        }
      }
      acfFlexibleContentFeaturesOptions
      acfFlexibleContentServicesOptions
      acfFlexibleContentServicesRowOptions
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
  
    const themeColour = data?.page?.pageOptions?.themeColour;
    const backgroundColor = data?.page?.pageOptions?.backgroundColor;
    const color = data?.page?.pageOptions?.textColor;
    const title = data?.page?.title;
    const content = data?.page?.content;
    const featuredImage = data?.page?.featuredImage;
    const mobileFeaturedImage = data?.page?.pageOptions?.mobileFeaturedImage;
    const telephone = dataOptions?.acfOptionsThemeSettings?.themeSettings?.telephone;
    const email = dataOptions?.acfOptionsThemeSettings?.themeSettings?.email;
    const flexibleContent = data?.page?.flexibleContent?.flexibleContent;
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
          themeColour={themeColour}
          codeHub={true}
        />

        <HomeIntro 
          backgroundColor={backgroundColor} 
          color={color} 
          content={content} 
          title={title} 
          featuredImage={featuredImage}
          mobileFeaturedImage={mobileFeaturedImage}
          hasDrop={false}
          themeColour={themeColour}
          hasButtons={true}
        />
        
        <PageFlexibleContent 
          data={flexibleContent} 
          features={features} 
          services={services} 
          faq={faqs}
          bookDemoUrl={bookDemoUrl}
          themeColour={themeColour}
          svgImage={true}
        />

        <Socials />
      </main>
    )
  } catch (error) {
    console.error('Failed to load code-hub page:', error.message);
    return null;
  }
}
