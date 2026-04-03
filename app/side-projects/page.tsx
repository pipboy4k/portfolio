import Link from 'next/link'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { getAllSideProjectsQuery } from '@/sanity/lib/queries'
import { SideProject } from '@/types'
import Footer from '@/components/Footer'

export const revalidate = 60

export default async function SideProjectsPage() {
  const projects: SideProject[] = await client.fetch(getAllSideProjectsQuery)

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f0f0f0]">
      <main className="max-w-[768px] mx-auto px-6 py-16">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-[#777] hover:text-[#f0f0f0] transition-colors mb-16"
        >
          Back
        </Link>

        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight leading-[1.15] mb-16">
          Side Projects
        </h1>

        {projects.length === 0 && (
          <p className="text-[#777]">No projects yet.</p>
        )}

        <div className="flex flex-col gap-24">
          {projects.map((project) => (
            <article key={project._id}>
              {/* Header */}
              <header className="mb-8">
                {project.tags && project.tags.length > 0 && (
                  <div className="mb-3">
                    <span className="text-xs uppercase tracking-widest text-[#777]">
                      {project.tags.join(', ')}
                    </span>
                  </div>
                )}
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight leading-[1.2]">
                    {project.title}
                  </h2>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-sm text-[#777] hover:text-[#f0f0f0] transition-colors underline underline-offset-2"
                    >
                      Visit ↗
                    </a>
                  )}
                </div>
              </header>

              {/* Body */}
              {project.body && (
                <div className="side-project-body">
                  <PortableText
                    value={project.body}
                    components={{
                      types: {
                        image: ({ value }) => (
                          <figure className="my-10">
                            {value?.asset?.url && (
                              <div className="rounded-2xl overflow-hidden">
                                <Image
                                  src={value.asset.url}
                                  alt={value.alt || ''}
                                  width={value.asset.metadata?.dimensions?.width || 768}
                                  height={value.asset.metadata?.dimensions?.height || 600}
                                  className="w-full h-auto block"
                                />
                              </div>
                            )}
                            {value?.caption && (
                              <figcaption className="text-sm text-[#777] mt-3">
                                {value.caption}
                              </figcaption>
                            )}
                          </figure>
                        ),
                        videoFile: ({ value }) => (
                          <figure className="my-10">
                            {value?.file?.asset?.url && (
                              <div className="rounded-2xl overflow-hidden">
                                <video
                                  src={value.file.asset.url}
                                  autoPlay
                                  muted
                                  loop
                                  playsInline
                                  className="w-full h-auto block"
                                  style={{ maxHeight: '720px' }}
                                />
                              </div>
                            )}
                            {value?.caption && (
                              <figcaption className="text-sm text-[#777] mt-3">
                                {value.caption}
                              </figcaption>
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
                            <figure className="my-10">
                              <div className="rounded-2xl overflow-hidden" style={{ position: 'relative', paddingBottom: '56.25%' }}>
                                <iframe
                                  src={url.toString()}
                                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '110%' }}
                                  frameBorder="0"
                                  allowFullScreen
                                />
                              </div>
                              {value?.caption && (
                                <figcaption className="text-sm text-[#777] mt-3">
                                  {value.caption}
                                </figcaption>
                              )}
                            </figure>
                          )
                        },
                      },
                    }}
                  />
                </div>
              )}
            </article>
          ))}
        </div>

        <div className="pt-16 pb-8">
          <Link
            href="/"
            className="text-sm text-[#777] hover:text-[#f0f0f0] transition-colors"
          >
            Back to projects
          </Link>
        </div>

        <Footer />
      </main>
    </div>
  )
}
