import { groq } from 'next-sanity'

export const getAllProjectsQuery = groq`
  *[_type == "project"] | order(order asc) {
    _id,
    title,
    slug,
    order,
    year,
    tags,
    summary,
    cardDescription,
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
    metadata,
    body[] {
      ...,
      _type == "image" => {
        ...,
        asset->
      },
      _type == "videoFile" => {
        ...,
        file { asset-> }
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

export const getSideProjectQuery = groq`
  *[_type == "sideProject"][0] {
    _id,
    title,
    cardDescription,
    cardOrder,
    cardImage {
      asset->,
      alt
    },
    body[] {
      ...,
      _type == "image" => {
        ...,
        asset->
      },
      _type == "videoFile" => {
        ...,
        file { asset-> }
      }
    }
  }
`
