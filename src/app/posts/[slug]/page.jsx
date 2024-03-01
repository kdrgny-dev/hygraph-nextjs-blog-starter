import { SinglePost } from '@/queries/posts'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { RichText } from '@graphcms/rich-text-react-renderer'
import { cookies, draftMode } from 'next/headers'
import { Badge } from '@/components/ui/badge'

async function getData(slug) {
  const cookieStore = cookies()
  const apiUrl = cookieStore.get('apiUrl')?.value
  const { post } = await fetch(apiUrl ? apiUrl : process.env.HYGRAPH_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: SinglePost,
      variables: { slug: slug }
    })
  })
    .then((res) => res.json())
    .then((res) => res.data)
  return post
}

export async function generateMetadata({ params }) {
  const post = await getData(params.slug)
  if (!post) return notFound()
  return {
    title: post.title,
    description: post.description || post.seo?.description,
    openGraph: {
      images: [
        {
          url: post.coverImage?.url,
          width: post.coverImage?.width,
          height: post.coverImage?.height
        }
      ]
    }
  }
}

export default async function Post({ params }) {
  const post = await getData(params.slug)

  if (!post) {
    return notFound()
  }
  return (
    <article>
      <header className="py-12 flex flex-col gap-4">
        <h1 className="text-5xl  font-extrabold text-gray-900 tracking-tight text-center">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 justify-center">
          {post.categories.map((category) => (
            <Link
              key={category.categoryName}
              href={`/categories/${category.slug}`}
            >
              <Badge key={category.categoryName}>{category.categoryName}</Badge>
            </Link>
          ))}
        </div>
        <time dateTime={post.date} className="text-slate-400 text-center">
          {new Date(post.date).toLocaleDateString('en-us', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </time>
      </header>
      {post.excerpt && (
        <p className="prose italic max-w-none text-center bg-slate-100 p-4 text-slate-400 mb-5">
          {post.excerpt}
        </p>
      )}
      <div className="flex flex-col gap-4 pb-10 post-content">
        <Image
          src={post.coverImage.url}
          width={800}
          height={200}
          alt={post.title}
          className="mx-auto"
        />
        <div className="prose max-w-none">
          <RichText content={post.content.raw} />
        </div>
      </div>
    </article>
  )
}
