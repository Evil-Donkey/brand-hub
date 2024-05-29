export default async function AuthorPage({ params }) {

  const { author } = params
 
  return (
    <main>
      {author}
    </main>
  )
}