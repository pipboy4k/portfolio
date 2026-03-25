import Link from 'next/link'
import Image from 'next/image'
import { Project } from '@/types'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { title, slug, tags, year, summary, cardDescription, cardImage, coverImage } = project
  const previewImage = cardImage?.asset?.url ? cardImage : coverImage
  const role = tags?.[0]
  const description = cardDescription || summary

  return (
    <Link
      href={`/projects/${slug.current}`}
      className="group block rounded-2xl overflow-hidden bg-background transition-all duration-300"
    >
      {/* Image sits in a gray container */}
      {previewImage?.asset?.url && (
        <div className="bg-surface rounded-2xl overflow-hidden">
          <Image
            src={previewImage.asset.url}
            alt={previewImage.alt || title}
            width={previewImage.asset.metadata?.dimensions?.width || 960}
            height={previewImage.asset.metadata?.dimensions?.height || 600}
            className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      )}

      {/* Text on white background */}
      <div className="py-5">
        <p className="text-base font-bold text-foreground">{title}</p>
        {role && <p className="text-base text-muted mt-1">{role}</p>}
        {description && <p className="text-base text-subtle leading-[1.6] mt-1">{description}</p>}
        {year && <p className="text-base text-muted mt-2">{year}</p>}
      </div>
    </Link>
  )
}
