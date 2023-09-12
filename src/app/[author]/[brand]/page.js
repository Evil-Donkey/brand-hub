import fetchAPI from '../../lib/api'
import BrandLogin from '../../components/BrandLogin'
import BrandIntro from '../../components/BrandIntro'
import BrandHero from '../../components/BrandHero'
import FlexibleContent from '../../components/FlexibleContent'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export const dynamicParams = true
export const revalidate = 10


export async function generateMetadata({ params: {brand} }) {
  const data = await fetchAPI(`
    query getBrandsByAuthor {
      brand(id: "${brand}", idType: SLUG) {
        title(format: RENDERED)
      }
    }
  `);
 
  return {
    title: data?.brand.title
  }
}

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

  console.log(brand)

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
          heroOverlayLogo {
            altText
            mediaItemUrl
            mediaDetails {
              height
              width
            }
          }
          textColour
          heroYoutubeVideo
          splineUrl
          heroVideoMp4 {
            mediaItemUrl
          }
          heroImage {
            altText
            mediaItemUrl
            mediaDetails {
              width
              height
            }
          }
          flexibleContent {
            ... on Brand_Brandoptions_FlexibleContent_Text {
              copy
              fieldGroupName
              passwordProtected
              sectionTitle
              title
            }
            ... on Brand_Brandoptions_FlexibleContent_AssetDownload {
              fieldGroupName
              sectionTitle
              title
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
                    title
                    mediaItemUrl
                  }
                }
              }
            }
            ... on Brand_Brandoptions_FlexibleContent_Tabs {
              fieldGroupName
              sectionTitle
              title
              withTabbedNav
              tabActiveColour
              passwordProtected
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
              title
              passwordProtected
              colours {
                colour
                name
              }
            }
            ... on Brand_Brandoptions_FlexibleContent_Fonts {
              fieldGroupName
              sectionTitle
              title
              passwordProtected
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
              passwordProtected
              logo {
                mediaItemUrl
                mediaDetails {
                  height
                  width
                }
              }
              sectionTitle
              title
            }
            ... on Brand_Brandoptions_FlexibleContent_Stationery {
              fieldGroupName
              sectionTitle
              title
              passwordProtected
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
              title
              passwordProtected
              gallery {
                mediaItemUrl
                id
              }
            }
            ... on Brand_Brandoptions_FlexibleContent_BrandedImage {
              copy
              fieldGroupName
              sectionTitle
              title
              passwordProtected
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

  let nav = [];
  for (let i = 0; i < flexibleContent.length; i++) {
    const sectionTitle = flexibleContent[i].sectionTitle;
    sectionTitle && nav.push(sectionTitle);
  }

  return brandData ? (
    <div style={{ 'backgroundColor': bgColour, 'color': textColour }}>
      <Header nav={nav} bgColour={bgColour} pwd={pwd} />
      {pwd && <BrandLogin pwd={pwd} bgColour={bgColour} />}
      <BrandIntro data={brandData} author={author} />
      <BrandHero data={brandOptions} />
      <FlexibleContent data={flexibleContent} pwd={pwd} bgColour={bgColour} brand={brand} />
      <Footer border={true} />
    </div>
  ) : null
}