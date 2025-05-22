import { Navigation } from "@/components/layouts/navigation"
import { MainHeader } from "@/components/layouts/main-header"

interface MainLayoutProps {
  children: React.ReactNode
  title: string
}

export function MainLayout({ children, title }: MainLayoutProps) {
  return (
    <main>
      <MainHeader title={title} />
      <div className="mx-auto max-w-[600px]">{children}</div>
      <Navigation />
    </main>
  )
} 