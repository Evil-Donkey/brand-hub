import SingleCentredColumn from './SingleCentredColumn'
import TwoColumnsTextImage from './TwoColumnsTextImage'
import ThreeColumnsGrid from './ThreeColumnsGrid'
import Pricing from './Pricing'
import Comparising from './Comparising'

const PageFlexibleContent = ({ data, features, services, servicesRow }) => {

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
        if (fieldGroupName === "Page_Flexiblecontent_FlexibleContent_Pricing") {
            flexibleContentArray.push(<Pricing data={data} allFeatures={features} allServices={services} allServicesRow={servicesRow} />);
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