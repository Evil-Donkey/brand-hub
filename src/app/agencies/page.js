import fetchAPI from '../lib/api'

export default async function Agencies() {

  const data = await fetchAPI(`
    query getUsers {
      users {
        nodes {
          id
          name
          slug
          databaseId
          nickname
        }
      }
    }
  `);

  let agencies = data?.users?.nodes;
  
  return agencies && (
    <main>

      {agencies?.map((agency) => {
        console.log(agency)
        return (
          <div key={agency.id}><a href={agency.slug}>{agency.name}</a></div>
        );
      })}
      
    </main>
  )
}