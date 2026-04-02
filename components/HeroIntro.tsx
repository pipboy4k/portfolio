export default function HeroIntro() {
  return (
    <>
      {/* Top nav */}
      <header className="pt-12 pb-6 flex flex-col xs:flex-row xs:items-end xs:justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-lg font-bold text-foreground">Ihor Kochetov</span>
          <span className="text-sm text-muted">Product designer</span>
        </div>
        <nav className="flex items-center gap-8">
          <a href="https://www.linkedin.com/in/ikoch/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-muted underline decoration-divider underline-offset-2 hover:text-foreground hover:decoration-foreground transition-colors">Linkedin</a>
          <a href="https://drive.google.com/file/d/16lJFshxH1muM8HP2d-np4kzQLo9QL0VO/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-muted underline decoration-divider underline-offset-2 hover:text-foreground hover:decoration-foreground transition-colors">CV</a>
          <a href="mailto:ihor.kochetov@gmail.com" className="text-sm font-medium text-muted underline decoration-divider underline-offset-2 hover:text-foreground hover:decoration-foreground transition-colors">Email</a>
        </nav>
      </header>

      {/* Hero */}
      <section className="pt-24 pb-10">
        <h1 className="text-[1.5rem] sm:text-[2rem] leading-[1.15] font-bold text-foreground mb-6">
          Leading design system team @ Transcenda
        </h1>

        <p className="text-base text-foreground leading-[1.6] mb-6">
          I&apos;m leading the design system team at{' '}
          <a href="https://www.transcenda.com/" target="_blank" rel="noopener noreferrer" className="text-muted underline decoration-divider underline-offset-2 hover:text-foreground hover:decoration-foreground">Transcenda</a>
          , building a system that serves a B2B platform across 30+ sub-products. The work is part craft, part org design — you can&apos;t scale a system without also figuring out how the team around it works. I&apos;ve spent the last 2 years doing both: shaping the system and defining how the team is structured, how it prioritizes, how it moves. Right now I&apos;m focused on integrating AI capabilities into the system.
        </p>

        <p className="text-base text-foreground leading-[1.6] mb-10">
          Before Transcenda I was at{' '}
          <a href="https://www.justanswer.com/" target="_blank" rel="noopener noreferrer" className="text-muted underline decoration-divider underline-offset-2 hover:text-foreground hover:decoration-foreground">JustAnswer</a>
          {' '}working on retention and LTV, and at{' '}
          <a href="https://www.softserveinc.com/en-us" target="_blank" rel="noopener noreferrer" className="text-muted underline decoration-divider underline-offset-2 hover:text-foreground hover:decoration-foreground">SoftServe</a>
          {' '}earlier in my career — spanning discovery, strategy, and cross-functional delivery.
        </p>

      </section>

    </>
  )
}
