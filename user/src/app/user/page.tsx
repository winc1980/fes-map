"use client"

import { Navigation } from "@/components/ui/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Settings, LogOut, Gift, Award, History } from "lucide-react"

export default function AccountPage() {
  return (
    <main className="container pb-28 pt-4">
      <h1 className="mb-4 text-2xl font-bold">アカウント</h1>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/placeholder.svg?height=80&width=80" alt="プロフィール画像" />
              <AvatarFallback>山田</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold">山田花子</h2>
              <p className="text-sm text-muted-foreground">yamada@example.com</p>
              <div className="mt-2">
                <Badge variant="secondary">フェスマスター</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-6 space-y-2">
        <Button variant="outline" className="flex w-full items-center justify-start gap-2 px-4 py-3">
          <Gift className="h-5 w-5 text-red-500" />
          <span>獲得した特典</span>
        </Button>
        <Button variant="outline" className="flex w-full items-center justify-start gap-2 px-4 py-3">
          <History className="h-5 w-5 text-red-500" />
          <span>活動履歴</span>
        </Button>
        <Button variant="outline" className="flex w-full items-center justify-start gap-2 px-4 py-3">
          <Award className="h-5 w-5 text-red-500" />
          <span>バッジコレクション</span>
        </Button>
      </div>

      <div className="space-y-2">
        <Button variant="outline" className="flex w-full items-center justify-start gap-2 px-4 py-3">
          <Settings className="h-5 w-5" />
          <span>設定</span>
        </Button>
        <Button variant="outline" className="flex w-full items-center justify-start gap-2 px-4 py-3 text-red-500">
          <LogOut className="h-5 w-5" />
          <span>ログアウト</span>
        </Button>
      </div>

      <Navigation />
    </main>
  )
}
