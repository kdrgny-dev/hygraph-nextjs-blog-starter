import Link from 'next/link'
import Image from 'next/image'
import { CategoryPosts } from '@/queries/posts'

async function getPosts(slug) {
  const categoryPosts = await fetch(process.env.HYGRAPH_ENDPOINT, {
    next: { revalidate: 900 },
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: CategoryPosts,
      variables: { slug: slug }
    })
  }).then((res) => res.json())

  return categoryPosts.data.categories[0].posts
}

export default async function PostsByCategory({ params }) {
  const categoryPosts = await getPosts(params.slug)

  return (
    <div className="grid grid-cols-3 gap-4 py-10">
      {categoryPosts.map((post) => {
        return (
          <div
            key={post.id}
            className="border border-slate-200 rounded-lg overflow-hidden"
          >
            <article className="flex flex-col">
              <div className="relative overflow-hidden">
                <Link
                  href={`/posts/${post.slug}`}
                  className="max-h-44 overflow-hidden group"
                >
                  <Image
                    src={post.coverImage.url}
                    alt={post.title}
                    className="rounded-t-lg object-cover group-hover:scale-105 transition duration-150 ease-in-out"
                    width={800}
                    height={100}
                  />
                </Link>
                <time
                  className="rounded bg-primary p-2 text-sm text-white absolute top-2 right-2"
                  dateTime={post.date}
                >
                  {new Date(post.date).toLocaleDateString('en-us', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </time>
              </div>
              <div className="p-4 flex flex-col gap-3">
                <h2 className="text-2xl font-bold tracking-tight text-primary">
                  <Link href={`/posts/${post.slug}`} className="text-gray-900">
                    {post.title}
                  </Link>
                </h2>
                {post.excerpt && (
                  <div className="prose max-w-none text-gray-500 line-clamp-4">
                    {post.excerpt}
                  </div>
                )}
                <Link
                  href={`/posts/${post.slug}`}
                  className="py-2 px-4 bg-primary text-white transition duration-150 ease-in-out rounded hover:bg-primary-foreground hover:text-primary w-max"
                  aria-label={`Read "${post.title}"`}
                >
                  Read more
                </Link>
              </div>
            </article>
          </div>
        )
      })}
    </div>
  )
}
