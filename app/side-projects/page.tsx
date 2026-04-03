import Link from 'next/link'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { getSideProjectQuery } from '@/sanity/lib/queries'
import { SideProject } from '@/types'
import Footer from '@/components/Footer'

export const revalidate = 60

export default async function SideProjectsPage() {
  const doc: SideProject | null = await client.fetch(getSideProjectQuery)

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
          {doc?.title || 'Side Projects'}
        </h1>

        {doc?.body && (
          <div className="side-project-body">
            <PortableText
              value={doc.body}
              components={{
                types: {
                  image: ({ value }) => (
                    <figure className="my-10">
                      {value?.asset?.url && (
                        <div style={{ backgroundColor: value.backgroundColor || undefined, borderRadius: value.backgroundColor ? '24px' : undefined, padding: value.backgroundColor ? '32px' : undefined, display: value.backgroundColor ? 'flex' : undefined, justifyContent: value.backgroundColor ? 'center' : undefined }}>
                          <div style={{ borderRadius: '16px', overflow: 'hidden', lineHeight: 0, width: value.backgroundColor ? 'auto' : '100%' }}>
                            <Image
                              src={value.asset.url}
                              alt={value.alt || ''}
                              width={value.asset.metadata?.dimensions?.width || 768}
                              height={value.asset.metadata?.dimensions?.height || 600}
                              style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
                            />
                          </div>
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
                        <div style={{ backgroundColor: value.backgroundColor || undefined, borderRadius: '32px', paddingTop: '32px', paddingBottom: '32px', display: 'flex', justifyContent: 'center' }}>
                          <div style={{ borderRadius: '32px', overflow: 'hidden', display: 'inline-block', lineHeight: 0 }}>
                            <video
                              src={value.file.asset.url}
                              autoPlay
                              muted
                              loop
                              playsInline
                              style={{ display: 'block', maxHeight: '720px', maxWidth: '100%', height: 'auto' }}
                            />
                          </div>
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
