import Link from 'next/link'
import { SingleNav } from '@/queries/navigations'

async function getNav(navId) {
  const res = await fetch(process.env.HYGRAPH_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: SingleNav,
      variables: { navId: navId }
    })
  }).then((res) => res.json())

  if (res.errors) {
    console.error(res.errors)
    throw new Error(res.errors[0].message)
  }
  return res.data.navigation.link
}

export default async function NavList({ navId }) {
  const navItems = await getNav(navId)
  return (
    <>
      {navItems.map((navItem) => {
        const url = navItem.externalUrl || navItem.page.slug
        return (
          <li key={navItem.id}>
            <Link
              href={`/${url}`}
              className="text-white inline-flex items-center justify-center py-2 px-4 transition-colors duration-150 ease-in hover:bg-white hover:text-primary rounded"
            >
              {navItem.displayText}
            </Link>
          </li>
        )
      })}
    </>
  )
}
