/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'
import NavList from './NavList'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="py-3 bg-primary sticky top-0 left-0 w-full">
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" aria-label="blog.kdrgny.com" className="text-white">
              <Image
                src="/logo.png"
                alt="blog.kdrgny.com"
                width={100}
                height={50}
              />
            </Link>
            <h2 className="text-xl">
              <Link
                href="/"
                aria-label="blog.kdrgny.com"
                className="text-white font-semibold text-3xl"
              >
                kdrgny's blog
              </Link>
            </h2>
          </div>
          <nav className="relative">
            <ul className="flex items-center gap-2">
              <NavList navId="main" />
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
