import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { getAllProjectsQuery, getSideProjectQuery } from '@/sanity/lib/queries'
import { Project, SideProject } from '@/types'
import HeroIntro from '@/components/HeroIntro'
import ProjectCard from '@/components/ProjectCard'
import Footer from '@/components/Footer'

export const revalidate = 60

function SideProjectCard({ card }: { card: SideProject }) {
  return (
    <Link
      href="/side-projects"
      className="group block rounded-2xl overflow-hidden bg-background transition-all duration-300"
    >
      <div className="bg-[#0a0a0a] rounded-2xl overflow-hidden">
        {card.cardImage?.asset?.url ? (
          <Image
            src={card.cardImage.asset.url}
            alt={card.cardImage.alt || card.title}
            width={card.cardImage.asset.metadata?.dimensions?.width || 960}
            height={card.cardImage.asset.metadata?.dimensions?.height || 600}
            className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="h-48" />
        )}
      </div>
      <div className="py-5">
        <p className="text-base font-bold text-foreground">{card.title}</p>
        {card.cardDescription && (
          <p className="text-base text-subtle leading-[1.6] mt-1">{card.cardDescription}</p>
        )}
      </div>
    </Link>
  )
}

export default async function HomePage() {
  let projects: Project[] = []
  let sideProject: SideProject | null = null

  try {
    ;[projects, sideProject] = await Promise.all([
      client.fetch(getAllProjectsQuery),
      client.fetch(getSideProjectQuery),
    ])
  } catch {
    // Sanity not configured yet — show empty state
  }

  type CardItem =
    | { type: 'project'; data: Project; order: number }
    | { type: 'sideProject'; data: SideProject; order: number }

  const items: CardItem[] = [
    ...projects.map((p) => ({ type: 'project' as const, data: p, order: p.order ?? 999 })),
    ...(sideProject
      ? [{ type: 'sideProject' as const, data: sideProject, order: sideProject.cardOrder ?? 999 }]
      : []),
  ].sort((a, b) => a.order - b.order)

  return (
    <main className="max-w-[768px] mx-auto px-6">
      <HeroIntro />

      <section className="pb-24">
        <h2 className="text-lg font-bold text-foreground mb-6">
          Selected works
        </h2>

        {items.length === 0 ? (
          <p className="text-subtle">
            No projects yet. Add your first project in the{' '}
            <a href="/studio" className="underline hover:text-foreground">
              Studio
            </a>
            .
          </p>
        ) : (
          <div className="flex flex-col gap-16">
            {items.map((item) =>
              item.type === 'project' ? (
                <ProjectCard key={item.data._id} project={item.data} />
              ) : (
                <SideProjectCard key={item.data._id} card={item.data} />
              )
            )}
          </div>
        )}
      </section>

      {/* Spotify */}
      <section className="pb-24">
        <h2 className="text-lg font-bold text-foreground mb-6">Some music I like</h2>
        <iframe
          src="https://open.spotify.com/embed/playlist/0lyvGdTtVzkHKvvVaEU3Jm"
          width="100%"
          height="152"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </section>
      <Footer />
    </main>
  )
}
