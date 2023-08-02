import fetchAPI from '../../lib/api'

export async function generateStaticParams({ params: { agency } }) {
  const brands = await fetchAPI(`
    query getBrandsByAgency {
      agencies(where: {slug: "${agency}"}) {
        nodes {
          brands {
            nodes {
              content(format: RENDERED)
              id
              slug
              title(format: RENDERED)
            }
          }
        }
      }
    }`
  );

  const brandsList = brands?.agencies?.nodes;
  let brandsArray = [];
  brandsList.forEach(brand => {
    brandsArray.push(brand.brands.nodes);
  });
  brandsArray = brandsArray.concat.apply([], brandsArray);
 
  return brandsArray.map((brand) => ({
    slug: brand.id,
  }))
}

export default async function AgencyPage({ params }) {

  const { agency } = params
 
  return (
    <main>

      {agency}

      
    </main>
  )
}