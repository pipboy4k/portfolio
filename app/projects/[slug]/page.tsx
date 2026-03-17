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
    <main className="max-w-[720px] mx-auto px-6 py-16">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-[#888888] hover:text-[#0a0a0a] transition-colors mb-16"
      >
        ← Back
      </Link>

      {/* Header */}
      <header className="mb-12">
        {/* Tags + year */}
        {((tags && tags.length > 0) || year) && (
          <div className="flex items-center gap-2 mb-5">
            {tags && tags.length > 0 && (
              <span className="text-xs uppercase tracking-widest text-[#888888]">
                {tags.join(', ')}
              </span>
            )}
            {year && tags && tags.length > 0 && (
              <span className="text-xs text-[#cccccc]">·</span>
            )}
            {year && (
              <span className="text-xs uppercase tracking-widest text-[#888888]">{year}</span>
            )}
          </div>
        )}

        <h1 className="text-4xl font-bold tracking-tight text-[#0a0a0a] leading-[1.15] mb-5">
          {title}
        </h1>

        <p className="text-base text-[#666666] leading-[1.7]">{summary}</p>

        {externalLink && (
          <a
            href={externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-5 text-sm text-[#0a0a0a] underline underline-offset-2 hover:text-[#666666] transition-colors"
          >
            View live project ↗
          </a>
        )}
      </header>

      {/* Cover image — full width, no border radius */}
      {coverImage?.asset?.url && (
        <div className="mb-16 -mx-6">
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
                  <figure className="my-12 -mx-6">
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
                      <figcaption className="text-sm text-[#888888] mt-3 px-6">
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

      {/* Gallery — single column, no heading */}
      {gallery && gallery.length > 0 && (
        <section className="mb-20 flex flex-col gap-4 -mx-6">
          {gallery.map((image, i) => (
            image?.asset?.url && (
              <div key={i}>
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
      <div className="border-t border-[#e5e5e5] pt-8">
        <Link
          href="/"
          className="text-sm text-[#888888] hover:text-[#0a0a0a] transition-colors"
        >
          ← All projects
        </Link>
      </div>
    </main>
  )
}
