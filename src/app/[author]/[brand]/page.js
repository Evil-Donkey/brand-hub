import fetchAPI from '../../lib/api'
import BrandLogin from '../../components/BrandLogin'
import BrandIntro from '../../components/BrandIntro'
import BrandHero from '../../components/BrandHero'
import FlexibleContent from '../../components/FlexibleContent'

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
        password {
          password
        }
        brandOptions {
          backgroundColour
          containedHero
          textColour
          heroYoutubeVideo
          splineUrl
          heroVideoMp4 {
            mediaItemUrl
          }
          heroImage {
            altText
            mediaItemUrl
            sizes(size: LARGE)
            mediaDetails {
              width
              height
            }
          }
          flexibleContent {
            ... on Brand_Brandoptions_FlexibleContent_AssetDownload {
              fieldGroupName
              sectionTitle
              passwordProtected
              assets {
                previewImage {
                  altText
                  mediaItemUrl
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
                  }
                }
              }
            }
            ... on Brand_Brandoptions_FlexibleContent_Tabs {
              fieldGroupName
              sectionTitle
              withTabbedNav
              tabActiveColour
              tabs {
                copy
                tabLabel
                assets {
                  heading
                  youtubeVideo
                  splineUrl
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
                    mediaItemUrl
                  }
                  file {
                    mediaItemUrl
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
                  mediaItemUrl
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
                  mediaItemUrl
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
                mediaItemUrl
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
  const brandOptions = brandData?.brandOptions;
  const bgColour = brandData?.brandOptions?.backgroundColour;
  const textColour = brandData?.brandOptions?.textColour;
  const pwd = brandData?.password?.password;

  return brandData ? (
    <div style={{ 'backgroundColor': bgColour, 'color': textColour }}>
      {pwd && <BrandLogin pwd={pwd} />}
      <BrandIntro data={brandData} author={author} />
      <BrandHero data={brandOptions} />
      <FlexibleContent data={flexibleContent} />
    </div>
  ) : null
}