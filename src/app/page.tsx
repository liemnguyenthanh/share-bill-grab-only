import { HomePage } from "@/components/pages/home-page"

const getData = async () => {
  const data = await fetch('https://jsonplaceholder.typicode.com/todos')

  return data.json()
}

export default async function Home() {
  const todos = await getData()
  return (
    <HomePage />
  )
}
