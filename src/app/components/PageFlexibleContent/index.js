import SingleColumn from './SingleColumn'
import SingleCentredColumn from './SingleCentredColumn'
import TwoColumnsTextImage from './TwoColumnsTextImage'
import ThreeColumnsGrid from './ThreeColumnsGrid'
import TwoBoxes from './TwoBoxes'
import Pricing from './Pricing'
import Comparising from './Comparising'
import TextSlider from './TextSlider'
import Faqs from '../Faqs'
import Service from './Service'
import WeDoGrid from './WeDoGrid'

const PageFlexibleContent = ({ data, features, services, faq, bookDemoUrl, themeColour, svgImage, showreel }) => {

    let flexibleContentArray = [];

    {data && data.forEach((data, i) => {
        const { fieldGroupName } = data;

        if (fieldGroupName === "Page_Flexiblecontent_FlexibleContent_SingleCentredColumn") {
            flexibleContentArray.push(<SingleCentredColumn data={data} showreel={showreel} />);
        }
        if (fieldGroupName === "Page_Flexiblecontent_FlexibleContent_SingleColumn") {
            flexibleContentArray.push(<SingleColumn data={data} themeColour={themeColour} />);
        }
        if (fieldGroupName === "Page_Flexiblecontent_FlexibleContent_TwoColumnsTextimage") {
            flexibleContentArray.push(<TwoColumnsTextImage data={data} svgImage={svgImage} showreel={showreel} />);
        }
        if (fieldGroupName === "Page_Flexiblecontent_FlexibleContent_ThreeColumnsGrid") {
            flexibleContentArray.push(<ThreeColumnsGrid data={data} />);
        }
        if (fieldGroupName === "Page_Flexiblecontent_FlexibleContent_TwoBoxes") {
            flexibleContentArray.push(<TwoBoxes data={data} />);
        }
        if (fieldGroupName === "Page_Flexiblecontent_FlexibleContent_Faq") {
            flexibleContentArray.push(<Faqs data={faq} bookDemoUrl={bookDemoUrl} />);
        }
        if (fieldGroupName === "Page_Flexiblecontent_FlexibleContent_Pricing") {
            flexibleContentArray.push(<Pricing data={data} allFeatures={features} allServices={services} />);
        }
        if (fieldGroupName === "Page_Flexiblecontent_FlexibleContent_Comparison") {
            flexibleContentArray.push(<Comparising data={data} allFeatures={features} allServices={services} />);
        }
        if (fieldGroupName === "Page_Flexiblecontent_FlexibleContent_TextSlider") {
            flexibleContentArray.push(<TextSlider data={data} />);
        }
        if (fieldGroupName === "Page_Flexiblecontent_FlexibleContent_Service") {
            flexibleContentArray.push(<Service data={data} />);
        }
        if (fieldGroupName === "Page_Flexiblecontent_FlexibleContent_WeDoGrid") {
            flexibleContentArray.push(<WeDoGrid data={data} themeColour={themeColour} />);
        }
    })}

    return (
        <>
           {flexibleContentArray.map((component) => component)} 
        </>
    );
};

export default PageFlexibleContent;