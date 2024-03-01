const AllPosts = `
  query AllPosts {
    posts(orderBy: publishedAt_DESC) {
      id
      excerpt
      slug
      title
      date
      coverImage {
        url
        width
        height
      }
    }
  }
`

const SinglePost = `
  query SinglePost($slug: String!) {
    post(where: { slug: $slug }) {
      createdAt
      updatedAt
      publishedAt
      title
      slug
      date
      excerpt
      content {
        raw
        html
        markdown
        text
      }
      coverImage {
        url
        width
        height
      }
      categories {
        categoryName
        slug
      }
      author {
        ... on Author {
          remoteTypeName: __typename
          remoteId: id
          name
          title
          picture {
            url
            width
            height
          }
        }
      }


    }
  }
`

const CategoryPosts = `
  query CategoryPosts($slug: String!) {
    categories(where: { slug: $slug }) {
      categoryName
      slug
      posts(orderBy: date_DESC) {
        id
        excerpt
        slug
        title
        date
        coverImage {
          url
          width
          height
        }
      }
    }
  }
`

export { AllPosts, SinglePost, CategoryPosts }
