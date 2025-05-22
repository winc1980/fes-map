"use client"

import { useState, useEffect } from "react"
import { PointCard } from "@/components/points/point-card"
import { Rewards } from "@/components/points/rewards"
import { NewPointsNotification } from "@/components/points/new-points-notification"
import { MainLayout } from "@/components/layouts/main-layout"

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

  const usernameMock = "田中太郎"

  const recentPointsMock = [
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
  const rewardsMock = [
    { points: 100, name: "オリジナルステッカー", claimed: true },
    { points: 300, name: "限定Tシャツ", claimed: false },
    { points: 500, name: "VIP特典", claimed: false },
  ]

  return (
    <MainLayout title="ポイント">
      {showNewPoints && <NewPointsNotification points={newPoints} />}

      <PointCard username={usernameMock} totalPoints={totalPoints} recentPoints={recentPointsMock} />

      <Rewards totalPoints={totalPoints} rewards={rewardsMock} />
    </MainLayout>
  )
}
