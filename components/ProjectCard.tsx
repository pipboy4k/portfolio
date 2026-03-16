import Link from 'next/link'
import Image from 'next/image'
import { Project } from '@/types'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { title, slug, year, tags, summary, coverImage } = project

  return (
    <Link
      href={`/projects/${slug.current}`}
      className="group block rounded-2xl overflow-hidden bg-neutral-100 hover:bg-neutral-200 transition-colors duration-300"
    >
      {/* Cover image */}
      <div className="aspect-[4/3] overflow-hidden bg-neutral-200">
        {coverImage?.asset?.url && (
          <Image
            src={coverImage.asset.url}
            alt={coverImage.alt || title}
            width={coverImage.asset.metadata?.dimensions?.width || 800}
            height={coverImage.asset.metadata?.dimensions?.height || 600}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
      </div>

      {/* Card content */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h2 className="text-xl font-medium text-neutral-900 group-hover:text-neutral-700 transition-colors">
            {title}
          </h2>
          <span className="text-sm text-neutral-500 shrink-0 mt-1">{year}</span>
        </div>

        <p className="text-sm text-neutral-600 leading-relaxed mb-4">{summary}</p>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-white text-neutral-600 border border-neutral-200"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
