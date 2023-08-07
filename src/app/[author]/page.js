import fetchAPI from '../lib/api'

// export async function generateStaticParams({ params: { author } }) {

//   const brands = await fetchAPI(`
//     query getBrandsByAuthor {
//       agencies(where: {slug: "${author}"}) {
//         nodes {
//           brands {
//             nodes {
//               content(format: RENDERED)
//               id
//               slug
//               title(format: RENDERED)
//             }
//           }
//         }
//       }
//     }`
//   );

//   const brandsList = brands?.agencies?.nodes;
//   let brandsArray = [];
//   brandsList.forEach(brand => {
//     brandsArray.push(brand.brands.nodes);
//   });
//   brandsArray = brandsArray.concat.apply([], brandsArray);
 
//   return brandsArray.map((brand) => ({
//     slug: brand.id,
//   }))
// }

// export async function generateStaticParams() {
  
//   const brands = await fetchAPI(`
//     query getBrandsByAuthor {
//       brands(where: {author: "${author}"}) {
//         nodes {
//           brands {
//             nodes {
//               content(format: RENDERED)
//               id
//               slug
//               title(format: RENDERED)
//             }
//           }
//         }
//       }
//     }`
//   );
 
//   return brands.map((brand) => ({
//     author: brand.slug,
//   }))
// }
 
// // Multiple versions of this page will be statically generated
// // using the `params` returned by `generateStaticParams`
// export default function Page({ params }) {
//   const { slug } = params
//   // ...
// }

export default async function AuthorPage({ params }) {

  console.log(params)

  const { author } = params
 
  return (
    <main>
      {author}
    </main>
  )
}