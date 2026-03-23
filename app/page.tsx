import { client } from '@/sanity/lib/client'
import { getAllProjectsQuery } from '@/sanity/lib/queries'
import { Project } from '@/types'
import HeroIntro from '@/components/HeroIntro'
import ProjectCard from '@/components/ProjectCard'

export const revalidate = 60

export default async function HomePage() {
  let projects: Project[] = []

  try {
    projects = await client.fetch(getAllProjectsQuery)
  } catch {
    // Sanity not configured yet — show empty state
  }

  return (
    <main className="max-w-[768px] mx-auto px-6">
      <HeroIntro />

      <section className="pb-24">
        <h2 className="text-lg font-bold text-foreground mb-6">
          Selected works
        </h2>

        {projects.length === 0 ? (
          <p className="text-subtle">
            No projects yet. Add your first project in the{' '}
            <a href="/studio" className="underline hover:text-foreground">
              Studio
            </a>
            .
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
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
    </main>
  )
}
