import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-8 grid gap-4 md:grid-cols-3">
        <div>
          <p className="font-semibold">HealthEase Companion</p>
          <p className="text-muted-foreground text-sm text-pretty mt-2">
            Accessible AI-driven care for families. Not a substitute for professional medical advice.
          </p>
        </div>
        <div className="space-y-2">
          <p className="font-medium">Company</p>
          <nav className="flex flex-col text-sm gap-1">
            <Link href="/about" className="hover:underline">
              About
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </nav>
        </div>
        <div className="space-y-2">
          <p className="font-medium">Resources</p>
          <nav className="flex flex-col text-sm gap-1">
            <a href="tel:112" className="hover:underline">
              Emergency: 112
            </a>
            <a href="https://www.mohfw.gov.in/" target="_blank" rel="noreferrer" className="hover:underline">
              MoHFW
            </a>
          </nav>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} HealthEase Companion
      </div>
    </footer>
  )
}
