import Link from 'next/link'
import Image from 'next/image'
import { Project } from '@/types'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { title, slug, summary, cardDescription, cardImage, coverImage } = project
  const previewImage = cardImage?.asset?.url ? cardImage : coverImage
  const previewDescription = cardDescription || summary

  return (
    <Link
      href={`/projects/${slug.current}`}
      className="group block rounded-2xl overflow-hidden bg-[#f5f5f5] hover:bg-[#eeeeee] transition-colors duration-300"
    >
      {/* Card image (falls back to cover image) */}
      {previewImage?.asset?.url && (
        <div className="w-full overflow-hidden">
          <Image
            src={previewImage.asset.url}
            alt={previewImage.alt || title}
            width={previewImage.asset.metadata?.dimensions?.width || 960}
            height={previewImage.asset.metadata?.dimensions?.height || 600}
            className="w-full h-auto"
          />
        </div>
      )}

      {/* Card content */}
      <div className="px-6 py-6">
        <h2 className="text-lg font-bold text-[#0a0a0a] mb-3">
          {title} →
        </h2>
        <p className="text-base text-[#666666] leading-[1.7]">{previewDescription}</p>
      </div>
    </Link>
  )
}
