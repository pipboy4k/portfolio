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
    <main className="max-w-5xl mx-auto px-6">
      <HeroIntro />

      <section>
        <h2 className="text-sm uppercase tracking-widest text-neutral-500 mb-8">
          Selected Work
        </h2>

        {projects.length === 0 ? (
          <p className="text-neutral-500">
            No projects yet. Add your first project in the{' '}
            <a href="/studio" className="underline hover:text-neutral-900">
              Studio
            </a>
            .
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </section>

      <footer className="py-16 mt-16 border-t border-neutral-200">
        <p className="text-sm text-neutral-400">
          © {new Date().getFullYear()} Your Name
        </p>
      </footer>
    </main>
  )
}
