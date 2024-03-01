import './globals.css'
import Header from '@/components/Header'

export const metadata = {
  title: {
    template: '%s | Hygraph Blog Next.js Starter'
  },
  openGraph: {
    title: 'Next.js',
    description: 'The React Framework for the Web'
  }
}
export const revalidate = 3600 // revalidate at most every hour

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
