interface MainHeaderProps {
  title: string
}

export function MainHeader({ title }: MainHeaderProps) {
  return (
    <header className="sticky top-0 z-10 mb-4 w-full h-16 flex items-center justify-center" style={{ background: "#7F3143", color: "white" }}>
      <h1 className="text-2xl font-bold">
        {title}
      </h1>
    </header>
  )
} 