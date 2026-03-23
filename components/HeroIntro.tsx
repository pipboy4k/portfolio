export default function HeroIntro() {
  return (
    <>
      {/* Top nav */}
      <header className="py-6 flex items-center gap-2">
        <span className="text-sm font-bold text-foreground">Ihor Kochetov</span>
        <span className="text-sm text-muted">✳ Product designer</span>
      </header>

      {/* Hero */}
      <section className="pt-12 pb-10">
        <p className="text-[1.5rem] sm:text-[2rem] leading-[1.15] font-extrabold text-foreground mb-10">
          Currently leading the Design System Team at{' '}
          <a href="https://www.transcenda.com/" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-foreground hover:underline underline-offset-2">Transcenda.</a>{' '}
          Before that Lead Product Designer at{' '}
          <a href="https://www.justanswer.com/" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-foreground hover:underline underline-offset-2">JustAnswer</a>{' '}
          and Experience Designer at{' '}
          <a href="https://www.softserveinc.com/en-us" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-foreground hover:underline underline-offset-2">SoftServe</a>{' '}
          working with complex B2B and B2C products
        </p>

        {/* Contact bar */}
        <div className="bg-surface rounded-2xl px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between sm:h-12">
          <a
            href="mailto:ihor.kochetov@gmail.com"
            className="py-3 sm:py-0 text-sm text-foreground hover:underline underline-offset-2"
          >
            ihor.kochetov@gmail.com
          </a>
          <a
            href="#"
            className="py-3 sm:py-0 text-sm text-foreground hover:underline underline-offset-2"
          >
            instagram
          </a>
          <a
            href="#"
            className="py-3 sm:py-0 text-sm text-foreground hover:underline underline-offset-2"
          >
            linkedin
          </a>
          <a
            href="#"
            className="py-3 sm:py-0 text-sm text-foreground hover:underline underline-offset-2"
          >
            CV
          </a>
        </div>
      </section>

      {/* How I work */}
      <section className="py-10">
        <h2 className="text-lg font-bold text-foreground mb-4">How I work</h2>
        <p className="text-base text-foreground leading-[1.6]">
          I think in systems. I love designing the foundations that let products grow without falling apart — scalable components, consistent patterns, the kind of work that makes an entire team faster. I collaborate closely with PMs, engineers, and analysts, and I care about outcomes more than process.
        </p>
      </section>
    </>
  )
}
