"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/ui/navigation"
import { PointCard } from "@/components/ui/point-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Gift } from "lucide-react"

export default function PointsPage() {
  const [totalPoints, setTotalPoints] = useState(280)
  const [newPoints, setNewPoints] = useState(0)
  const [showNewPoints, setShowNewPoints] = useState(false)

  // リアルタイムポイント獲得のシミュレーション
  useEffect(() => {
    const interval = setInterval(() => {
      const randomPoints = Math.floor(Math.random() * 20) + 5
      setNewPoints(randomPoints)
      setShowNewPoints(true)

      setTimeout(() => {
        setTotalPoints((prev) => prev + randomPoints)
        setShowNewPoints(false)
      }, 3000)
    }, 15000) // 15秒ごとに新しいポイントを獲得

    return () => clearInterval(interval)
  }, [])

  const recentPoints = [
    {
      amount: 50,
      source: "メインステージQRコード",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
    },
    {
      amount: 30,
      source: "フードエリアチェックイン",
      timestamp: new Date(Date.now() - 1000 * 60 * 120),
    },
    {
      amount: 100,
      source: "スタンプラリー完了ボーナス",
      timestamp: new Date(Date.now() - 1000 * 60 * 240),
    },
  ]

  // 報酬レベルの設定
  const rewards = [
    { points: 100, name: "オリジナルステッカー", claimed: true },
    { points: 300, name: "限定Tシャツ", claimed: false },
    { points: 500, name: "VIP特典", claimed: false },
  ]

  return (
    <main className="container pb-28 pt-4">
      <h1 className="mb-4 text-2xl font-bold">ポイント</h1>

      {showNewPoints && (
        <div className="mb-4 animate-pulse rounded-lg bg-green-100 p-3 text-center text-green-800">
          <span className="text-xl font-bold">+{newPoints} ポイント獲得！</span>
        </div>
      )}

      <PointCard totalPoints={totalPoints} recentPoints={recentPoints} />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-primary" />
            報酬
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {rewards.map((reward, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{reward.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {totalPoints >= reward.points
                      ? reward.claimed
                        ? "獲得済み"
                        : "獲得可能"
                      : `あと${reward.points - totalPoints}ポイント`}
                  </span>
                </div>
                <Progress value={(totalPoints / reward.points) * 100} max={100} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Navigation />
    </main>
  )
}
