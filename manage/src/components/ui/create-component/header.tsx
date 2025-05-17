"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between w-full p-1">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
              <span className="text-xs font-bold text-primary-foreground">A</span>
            </div>
            <span className="hidden font-bold sm:inline-block">アプリ名</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center space-x-2 justify-end">
          <nav className="hidden md:flex items-center space-x-4">
            <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
              ホーム
            </Link>
            <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
              機能
            </Link>
            <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
              料金
            </Link>
            <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
              お問い合わせ
            </Link>
          </nav>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button  size="icon" >
                <Menu className="h-5 w-5" />
                <span className="sr-only">メニューを開く</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>アプリ名</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-6">
                <Link
                  href="#"
                  className="text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setOpen(false)}
                >
                  ホーム
                </Link>
                <Link
                  href="#"
                  className="text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setOpen(false)}
                >
                  機能
                </Link>
                <Link
                  href="#"
                  className="text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setOpen(false)}
                >
                  料金
                </Link>
                <Link
                  href="#"
                  className="text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setOpen(false)}
                >
                  お問い合わせ
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
