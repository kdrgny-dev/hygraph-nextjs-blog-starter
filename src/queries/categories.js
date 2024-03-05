const AllCategories = `
  query AllCategories {
    categories {
      categoryName
      slug
      categoryCoverImage {
        url
        width
        height
      }
      posts {
        id
      }
    }
  }
`

export { AllCategories }
