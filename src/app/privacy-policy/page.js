import fetchAPI from '../lib/api'
import Link from 'next/link'
import Image from 'next/image'
import Footer from '../components/Footer'
import styles from './PrivacyPolicy.module.scss'

export default async function PrivacyPolicy() {

  const data = await fetchAPI(`
    query getPrivacyPolicy {
      page(id: "3", idType: DATABASE_ID) {
        title
        content(format: RENDERED)
      }
    }
  `);

  const title = data?.page?.title;
  const content = data?.page?.content;
  
  return (
    <main className={styles.pageWrap}>
      <div className={`${styles.headerContainer} container py-3`}>
          <div className={`row`}>
              <div className='col-auto'>
                  <Link href="/">
                      <Image src="/images/icon-bh-logo.svg" alt="" width="45" height="45" />
                  </Link>
              </div>
          </div>
      </div>
      <div className='container py-5'>
        <div className='row row-cols-1'>
          <div className='col mb-5'>
            <h1>{title}</h1>
          </div>
          <div className='col'>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      </div>
      <Footer border={true} />
    </main>
  )
}