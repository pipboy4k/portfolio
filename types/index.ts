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
  year?: string
  tags?: string[]
  summary: string
  cardDescription?: string
  cardImage?: SanityImage
  coverImage: SanityImage
  externalLink?: string
}

export interface StoreLink {
  type: 'appStore' | 'googlePlay' | 'web'
  url: string
}

export interface MetadataItem {
  _key: string
  label: string
  value: string
}

export interface ProjectDetail extends Project {
  body?: Array<{ _type: string; [key: string]: unknown }>
  storeLinks?: StoreLink[]
  metadata?: MetadataItem[]
}

export interface SideProject {
  _id: string
  title: string
  cardDescription?: string
  cardImage?: SanityImage
  cardOrder?: number
  body?: Array<{ _type: string; [key: string]: unknown }>
}
