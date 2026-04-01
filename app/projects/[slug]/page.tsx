import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { getProjectBySlugQuery, getAllProjectSlugsQuery } from '@/sanity/lib/queries'
import { ProjectDetail, StoreLink } from '@/types'

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

  const { title, year, tags, summary, coverImage, body, gallery, externalLink, storeLinks, metadata } = project

  return (
    <main className="max-w-[768px] mx-auto px-6 py-16">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors mb-16"
      >
        ← Back
      </Link>

      {/* Header */}
      <header className="mb-12">
        {/* Tags + year */}
        {((tags && tags.length > 0) || year) && (
          <div className="flex items-center gap-2 mb-5">
            {tags && tags.length > 0 && (
              <span className="text-xs uppercase tracking-widest text-muted">
                {tags.join(', ')}
              </span>
            )}
            {year && tags && tags.length > 0 && (
              <span className="text-xs text-divider">·</span>
            )}
            {year && (
              <span className="text-xs uppercase tracking-widest text-muted">{year}</span>
            )}
          </div>
        )}

        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground leading-[1.15] mb-5">
          {title}
        </h1>

        <p className="text-base text-subtle leading-[1.6]">{summary}</p>

        {storeLinks && storeLinks.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-6">
            {storeLinks.map((link: StoreLink, i: number) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-foreground text-white px-5 py-3 rounded-xl hover:bg-foreground-hover transition-colors"
              >
                {link.type === 'appStore' && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                )}
                {link.type === 'googlePlay' && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.18 23.76c.3.17.64.22.99.16l12.6-7.27-2.79-2.79-10.8 9.9zM.54 1.03C.2 1.38 0 1.94 0 2.67v18.66c0 .73.2 1.29.54 1.64l.09.08 10.46-10.46v-.25L.63.95l-.09.08zM20.37 10.43l-2.97-1.71-3.12 3.12 3.12 3.12 2.98-1.72c.85-.49.85-1.29 0-1.81zM4.17.24l12.6 7.27-2.79 2.79L3.18.4c.35-.06.69-.01.99.16z"/>
                  </svg>
                )}
                {link.type === 'web' && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="2" y1="12" x2="22" y2="12"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                )}
                <span className="text-sm font-medium">
                  {link.type === 'appStore' && 'App Store'}
                  {link.type === 'googlePlay' && 'Google Play'}
                  {link.type === 'web' && (() => {
                    try {
                      const host = new URL(link.url).hostname.replace(/^www\./, '')
                      return host.split('.')[0]
                    } catch {
                      return 'Web'
                    }
                  })()}
                </span>
              </a>
            ))}
          </div>
        )}

        {externalLink && !storeLinks?.length && (
          <a
            href={externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-5 text-sm text-foreground underline underline-offset-2 hover:text-subtle transition-colors"
          >
            View live project ↗
          </a>
        )}
      </header>

      {/* Cover image — 1152px centered, responsive */}
      {coverImage?.asset?.url && (
        <div className="mb-16 rounded-2xl overflow-hidden" style={{ position: 'relative', left: '50%', transform: 'translateX(-50%)', width: 'min(1152px, calc(100vw - 32px))' }}>
          <Image
            src={coverImage.asset.url}
            alt={coverImage.alt || title}
            width={coverImage.asset.metadata?.dimensions?.width || 1152}
            height={coverImage.asset.metadata?.dimensions?.height || 800}
            className="w-full h-auto block"
            priority
          />
        </div>
      )}

      {/* Metadata block */}
      {metadata && metadata.length > 0 && (
        <div className="mb-16 bg-surface rounded-2xl px-6 py-5">
          {metadata.map((item) => (
            <div key={item._key} className="flex flex-col sm:flex-row sm:gap-8 py-2">
              <span className="text-sm font-bold text-foreground sm:w-28 sm:shrink-0">{item.label}</span>
              <span className="text-sm text-subtle leading-[1.6]">{item.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Case study body */}
      {body && (
        <div className="project-body mb-20">
          <PortableText
            value={body}
            components={{
              types: {
                videoFile: ({ value }) => (
                  <figure className="my-12" style={{ position: 'relative', left: '50%', transform: 'translateX(-50%)', width: 'min(1024px, calc(100vw - 32px))' }}>
                    {value?.file?.asset?.url && (
                      <div className="rounded-2xl overflow-hidden">
                        <video
                          src={value.file.asset.url}
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="w-full block"
                          style={{ maxHeight: '720px', objectFit: 'contain' }}
                        />
                      </div>
                    )}
                    {value?.caption && (
                      <figcaption className="text-sm text-muted mt-3 px-6">{value.caption}</figcaption>
                    )}
                  </figure>
                ),
                videoEmbed: ({ value }) => {
                  const url = new URL(value.url)
                  url.searchParams.set('hide_owner', 'true')
                  url.searchParams.set('hide_share', 'true')
                  url.searchParams.set('hide_title', 'true')
                  url.searchParams.set('hideEmbedTopBar', 'true')
                  url.searchParams.set('autoplay', '1')
                  url.searchParams.set('muted', '1')
                  return (
                    <figure className="my-12" style={{ position: 'relative', left: '50%', transform: 'translateX(-50%)', width: 'min(1024px, calc(100vw - 32px))' }}>
                      <div className="rounded-2xl overflow-hidden" style={{ position: 'relative', paddingBottom: '56.25%' }}>
                        <iframe
                          src={url.toString()}
                          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '110%' }}
                          frameBorder="0"
                          allowFullScreen
                        />
                      </div>
                      {value?.caption && (
                        <figcaption className="text-sm text-muted mt-3 px-6">{value.caption}</figcaption>
                      )}
                    </figure>
                  )
                },
                image: ({ value }) => (
                  <figure className="my-12" style={{ position: 'relative', left: '50%', transform: 'translateX(-50%)', width: 'min(1024px, calc(100vw - 32px))' }}>
                    {value?.asset?.url && (
                      <div className="rounded-2xl overflow-hidden">
                        <Image
                          src={value.asset.url}
                          alt={value.alt || ''}
                          width={value.asset.metadata?.dimensions?.width || 1024}
                          height={value.asset.metadata?.dimensions?.height || 800}
                          className="w-full h-auto block"
                        />
                      </div>
                    )}
                    {value?.caption && (
                      <figcaption className="text-sm text-muted mt-3 px-6">
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
        <section className="mb-20 flex flex-col gap-4" style={{ position: 'relative', left: '50%', transform: 'translateX(-50%)', width: 'min(1024px, calc(100vw - 32px))' }}>
          {gallery.map((image, i) => (
            image?.asset?.url && (
              <div key={i} className="rounded-2xl overflow-hidden">
                <Image
                  src={image.asset.url}
                  alt={image.alt || `Gallery image ${i + 1}`}
                  width={image.asset.metadata?.dimensions?.width || 800}
                  height={image.asset.metadata?.dimensions?.height || 600}
                  className="w-full h-auto block"
                />
              </div>
            )
          ))}
        </section>
      )}

      {/* Footer nav */}
      <div className="border-t border-border pt-8">
        <Link
          href="/"
          className="text-sm text-muted hover:text-foreground transition-colors"
        >
          ← All projects
        </Link>
      </div>
    </main>
  )
}
