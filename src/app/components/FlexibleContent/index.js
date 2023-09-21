'use client'

import { useContext, useEffect } from 'react'
import styles from './FlexibleContent.module.scss'
import PasswordContext from '../../lib/passwordContext'
import stringToSlug from '../../lib/stringToSlug'
import Text from './Text'
import TwoColumns from './TwoColumns'
import LargeImage from './LargeImage'
import AssetsDownload from './AssetsDownload'
import Tabs from './Tabs'
import Colours from './Colours'
import Fonts from './Fonts'
import EmailSignature from './EmailSignature'
import Stationery from './Stationery'
import BrandedImage from './BrandedImage'
import Gallery from './Gallery'

const FlexibleContent = ({ data, pwd, bgColour, brand, colour }) => {

    const { match } = useContext(PasswordContext);
    
    let restrictedComponents = [];
    let allComponents = [];

    useEffect(() => {
        document.documentElement.style.setProperty("--theme-color-00", colour);
    }, []);

    {data && data.forEach((data, i) => {
        const { fieldGroupName, sectionTitle, title, passwordProtected } = data;

        if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_Text") {
            allComponents.push([<Text key={i.toString()} data={data} />, title, sectionTitle]);
        }
        if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_Text" && !passwordProtected) {
            restrictedComponents.push([<Text key={i.toString()} data={data} />, title, sectionTitle]);
        }
        if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_TwoColumns") {
            allComponents.push([<TwoColumns key={i.toString()} data={data} />, title, sectionTitle]);
        }
        if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_TwoColumns" && !passwordProtected) {
            restrictedComponents.push([<TwoColumns key={i.toString()} data={data} />, title, sectionTitle]);
        }
        if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_LargeImage") {
            allComponents.push([<LargeImage key={i.toString()} data={data} />, title, sectionTitle]);
        }
        if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_LargeImage" && !passwordProtected) {
            restrictedComponents.push([<LargeImage key={i.toString()} data={data} />, title, sectionTitle]);
        }
        if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_AssetDownload") {
            allComponents.push([<AssetsDownload key={i.toString()} data={data} colour={colour} />, title, sectionTitle]);
        }
        if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_AssetDownload" && !passwordProtected) {
            restrictedComponents.push([<AssetsDownload key={i.toString()} data={data} colour={colour} />, title, sectionTitle]);
        }
        if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_Tabs") {
            allComponents.push([<Tabs key={i.toString()} data={data} bgColour={bgColour} />, title, sectionTitle]);
        }
        if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_Tabs" && !passwordProtected) {
            restrictedComponents.push([<Tabs key={i.toString()} data={data} bgColour={bgColour} />, title, sectionTitle]);
        }
        if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_Colours") {
            allComponents.push([<Colours key={i.toString()} data={data} />, title, sectionTitle]);
        }
        if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_Colours" && !passwordProtected) {
            restrictedComponents.push([<Colours key={i.toString()} data={data} />, title, sectionTitle]);
        }
        if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_Fonts") {
            allComponents.push([<Fonts key={i.toString()} data={data} />, title, sectionTitle]);
        }
        if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_Fonts" && !passwordProtected) {
            restrictedComponents.push([<Fonts key={i.toString()} data={data} />, title, sectionTitle]);
        }
        if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_EmailSignature") {
            allComponents.push([<EmailSignature key={i.toString()} data={data} />, title, sectionTitle]);
        }
        if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_EmailSignature" && !passwordProtected) {
            restrictedComponents.push([<EmailSignature key={i.toString()} data={data} />, title, sectionTitle]);
        }
        if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_Stationery") {
            allComponents.push([<Stationery key={i.toString()} data={data} />, title, sectionTitle]);
        }
        if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_Stationery" && !passwordProtected) {
            restrictedComponents.push([<Stationery key={i.toString()} data={data} />, title, sectionTitle]);
        }
        if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_BrandedImage") {
            allComponents.push([<BrandedImage key={i.toString()} data={data} bgColour={bgColour} brand={brand} />, title, sectionTitle]);
        }
        if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_BrandedImage" && !passwordProtected) {
            restrictedComponents.push([<BrandedImage key={i.toString()} data={data} bgColour={bgColour} brand={brand} />, title, sectionTitle]);
        }
        if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_Gallery") {
            allComponents.push([<Gallery key={i.toString()} data={data} />, title, sectionTitle]);
        }
        if (fieldGroupName === "Brand_Brandoptions_FlexibleContent_Gallery" && !passwordProtected) {
            restrictedComponents.push([<Gallery key={i.toString()} data={data} />, title, sectionTitle]);
        }
    })};


    const FlexibleItem = ({componentEl, number, sectionTitle, slug, title}) => {
        return (
            <div className='row row-cols-1' id={slug}>
                {sectionTitle &&
                    <div className={`col py-3 ${styles.componentTitleWrap}`}>
                        <h3 className={styles.componentTitle}>{sectionTitle}</h3>
                    </div>
                }
                {title &&
                    <div className={`col pt-3 pb-5 ${sectionTitle ? styles.componentTitleWrapNoMargin : ''} ${styles.componentTitleWrap}`}>
                        <h4 className={styles.componentTitle}>{number && number + '.'} {title}</h4>
                    </div>
                }
                <div className='col mb-md-5'>
                    {componentEl}
                </div>
            </div>
        )
    }

    if (match || !pwd) {
        return (
            <div className='container py-5'>
                {allComponents.map((component, i) => {

                    const componentEl = component[0];
                    const title = component[1] || null;
                    const sectionTitle = component[2] || null;
                    const slug = sectionTitle ? stringToSlug(sectionTitle) : null;

                    const n = i + 1;
                    const number = n.toString().padStart(2, '0');
                    
                    return component && (
                        <FlexibleItem key={i.toString()} title={title} number={number} componentEl={componentEl} sectionTitle={sectionTitle} slug={slug} />
                    )
                })}
            </div>
        )
    }


    return restrictedComponents.length > 0 && (
        <div className='container py-5'>
            {restrictedComponents.map((component, i) => {

                const componentEl = component[0];
                const title = component[1] || null;
                const sectionTitle = component[2] || null;

                const n = i + 1;
                const number = n.toString().padStart(2, '0');
                
                return component && (
                    <FlexibleItem key={i.toString()} title={title} number={number} componentEl={componentEl} sectionTitle={sectionTitle} />
                )
            })}
        </div>
    )
}

export default FlexibleContent;