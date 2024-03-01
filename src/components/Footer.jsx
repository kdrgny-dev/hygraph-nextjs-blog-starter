import Link from 'next/link'
import NavList from './NavList'

export default function Footer() {
  return (
    <footer className="bg-primary mt-5 dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <Link
                href="/"
                aria-label="blog.kdrgny.com"
                className="text-white"
              >
                blog.kdrgny.com
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Follow us
                </h2>
                <ul className="text-gray-600 dark:text-gray-400 font-medium">
                  <ul>
                    <NavList navId="social" />
                  </ul>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="text-white text-center">
            made with ❤️ by{' '}
            <a
              href="https://kdrgny.com"
              className="text-gray-600 dark:text-gray-400 font-medium"
            >
              kdrgny
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
