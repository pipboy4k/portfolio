export default function Footer() {
  return (
    <footer className="max-w-[768px] mx-auto px-6 py-8 border-t border-border flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3">
      <span className="text-sm text-muted">2026 • Ihor Kochetov, Product designer</span>
      <nav className="flex items-center gap-8">
        <a href="https://www.linkedin.com/in/ikoch/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted underline decoration-divider underline-offset-2 hover:text-foreground hover:decoration-foreground transition-colors">Linkedin</a>
        <a href="https://drive.google.com/file/d/16lJFshxH1muM8HP2d-np4kzQLo9QL0VO/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-sm text-muted underline decoration-divider underline-offset-2 hover:text-foreground hover:decoration-foreground transition-colors">CV</a>
        <a href="mailto:ihor.kochetov@gmail.com" className="text-sm text-muted underline decoration-divider underline-offset-2 hover:text-foreground hover:decoration-foreground transition-colors">Email</a>
      </nav>
    </footer>
  )
}
