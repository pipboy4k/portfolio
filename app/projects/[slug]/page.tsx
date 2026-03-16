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
    <main className="max-w-3xl mx-auto px-6 py-20">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 transition-colors mb-16"
      >
        ← Back
      </Link>

      {/* Header */}
      <header className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          {tags && tags.length > 0 && (
            <span className="text-sm text-neutral-500">
              {tags.join(', ')}
            </span>
          )}
          {year && tags && tags.length > 0 && (
            <span className="text-sm text-neutral-300">·</span>
          )}
          {year && (
            <span className="text-sm text-neutral-500">{year}</span>
          )}
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-neutral-900 mb-6">
          {title}
        </h1>
        <p className="text-xl text-neutral-600 leading-relaxed">{summary}</p>

        {externalLink && (
          <a
            href={externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 text-sm text-neutral-900 underline hover:text-neutral-600 transition-colors"
          >
            View live project ↗
          </a>
        )}
      </header>

      {/* Cover image */}
      {coverImage?.asset?.url && (
        <div className="mb-16 overflow-hidden">
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
        <div className="project-body mb-20">
          <PortableText
            value={body}
            components={{
              types: {
                image: ({ value }) => (
                  <figure className="my-12">
                    {value?.asset?.url && (
                      <Image
                        src={value.asset.url}
                        alt={value.alt || ''}
                        width={value.asset.metadata?.dimensions?.width || 1200}
                        height={value.asset.metadata?.dimensions?.height || 800}
                        className="w-full h-auto"
                      />
                    )}
                    {value?.caption && (
                      <figcaption className="text-sm text-neutral-500 mt-3">
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
        <section className="mb-20 flex flex-col gap-6">
          {gallery.map((image, i) => (
            image?.asset?.url && (
              <div key={i} className="overflow-hidden">
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
