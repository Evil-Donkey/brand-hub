import fetchAPI from '../../lib/api'
import styles from './Brand.module.scss'
import BrandIntro from '../../components/BrandIntro/BrandIntro';
import BrandHero from '../../components/BrandHero/BrandHero';
import FlexibleContent from '../../components/FlexibleContent/FlexibleContent';

export default async function BrandPage({ params: { slug } }) {

// brand(id: ${slug}, idType: SLUG) {

  const data = await fetchAPI(`
    query getBrand {
      brandBy(slug: "${slug}") {
        id
        slug
        title(format: RENDERED)
        featuredImage {
          node {
            sourceUrl(size: LARGE)
            sizes(size: LARGE)
            mediaDetails {
              width
              height
            }
          }
        }
        brandOptions {
          backgroundColour
          containedFeaturedImage
          textColour
          flexibleContent {
            ... on Brand_Brandoptions_FlexibleContent_AssetDownload {
              fieldGroupName
              sectionTitle
              assets {
                previewImage {
                  altText
                  sourceUrl(size: LARGE)
                  mediaDetails {
                    height
                    width
                  }
                  sizes(size: LARGE)
                }
                files {
                  file {
                    mediaDetails {
                      file
                    }
                    mediaItemUrl
                    sourceUrl(size: LARGE)
                  }
                }
              }
            }
            ... on Brand_Brandoptions_FlexibleContent_Tabs {
              fieldGroupName
              sectionTitle
              withTabbedNav
              tabs {
                copy
                tabLabel
                assets {
                  heading
                  vimeoyoutubeVideo
                  videoMp4 {
                    mediaItemUrl
                  }
                  image {
                    altText
                    mediaDetails {
                      height
                      width
                    }
                    sizes(size: LARGE)
                    sourceUrl(size: LARGE)
                  }
                  file {
                    sourceUrl(size: LARGE)
                  }
                }
              }
            }
            ... on Brand_Brandoptions_FlexibleContent_Colours {
              fieldGroupName
              sectionTitle
              colours {
                colour
                name
              }
            }
            ... on Brand_Brandoptions_FlexibleContent_Fonts {
              fieldGroupName
              sectionTitle
              fonts {
                fontUrl
                name
                previewImage {
                  altText
                  mediaDetails {
                    height
                    width
                  }
                  sizes
                  sourceUrl(size: LARGE)
                }
              }
            }
            ... on Brand_Brandoptions_FlexibleContent_EmailSignature {
              copy
              fieldGroupName
              logo {
                mediaItemUrl
                mediaDetails {
                  height
                  width
                }
              }
              sectionTitle
            }
            ... on Brand_Brandoptions_FlexibleContent_Stationery {
              fieldGroupName
              sectionTitle
              assets {
                heading
                previewImage {
                  altText
                  sourceUrl(size: LARGE)
                  mediaDetails {
                    height
                    width
                  }
                  sizes(size: LARGE)
                }
                files {
                  fileLabel
                  file {
                    mediaItemUrl
                  }
                }
              }
            }
            ... on Brand_Brandoptions_FlexibleContent_Gallery {
              fieldGroupName
              sectionTitle
              gallery {
                sourceUrl(size: LARGE)
                id
              }
            }
            ... on Brand_Brandoptions_FlexibleContent_BrandedImage {
              copy
              fieldGroupName
              sectionTitle
              stickers {
                sticker {
                  mediaDetails {
                    height
                    width
                  }
                  sourceUrl(size: LARGE)
                }
              }
              footerImage {
                mediaDetails {
                  height
                  width
                }
                sourceUrl(size: LARGE)
              }
            }
          }
        }
        agencies {
          nodes {
            name
          }
        }
      }
    }`
  );

  const brandData = data?.brandBy;
  const flexibleContent = brandData?.brandOptions?.flexibleContent;
  const bgColour = brandData?.brandOptions?.backgroundColour;
  const textColour = brandData?.brandOptions?.textColour;

  // console.log(flexibleContent);
 
  return brandData ? (
    <div style={{ 'backgroundColor': bgColour, 'color': textColour }}>
      <BrandIntro data={brandData} />
      <BrandHero data={brandData} />
      <FlexibleContent data={flexibleContent} />
    </div>
  ) : null
}