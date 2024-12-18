import TikTokEmbed from './TikTok'
import styles from './Socials.module.scss'
import Image from 'next/image'

const Socials = () => {
  

  return (
    <div className={styles.socials}>
      <div className='container py-5 mt-md-5'>
          <div className='row justify-content-between'>
              <div className='col-md-4 mb-5'>
                  <h2>Our socials</h2>
                  <p>We have fun while promoting our business. Our social feed has spoof ads that'll make you chuckle, but the message behind them is always spot on. Take a look and get a taste of what we're all about!</p>
                  <div className='d-flex align-items-center'>
                      <p className='m-0'>Find us on</p>
                      <div className='d-flex gap-2 align-items-center ms-4'>
                        <a href="https://www.instagram.com/brand_hub_studio/" target="_blank">
                          <Image className={styles.icon} src='/images/icon-instagram-1.svg' width={35} height={35} alt='Instagram' />
                        </a>
                        <a href="https://linkedin.com/company/brand-hub-studio/" target="_blank">
                          <Image className={styles.icon} src='/images/icon-linkedin-1.svg' width={35} height={35} alt='LinkedIn' />
                        </a>
                        <a href="https://www.tiktok.com/@_brand_hub" target="_blank">
                          <Image className={styles.icon} src='/images/icon-tiktok.svg' width={35} height={35} alt='Tik Tok' />
                        </a>
                      </div>
                  </div>
              </div>
              <div className='col-md-8 col-lg-7'>
                <TikTokEmbed />
              </div>
          </div>
      </div>
    </div>
  );
};

export default Socials;
