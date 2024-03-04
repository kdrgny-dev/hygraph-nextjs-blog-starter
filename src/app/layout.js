import './globals.css'
import Header from '@/components/Header'

export const metadata = {
  title: {
    template: '%s | Hygraph Blog Next.js Starter'
  },
  openGraph: {
    title: 'blog.kdrgny.com',
    description: 'kdrgny blog about web development, Ayvalık, and more.'
  }
}
export const revalidate = 1800 // revalidate at most every hour

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <div className="container mx-auto">
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}
