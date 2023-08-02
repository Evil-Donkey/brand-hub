import fetchAPI from '../lib/api'

export async function generateStaticParams() {
  
  const agencies = await fetchAPI(`
      query getAgencies {
        agencies {
          nodes {
            name
            slug
            id
          }
        }
    }`
  );

  const agenciesList = agencies?.agencies?.nodes;
 
  return agenciesList.map((agency) => ({
    agency: agency.slug,
  }))
}

export default function BrandsLayout({
  children,
}) {
  return (
    <section>
      {children}
    </section>
  )
}