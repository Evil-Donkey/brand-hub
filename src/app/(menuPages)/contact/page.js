import fetchAPI from '@/app/lib/api'
import Header from '@/app/components/Header'
import Intro from '@/app/components/HomepageIntro'
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
    title: 'Contact us | Brand Hub',
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
        title={title} 
        c1={6} 
        c2={6}
        featuredImage={featuredImage}
      />

      <div className='container py-5'>
        <div className='row'>
          <div className='col-md-4'>
            <h2 className="mb-3">Our details</h2>
          </div>
          <div className='col-md-8'>
            <div className='d-flex flex-column flex-md-row gap-md-5'>
              <div>
                <p>
                  <b>Contact us</b>
                  <br />
                  {telephone}
                  <br />
                  <a href={`mailto:${email}`} target="_blank" rel="noreferrer">{email}</a>
                </p>
              </div>

              <div>
                <p>
                  <b>Follow us</b>
                  <br />
                  <a href={instagram} target="_blank" rel="noreferrer">Instagram</a>
                  <br />
                  <a href={linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
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
