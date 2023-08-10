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

const FlexibleContent = ({ data }) => {

    const { match, storedPwd } = useContext(PasswordContext);

    
    let restrictedComponents = [];
    let allComponents = [];

    {data && data.map((data) => {
        const { fieldGroupName, sectionTitle, passwordProtected } = data;

        if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_AssetDownload") {
            allComponents.push([<AssetsDownload data={data} />, sectionTitle]);
        }
        if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_AssetDownload" && passwordProtected) {
            restrictedComponents.push([<AssetsDownload data={data} />, sectionTitle]);
        }
        if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_Tabs") {
            allComponents.push([<Tabs data={data} />, sectionTitle]);
        }
        if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_Tabs" && passwordProtected) {
            restrictedComponents.push([<Tabs data={data} />, sectionTitle]);
        }
        if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_Colours") {
            allComponents.push([<Colours data={data} />, sectionTitle]);
        }
        if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_Colours" && passwordProtected) {
            restrictedComponents.push([<Colours data={data} />, sectionTitle]);
        }
        if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_Fonts") {
            allComponents.push([<Fonts data={data} />, sectionTitle]);
        }
        if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_Fonts" && passwordProtected) {
            restrictedComponents.push([<Fonts data={data} />, sectionTitle]);
        }
        if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_EmailSignature") {
            allComponents.push([<EmailSignature data={data} />, sectionTitle]);
        }
        if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_EmailSignature" && passwordProtected) {
            restrictedComponents.push([<EmailSignature data={data} />, sectionTitle]);
        }
        if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_Stationery") {
            allComponents.push([<Stationery data={data} />, sectionTitle]);
        }
        if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_Stationery" && passwordProtected) {
            restrictedComponents.push([<Stationery data={data} />, sectionTitle]);
        }
        if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_BrandedImage") {
            allComponents.push([<BrandedImage data={data} />, sectionTitle]);
        }
        if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_BrandedImage" && passwordProtected) {
            restrictedComponents.push([<BrandedImage data={data} />, sectionTitle]);
        }
        if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_Gallery") {
            allComponents.push([<Gallery data={data} />, sectionTitle]);
        }
        if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_Gallery" && passwordProtected) {
            restrictedComponents.push([<Gallery data={data} />, sectionTitle]);
        }
    })};

    if (match || !storedPwd) {
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