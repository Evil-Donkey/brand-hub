import fetchAPI from "@/app/lib/api"
import BrandLogin from "@/app/components/BrandLogin"
import BrandIntro from "@/app/components/BrandIntro"
import BrandHero from "@/app/components/BrandHero"
import FlexibleContent from "@/app/components/FlexibleContent"
import HeaderBrand from "@/app/components/HeaderBrand"
import Footer from "@/app/components/Footer"

export const dynamicParams = true
export const revalidate = 10

export async function generateMetadata({ params: {audit} }) {
  const data = await fetchAPI(`
    query getAuditByAuthor {
      audit(id: "${audit}", idType: SLUG) {
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

  const seo = data?.audit?.seo;
 
  return {
    title: data?.audit?.title,
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
  const audits = await fetchAPI(`
    query getAudits {
      audits {
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

  const auditsArray = audits?.audits?.nodes;

  return auditsArray.map((audit) => ({
    audit: audit.slug
  }))
}


export default async function Page({ params: { audit } }) {

  const data = await fetchAPI(`
    query getAuditsByAuthor {
      audit(id: "${audit}", idType: SLUG) {
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
            ... on Audit_Brandoptions_FlexibleContent_Text {
              copy
              copy2
              fieldGroupName
              passwordProtected
              sectionTitle
              title
            }
            ... on Audit_Brandoptions_FlexibleContent_TwoColumns {
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
            ... on Audit_Brandoptions_FlexibleContent_LargeImage {
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
            ... on Audit_Brandoptions_FlexibleContent_AssetDownload {
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
            ... on Audit_Brandoptions_FlexibleContent_Tabs {
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
            ... on Audit_Brandoptions_FlexibleContent_Colours {
              fieldGroupName
              sectionTitle
              title
              passwordProtected
              colours {
                colour
                name
              }
            }
            ... on Audit_Brandoptions_FlexibleContent_Fonts {
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
            ... on Audit_Brandoptions_FlexibleContent_EmailSignature {
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
              signatureCopyColour
              signatureCopyFontSize
              socials
              title
              disclaimer
              fields {
                name
                bottomMargin
                link
              }
            }
            ... on Audit_Brandoptions_FlexibleContent_Stationery {
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
            ... on Audit_Brandoptions_FlexibleContent_Gallery {
              fieldGroupName
              sectionTitle
              title
              passwordProtected
              gallery {
                mediaItemUrl
                id
              }
            }
            ... on Audit_Brandoptions_FlexibleContent_BrandedImage {
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

  const auditData = data?.audit;
  const flexibleContent = auditData?.brandOptions?.flexibleContent;
  const brandOptions = auditData?.brandOptions;
  const bgColour = auditData?.brandOptions?.backgroundColour;
  const textColour = auditData?.brandOptions?.textColour;
  const pwd = auditData?.password?.password;
  const authorNiceName = auditData?.author.node.authorCustomFields.authorNiceName;
  const hideAuthor = auditData?.brandOptions?.hideAuthor;

  let nav = [];
  for (let i = 0; i < flexibleContent.length; i++) {
    const sectionTitle = flexibleContent[i].sectionTitle;
    sectionTitle && nav.push(sectionTitle);
  }

  return auditData ? (
    <div style={{ 'backgroundColor': bgColour, 'color': textColour }}>
      <HeaderBrand nav={nav} bgColour={bgColour} color={textColour} pwd={pwd} />
      {pwd && <BrandLogin pwd={pwd} bgColour={bgColour} color={textColour} />}
      <BrandIntro data={auditData} author={authorNiceName} hideAuthor={hideAuthor} />
      <BrandHero data={brandOptions} />
      <FlexibleContent data={flexibleContent} pwd={pwd} bgColour={bgColour} colour={textColour} brand={audit} />
      <Footer border={true} color={textColour} telephone={telephone} email={email} />
    </div>
  ) : null;
}