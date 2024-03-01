import PostsList from '@/components/PostsList'

export const metadata = {
  title: 'blog.kdrgny.com'
}

export default async function Home({}) {
  return (
    <div className="py-10">
      <PostsList />
    </div>
  )
}
