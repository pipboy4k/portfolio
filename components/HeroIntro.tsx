export default function HeroIntro() {
  return (
    <>
      {/* Top nav */}
      <header className="py-6 flex items-center gap-2">
        <span className="text-sm font-bold text-[#0a0a0a]">Your Name</span>
        <span className="text-sm text-[#888888]">✳ Product designer</span>
      </header>

      {/* Hero */}
      <section className="pt-12 pb-10">
        <p className="text-[2.75rem] leading-[1.15] font-extrabold text-[#0a0a0a] mb-10">
          Currently leading the Design System Team at{' '}
          <span className="text-[#888888]">Company A.</span>{' '}
          Before that Lead Product Designer at{' '}
          <span className="text-[#888888]">Company B</span>{' '}
          and Experience Designer at{' '}
          <span className="text-[#888888]">Company C</span>{' '}
          working with complex B2B and B2C products
        </p>

        {/* Contact bar */}
        <div className="flex items-center border border-[#e5e5e5] rounded-xl overflow-hidden">
          <a
            href="mailto:your@email.com"
            className="flex-1 text-center py-3.5 text-sm text-[#0a0a0a] hover:bg-[#f5f5f5] transition-colors"
          >
            your@email.com
          </a>
          <div className="w-px h-10 bg-[#e5e5e5]" />
          <a
            href="#"
            className="flex-1 text-center py-3.5 text-sm text-[#0a0a0a] hover:bg-[#f5f5f5] transition-colors"
          >
            instagram
          </a>
          <div className="w-px h-10 bg-[#e5e5e5]" />
          <a
            href="#"
            className="flex-1 text-center py-3.5 text-sm text-[#0a0a0a] hover:bg-[#f5f5f5] transition-colors"
          >
            linkedin
          </a>
          <div className="w-px h-10 bg-[#e5e5e5]" />
          <a
            href="#"
            className="flex-1 text-center py-3.5 text-sm text-[#0a0a0a] hover:bg-[#f5f5f5] transition-colors"
          >
            CV
          </a>
        </div>
      </section>

      {/* How I work */}
      <section className="py-10">
        <h2 className="text-lg font-bold text-[#0a0a0a] mb-4">How I work</h2>
        <p className="text-base text-[#666666] leading-[1.7] mb-4">
          In general, I like collaborating with product managers, engineers, and
          analytics to develop design strategies that align with user needs and
          drive companies toward their business objectives.
        </p>
        <p className="text-base text-[#666666] leading-[1.7]">
          I always strive to create design solutions that can be easily
          implemented, are informed by data, and have clear metrics for measuring
          their success. Focus on a result, not a process.
        </p>
      </section>
    </>
  )
}
