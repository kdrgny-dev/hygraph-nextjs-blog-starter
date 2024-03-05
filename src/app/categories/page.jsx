import Link from 'next/link'
import Image from 'next/image'
import { AllCategories } from '../../queries/categories'

async function getCategories() {
  const allCategories = await fetch(process.env.HYGRAPH_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: AllCategories
    })
  }).then((res) => res.json())

  return allCategories.data.categories
}

export default async function Categories() {
  const allCategories = await getCategories()

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 py-10">
      {allCategories.map((category) => {
        return (
          <div
            key={category.id}
            className="border border-slate-200 rounded-lg overflow-hidden"
          >
            <article className="flex flex-col">
              <div className="relative overflow-hidden">
                <Link
                  href={`/categories/${category.slug}`}
                  className="h-44 overflow-hidden group block"
                >
                  <Image
                    src={category.categoryCoverImage.url}
                    alt={category.categoryName}
                    className="rounded-t-lg object-fill group-hover:scale-105 transition duration-150 ease-in-out"
                    width={800}
                    height={100}
                  />
                </Link>
              </div>
              <div className="p-4 flex flex-col gap-3">
                <h2 className="text-2xl font-bold tracking-tight text-primary">
                  <Link
                    href={`/categories/${category.slug}`}
                    className="text-gray-900"
                  >
                    {category.categoryName}
                  </Link>
                </h2>
                <Link
                  href={`/categories/${category.slug}`}
                  className="py-2 px-4 bg-primary text-white transition duration-150 ease-in-out rounded hover:bg-primary-foreground hover:text-primary w-max"
                >
                  Total Article : {category.posts.length}
                </Link>
              </div>
            </article>
          </div>
        )
      })}
    </div>
    // <h1>hi</h1>
  )
}
