import fetchAPI from '../../lib/api'
import BrandIntro from '../../components/BrandIntro/BrandIntro';
import BrandFeaturedImage from '../../components/BrandFeaturedImage/BrandFeaturedImage';
import FlexibleContent from '../../components/FlexibleContent/FlexibleContent';

export const dynamicParams = false
export const revalidate = 10

export async function generateStaticParams() {
  const brands = await fetchAPI(`
    query getBrands {
      brands {
        nodes {
          id
          slug
          author {
            node {
              id
              name
              slug
            }
          }
        }
      }
    }
  `);

  const brandsArray = brands?.brands?.nodes;

  return brandsArray.map((brand) => ({
    author: brand.author.node.name,
    brand: brand.slug
  }))
}


export default async function Page({ params: { brand, author } }) {

  // brandBy(slug: "${brand}") {

  const data = await fetchAPI(`
    query getBrandsByAuthor {
      brand(id: "${brand}", idType: SLUG) {
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
      }
    }`
  );

  const brandData = data?.brand;
  const flexibleContent = brandData?.brandOptions?.flexibleContent;
  const bgColour = brandData?.brandOptions?.backgroundColour;
  const textColour = brandData?.brandOptions?.textColour;

  return brandData ? (
    <div style={{ 'backgroundColor': bgColour, 'color': textColour }}>
      <BrandIntro data={brandData} author={author} />
      <BrandFeaturedImage data={brandData} />
      <FlexibleContent data={flexibleContent} />
    </div>
  ) : null
}