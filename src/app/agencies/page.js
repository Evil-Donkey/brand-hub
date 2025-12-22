import fetchAPI from '../lib/api'

export default async function Agencies() {
  try {
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
  } catch (error) {
    console.error('Failed to fetch agencies:', error.message);
    return (
      <main>
        <p>Unable to load agencies at this time.</p>
      </main>
    )
  }
}