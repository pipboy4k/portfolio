export interface SanityImage {
  asset: {
    _id: string
    url: string
    metadata: {
      dimensions: {
        width: number
        height: number
      }
    }
  }
  alt?: string
  caption?: string
}

export interface Project {
  _id: string
  title: string
  slug: { current: string }
  year: number
  tags?: string[]
  summary: string
  cardImage?: SanityImage
  coverImage: SanityImage
  externalLink?: string
}

export interface StoreLink {
  type: 'appStore' | 'googlePlay' | 'web'
  url: string
}

export interface ProjectDetail extends Project {
  body?: Array<{ _type: string; [key: string]: unknown }>
  gallery?: SanityImage[]
  storeLinks?: StoreLink[]
}
