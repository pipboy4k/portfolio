export default function Footer() {
  return (
    <footer className="max-w-[768px] mx-auto px-6 py-8 border-t border-border flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3">
      <span className="text-sm text-muted">Ihor Kochetov, Lead product designer</span>
      <nav className="flex items-center gap-6">
        <a href="#" className="text-sm text-muted hover:text-foreground transition-colors">Linkedin</a>
        <a href="#" className="text-sm text-muted hover:text-foreground transition-colors">CV</a>
        <a href="mailto:ihor.kochetov@gmail.com" className="text-sm text-muted hover:text-foreground transition-colors">Email</a>
      </nav>
    </footer>
  )
}
