import SingleCentredColumn from './SingleCentredColumn'
import TwoColumnsTextImage from './TwoColumnsTextImage'
import ThreeColumnsGrid from './ThreeColumnsGrid'
import TwoBoxes from './TwoBoxes'
import Pricing from './Pricing'
import Comparising from './Comparising'
import Faqs from '../Faqs'

const PageFlexibleContent = ({ data, features, services, servicesRow, faq, bookDemoUrl }) => {

    let flexibleContentArray = [];

    {data && data.forEach((data, i) => {
        const { fieldGroupName } = data;

        if (fieldGroupName === "Page_Flexiblecontent_FlexibleContent_SingleCentredColumn") {
            flexibleContentArray.push(<SingleCentredColumn data={data} />);
        }
        if (fieldGroupName === "Page_Flexiblecontent_FlexibleContent_TwoColumnsTextimage") {
            flexibleContentArray.push(<TwoColumnsTextImage data={data} />);
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
    })}

    return (
        <>
           {flexibleContentArray.map((component) => component)} 
        </>
    );
};

export default PageFlexibleContent;