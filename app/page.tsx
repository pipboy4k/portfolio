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
    <main className="max-w-[960px] mx-auto px-6">
      <HeroIntro />

      <section className="pb-24">
        <h2 className="text-lg font-bold text-[#0a0a0a] mb-6">
          Selected works
        </h2>

        {projects.length === 0 ? (
          <p className="text-[#666666]">
            No projects yet. Add your first project in the{' '}
            <a href="/studio" className="underline hover:text-[#0a0a0a]">
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
    </main>
  )
}
