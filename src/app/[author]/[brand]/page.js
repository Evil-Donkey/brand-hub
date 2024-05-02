import fetchAPI from '@/app/lib/api'
import BrandLogin from '@/app/components/BrandLogin'
import BrandIntro from '@/app/components/BrandIntro'
import BrandHero from '@/app/components/BrandHero'
import FlexibleContent from '@/app/components/FlexibleContent'
import HeaderBrand from '@/app/components/HeaderBrand'
import Footer from "@/app/components/Footer"

export const dynamicParams = true
export const revalidate = 10

export async function generateMetadata({ params: {brand} }) {
  const data = await fetchAPI(`
    query getBrandsByAuthor {
      brand(id: "${brand}", idType: SLUG) {
        title(format: RENDERED)
        seo {
          metaDesc
          opengraphUrl
          opengraphTitle
          opengraphDescription
          opengraphType
          opengraphSiteName
          opengraphImage {
            mediaItemUrl
            mediaDetails {
              height
              width
            }
          }
        }
      }
    }
  `);

  const seo = data?.brand?.seo;
 
  return {
    title: data?.brand?.title,
    description: seo.metaDesc,
    openGraph: {
      title: seo.openGraphTitle,
      description: seo.openGraphTitle,
      url: seo.openGraphTitle,
      siteName: seo.openGraphTitle,
      images: [
        {
          url: seo.opengraphImage?.mediaItemUrl,
          width: seo.opengraphImage?.mediaDetails.width,
          height: seo.opengraphImage?.mediaDetails.height,
        }
      ],
      type: seo.opengraphType,
    }
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
              authorCustomFields {
                authorNiceName
                urlSlug
              }
            }
          }
        }
      }
    }
  `);

  const brandsArray = brands?.brands?.nodes;

  return brandsArray.map((brand) => ({
    author: brand.author.node.authorCustomFields.urlSlug,
    brand: brand.slug
  }))
}


export default async function Page({ params: { brand, author } }) {

  const data = await fetchAPI(`
    query getBrandsByAuthor {
      brand(id: "${brand}", idType: SLUG) {
        id
        slug
        title(format: RENDERED)
        password
        author {
          node {
            authorCustomFields {
              authorNiceName
            }
          }
        }
        seo {
          metaDesc
          title
          fullHead
        }
        brandOptions {
          backgroundColour
          containedHero
          hideAuthor
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
              copy2
              fieldGroupName
              passwordProtected
              sectionTitle
              title
            }
            ... on Brand_Brandoptions_FlexibleContent_TwoColumns {
              fieldGroupName
              passwordProtected
              sectionTitle
              title
              blocks {
                copy
                image {
                  altText
                  mediaDetails {
                    height
                    width
                  }
                  mediaItemUrl
                  sizes(size: LARGE)
                }
              }
            }
            ... on Brand_Brandoptions_FlexibleContent_LargeImage {
              fieldGroupName
              passwordProtected
              sectionTitle
              title
              image {
                altText
                mediaDetails {
                  height
                  width
                }
                mediaItemUrl
                sizes(size: _2048X2048)
              }
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
                    mediaDetails {
                      file
                    }
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
              logoUrl
              emailType
              sectionTitle
              signatureCopyColour
              signatureCopyFontSize
              linksColour
              socials
              title
              disclaimer
              logos {
                image {
                  mediaItemUrl
                  mediaDetails {
                    height
                    width
                  }
                }
                url
              }
              fields {
                name
                bottomMargin
                link
                bold
              }
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
                    sizes {
                      height
                      width
                    }
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

  const dataHomepage = await fetchAPI(`
    query getHomepage {
      page(id: "5", idType: DATABASE_ID) {
        homepage {
          telephone
          email
        }
      }
    }
  `);

  const telephone = dataHomepage?.page?.homepage?.telephone;
  const email = dataHomepage?.page?.homepage?.email;

  const brandData = data?.brand;
  const flexibleContent = brandData?.brandOptions?.flexibleContent;
  const brandOptions = brandData?.brandOptions;
  const bgColour = brandData?.brandOptions?.backgroundColour;
  const textColour = brandData?.brandOptions?.textColour;
  const pwd = brandData?.password?.password;
  const authorNiceName = brandData?.author.node.authorCustomFields.authorNiceName;
  const hideAuthor = brandData?.brandOptions?.hideAuthor;

  let nav = [];
  for (let i = 0; i < flexibleContent.length; i++) {
    const sectionTitle = flexibleContent[i].sectionTitle;
    sectionTitle && nav.push(sectionTitle);
  }

  return brandData ? (
    <div style={{ 'backgroundColor': bgColour, 'color': textColour }}>
      <HeaderBrand nav={nav} bgColour={bgColour} color={textColour} pwd={pwd} />
      {pwd && <BrandLogin pwd={pwd} bgColour={bgColour} color={textColour} />}
      <BrandIntro data={brandData} author={authorNiceName} hideAuthor={hideAuthor} />
      <BrandHero data={brandOptions} />
      <FlexibleContent data={flexibleContent} pwd={pwd} bgColour={bgColour} colour={textColour} brand={brand} />
      <Footer border={true} color={textColour} telephone={telephone} email={email} />
    </div>
  ) : null
}