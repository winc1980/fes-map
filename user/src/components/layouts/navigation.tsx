"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Clock, MapPin, QrCode, Trophy, User } from "lucide-react"

export function Navigation() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white pb-safe shadow-lg">
      <div className="relative flex items-center justify-around px-2 py-3">
        {/* ホームボタン */}
        <Link href="/timeline" className="flex flex-col items-center justify-center space-y-1">
          <Clock className={`h-6 w-6 ${pathname === "/" ? "text-red-500" : "text-gray-500"}`} />
          <span className={`text-xs ${pathname === "/" ? "text-red-500" : "text-gray-500"}`}>タイムライン</span>
        </Link>

        {/* マップボタン */}
        <Link href="/map" className="flex flex-col items-center justify-center space-y-1">
          <MapPin className={`h-6 w-6 ${pathname === "/map" ? "text-red-500" : "text-gray-500"}`} />
          <span className={`text-xs ${pathname === "/map" ? "text-red-500" : "text-gray-500"}`}>マップ</span>
        </Link>

        {/* 中央の大きなQRコードボタン */}
        <div className="relative -mt-8">
          <Link
            href="/qrscan"
            className={`flex h-16 w-16 flex-col items-center justify-center rounded-full bg-red-500 text-white shadow-lg`}
          >
            <QrCode className="h-7 w-7" />
            <span className="text-xs font-medium">スキャン</span>
          </Link>
        </div>

        {/* ポイントボタン */}
        <Link href="/points" className="flex flex-col items-center justify-center space-y-1">
          <Trophy className={`h-6 w-6 ${pathname === "/points" ? "text-red-500" : "text-gray-500"}`} />
          <span className={`text-xs ${pathname === "/points" ? "text-red-500" : "text-gray-500"}`}>ポイント</span>
        </Link>

        {/* アカウントボタン */}
        <Link href="/user" className="flex flex-col items-center justify-center space-y-1">
          <User className={`h-6 w-6 ${pathname === "/account" ? "text-red-500" : "text-gray-500"}`} />
          <span className={`text-xs ${pathname === "/account" ? "text-red-500" : "text-gray-500"}`}>アカウント</span>
        </Link>
      </div>
    </div>
  )
}
