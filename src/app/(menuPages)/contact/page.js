import fetchAPI from '@/app/lib/api'
import Header from '@/app/components/Header'
import Intro from '@/app/components/HomepageIntro'
import FormRequest from '@/app/components/FormRequest'
import Footer from '@/app/components/Footer'
import styles from '@/app/Homepage.module.scss'

export const metadata = {
  title: 'Contact - Brand Hub',
  description: '',
}

export default async function Contact() {

  const data = await fetchAPI(`
    query getContactPage {
      page(id: "231", idType: DATABASE_ID) {
        title(format: RENDERED)
      }
    }
  `);

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

  const title = data?.page?.title;
  const telephone = dataHomepage?.page?.homepage?.telephone;
  const email = dataHomepage?.page?.homepage?.email;

  return (
    <main className={styles.homepageMainWrap}>
      <Header fullMenu={true} />
      <Intro title={title} telephone={telephone} email={email} />
      <FormRequest />
      <Footer border={false} />
    </main>
  )
}
