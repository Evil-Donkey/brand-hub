import fetchAPI from '@/app/lib/api'
import Header from '@/app/components/Header'
import Intro from '@/app/components/HomepageIntro'
import ContactBlock from '@/app/components/ContactBlock'
import PageFlexibleContent from '@/app/components/PageFlexibleContent'
import FormRequest from '@/app/components/FormRequest'
import Faqs from '@/app/components/Faqs'
import Footer from '@/app/components/Footer'
import styles from '@/app/Homepage.module.scss'

export async function generateMetadata() {

  const data = await fetchAPI(`
    query getContactPage {
      page(id: "231", idType: DATABASE_ID) {
        seo {
          title
          metaDesc
          schema {
            raw
          }
          title
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

export default async function Contact() {

  const data = await fetchAPI(`
    query getContactPage {
      page(id: "231", idType: DATABASE_ID) {
        title(format: RENDERED)
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
          instagram
          linkedin
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
  const featuredImage = data?.page?.featuredImage;
  const telephone = dataOptions?.acfOptionsThemeSettings?.themeSettings?.telephone;
  const email = dataOptions?.acfOptionsThemeSettings?.themeSettings?.email;
  const instagram = dataOptions?.acfOptionsThemeSettings?.themeSettings?.instagram;
  const linkedin = dataOptions?.acfOptionsThemeSettings?.themeSettings?.linkedin;
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
      
      <Intro 
        backgroundColor={backgroundColor} 
        color={color} 
        title={title} 
        c1={6} 
        c2={6}
        featuredImage={featuredImage}
      />

      <ContactBlock 
        email={email}
        instagram={instagram}
        linkedin={linkedin}
        telephone={telephone}
      />
      
      <PageFlexibleContent data={flexibleContent} />
      
      <FormRequest />

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
}
