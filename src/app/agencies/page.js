import fetchAPI from '../lib/api'

export default async function Agencies() {

  const data = await fetchAPI(`
      query getAgencies {
        agencies {
          nodes {
            name
            slug
            uri
            id
          }
        }
    }`
  );

  // console.log(data?.agencies?.nodes);
  let agencies = data?.agencies?.nodes;
  
  return agencies && (
    <main>

      {agencies?.map((agency) => (
        <div key={agency.id}><a href={`/agencies/${agency.slug}`}>{agency.name}</a></div>
      ))}
      
    </main>
  )
}