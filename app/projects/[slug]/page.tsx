import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { getProjectBySlugQuery, getAllProjectSlugsQuery } from '@/sanity/lib/queries'
import { ProjectDetail } from '@/types'

export const revalidate = 60

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const slugs: Array<{ slug: string }> = await client.fetch(getAllProjectSlugsQuery)
    return slugs.map(({ slug }) => ({ slug }))
  } catch {
    return []
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project: ProjectDetail = await client.fetch(getProjectBySlugQuery, { slug })

  if (!project) notFound()

  const { title, year, tags, summary, coverImage, body, gallery, externalLink } = project

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 transition-colors mb-12"
      >
        ← Back
      </Link>

      {/* Header */}
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm text-neutral-500">{year}</span>
          {tags && tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full bg-neutral-100 text-neutral-600"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-neutral-900 mb-4">
          {title}
        </h1>
        <p className="text-lg text-neutral-600 leading-relaxed">{summary}</p>

        {externalLink && (
          <a
            href={externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-sm text-neutral-900 underline hover:text-neutral-600 transition-colors"
          >
            View live project ↗
          </a>
        )}
      </header>

      {/* Cover image */}
      {coverImage?.asset?.url && (
        <div className="rounded-2xl overflow-hidden mb-12 bg-neutral-100">
          <Image
            src={coverImage.asset.url}
            alt={coverImage.alt || title}
            width={coverImage.asset.metadata?.dimensions?.width || 1200}
            height={coverImage.asset.metadata?.dimensions?.height || 800}
            className="w-full h-auto"
            priority
          />
        </div>
      )}

      {/* Case study body */}
      {body && (
        <div className="prose prose-neutral max-w-none mb-16">
          <PortableText
            value={body}
            components={{
              types: {
                image: ({ value }) => (
                  <figure className="my-8">
                    {value?.asset?.url && (
                      <div className="rounded-xl overflow-hidden bg-neutral-100">
                        <Image
                          src={value.asset.url}
                          alt={value.alt || ''}
                          width={value.asset.metadata?.dimensions?.width || 1200}
                          height={value.asset.metadata?.dimensions?.height || 800}
                          className="w-full h-auto"
                        />
                      </div>
                    )}
                    {value?.caption && (
                      <figcaption className="text-sm text-neutral-500 mt-2 text-center">
                        {value.caption}
                      </figcaption>
                    )}
                  </figure>
                ),
              },
            }}
          />
        </div>
      )}

      {/* Gallery */}
      {gallery && gallery.length > 0 && (
        <section className="mb-16">
          <h2 className="text-sm uppercase tracking-widest text-neutral-500 mb-6">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gallery.map((image, i) => (
              image?.asset?.url && (
                <div key={i} className="rounded-xl overflow-hidden bg-neutral-100">
                  <Image
                    src={image.asset.url}
                    alt={image.alt || `Gallery image ${i + 1}`}
                    width={image.asset.metadata?.dimensions?.width || 800}
                    height={image.asset.metadata?.dimensions?.height || 600}
                    className="w-full h-auto"
                  />
                </div>
              )
            ))}
          </div>
        </section>
      )}

      {/* Footer nav */}
      <div className="border-t border-neutral-200 pt-8">
        <Link
          href="/"
          className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          ← All projects
        </Link>
      </div>
    </main>
  )
}
