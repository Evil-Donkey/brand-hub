'use client'

import { useContext } from 'react'
import styles from './FlexibleContent.module.scss'
import PasswordContext from '../../lib/passwordContext'
import AssetsDownload from './AssetsDownload';
import Tabs from './Tabs';
import Colours from './Colours';
import Fonts from './Fonts';
import EmailSignature from './EmailSignature';
import Stationery from './Stationery';
import BrandedImage from './BrandedImage';
import Gallery from './Gallery';

const FlexibleContent = ({ data, pwd, bgColour }) => {

    const { match, storedPwd } = useContext(PasswordContext);

    
    let restrictedComponents = [];
    let allComponents = [];

    {data && data.forEach((data, i) => {
        const { fieldGroupName, sectionTitle, passwordProtected } = data;

        if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_AssetDownload") {
            allComponents.push([<AssetsDownload key={i.toString()} data={data} />, sectionTitle]);
        }
        if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_AssetDownload" && !passwordProtected) {
            restrictedComponents.push([<AssetsDownload key={i.toString()} data={data} />, sectionTitle]);
        }
        if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_Tabs") {
            allComponents.push([<Tabs key={i.toString()} data={data} />, sectionTitle]);
        }
        if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_Tabs" && !passwordProtected) {
            restrictedComponents.push([<Tabs key={i.toString()} data={data} />, sectionTitle]);
        }
        if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_Colours") {
            allComponents.push([<Colours key={i.toString()} data={data} />, sectionTitle]);
        }
        if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_Colours" && !passwordProtected) {
            restrictedComponents.push([<Colours key={i.toString()} data={data} />, sectionTitle]);
        }
        if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_Fonts") {
            allComponents.push([<Fonts key={i.toString()} data={data} />, sectionTitle]);
        }
        if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_Fonts" && !passwordProtected) {
            restrictedComponents.push([<Fonts key={i.toString()} data={data} />, sectionTitle]);
        }
        if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_EmailSignature") {
            allComponents.push([<EmailSignature key={i.toString()} data={data} />, sectionTitle]);
        }
        if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_EmailSignature" && !passwordProtected) {
            restrictedComponents.push([<EmailSignature key={i.toString()} data={data} />, sectionTitle]);
        }
        if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_Stationery") {
            allComponents.push([<Stationery key={i.toString()} data={data} />, sectionTitle]);
        }
        if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_Stationery" && !passwordProtected) {
            restrictedComponents.push([<Stationery key={i.toString()} data={data} />, sectionTitle]);
        }
        if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_BrandedImage") {
            allComponents.push([<BrandedImage key={i.toString()} data={data} bgColour={bgColour} />, sectionTitle]);
        }
        if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_BrandedImage" && !passwordProtected) {
            restrictedComponents.push([<BrandedImage key={i.toString()} data={data} bgColour={bgColour} />, sectionTitle]);
        }
        if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_Gallery") {
            allComponents.push([<Gallery key={i.toString()} data={data} />, sectionTitle]);
        }
        if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_Gallery" && !passwordProtected) {
            restrictedComponents.push([<Gallery key={i.toString()} data={data} />, sectionTitle]);
        }
    })};

    if (match || !pwd) {
        return (
            <div className='container py-5'>
                {allComponents.map((component, i) => {

                    const componentEl = component[0];
                    const sectionTitle = component[1] || null;

                    const n = i + 1;
                    const number = n.toString().padStart(2, '0');
                    
                    return component && (
                        <div key={i.toString()} className='row row-cols-1'>
                            {sectionTitle &&
                                <div className={`col pt-3 pb-5 mt-5 ${styles.componentTitleWrap}`}>
                                    <h4 className={styles.componentTitle}>{number && number + '.'} {sectionTitle}</h4>
                                </div>
                            }
                            <div className='col mb-5'>
                                {componentEl}
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }


    return restrictedComponents.length > 0 && (
        <div className='container py-5'>
            {restrictedComponents.map((component, i) => {

                const componentEl = component[0];
                const sectionTitle = component[1] || null;

                const n = i + 1;
                const number = n.toString().padStart(2, '0');
                
                return component && (
                    <div key={i.toString()} className='row row-cols-1'>
                        {sectionTitle &&
                            <div className={`col pt-3 pb-5 mt-5 ${styles.componentTitleWrap}`}>
                                <h4 className={styles.componentTitle}>{number && number + '.'} {sectionTitle}</h4>
                            </div>
                        }
                        <div className='col mb-5'>
                            {componentEl}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default FlexibleContent;