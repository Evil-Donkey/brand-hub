import styles from './FlexibleContent.module.scss'
import AssetsDownload from './AssetsDownload/AssetsDownload';
import Tabs from './Tabs/Tabs';
import Colours from './Colours/Colours';
import Fonts from './Fonts/Fonts';
import EmailSignature from './EmailSignature/EmailSignature';
import Stationery from './Stationery/Stationery';
import BrandedImage from './BrandedImage/BrandedImage';
import Gallery from './Gallery/Gallery';

const FlexibleContent = ({ data }) => {
    return data && (
        <div className='container py-5'>
            {data && data.map((data, i) => {
                const { fieldGroupName, sectionTitle } = data;
                
                const n = i + 1;
                const number = n.toString().padStart(2, '0');
                
                let component = null;
                if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_AssetDownload") {
                    component = <AssetsDownload data={data} />;
                }
                if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_Tabs") {
                    component = <Tabs data={data} />;
                }
                if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_Colours") {
                    component = <Colours data={data} />;
                }
                if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_Fonts") {
                    component = <Fonts data={data} />;
                }
                if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_EmailSignature") {
                    component = <EmailSignature data={data} />;
                }
                if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_Stationery") {
                    component = <Stationery data={data} />;
                }
                if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_BrandedImage") {
                    component = <BrandedImage data={data} />;
                }
                if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_Gallery") {
                    component = <Gallery data={data} />;
                }
                
                return component && (
                    <div key={i.toString()} className='row row-cols-1'>
                        <div className={`col pt-3 pb-5 mt-5 ${styles.componentTitleWrap}`}>
                            <h4 className={styles.componentTitle}>{number}. {sectionTitle}</h4>
                        </div>
                        <div className='col mb-5'>
                            {component}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default FlexibleContent;