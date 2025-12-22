import fetchAPI from '../../lib/api'
import Header from '@/app/components/Header'
import Intro from '@/app/components/PageIntro'
import Faqs from '@/app/components/Faqs'
import styles from './PrivacyPolicy.module.scss'

export async function generateMetadata() {
  try {
    const data = await fetchAPI(`
      query getContactPage {
        page(id: "973", idType: DATABASE_ID) {
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
    console.error('Failed to generate metadata for terms-of-service page:', error.message);
    return {
      title: 'Terms of Service | Brand Hub',
      description: 'Brand Hub Terms of Service',
    }
  }
}

export default async function PrivacyPolicy() {
  try {
    const data = await fetchAPI(`
    query getPrivacyPolicy {
      page(id: "973", idType: DATABASE_ID) {
        title
        content(format: RENDERED)
        pageOptions {
          backgroundColor
          textColor
          faq
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
    const telephone = dataOptions?.acfOptionsThemeSettings?.themeSettings?.telephone;
    const email = dataOptions?.acfOptionsThemeSettings?.themeSettings?.email;
    const faq = data?.page?.pageOptions?.faq;
    const bookDemoUrl = dataOptions?.acfOptionsThemeSettings?.themeSettings?.bookDemoUrl;
    const discountBarCopy = dataOptions?.acfOptionsThemeSettings?.themeSettings?.discountBarCopy;
    const faqs = dataOptions?.acfOptionsThemeSettings?.themeSettings?.faqs;
    
    return (
      <main className={styles.pageWrap}>
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
          c1={12}
        />
        
        <div className='container py-5'>
          <div className='row'>
            <div className='col-md-9'>
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
          </div>
        </div>

        {faq && <Faqs data={faqs} bookDemoUrl={bookDemoUrl} />}

      </main>
    )
  } catch (error) {
    console.error('Failed to load terms-of-service page:', error.message);
    return null;
  }
}