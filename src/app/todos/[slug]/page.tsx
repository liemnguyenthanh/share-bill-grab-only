export async function generateStaticParams() {

  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((post) => ({
    slug: post.toString(),
  }))
}


export default async function Page() {

  return (
    <div className="">asd</div>
  )
}
