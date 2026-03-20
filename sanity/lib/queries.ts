import { groq } from 'next-sanity'

export const getAllProjectsQuery = groq`
  *[_type == "project"] | order(year desc) {
    _id,
    title,
    slug,
    year,
    tags,
    summary,
    cardImage {
      asset->,
      alt
    },
    coverImage {
      asset->,
      alt
    }
  }
`

export const getProjectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    year,
    tags,
    summary,
    externalLink,
    coverImage {
      asset->,
      alt
    },
    storeLinks,
    body[] {
      ...,
      _type == "image" => {
        ...,
        asset->
      }
    },
    gallery[] {
      asset->,
      alt
    }
  }
`

export const getAllProjectSlugsQuery = groq`
  *[_type == "project"] { "slug": slug.current }
`
