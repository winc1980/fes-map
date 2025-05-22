import { TimelineItem } from "../../components/ui/timeline-item"
import { MainLayout } from "@/components/layouts/main-layout"

// サンプルデータ
const timelineItems = [
  {
    id: "1",
    user: {
      name: "田中太郎",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content: "メインステージでライブを見ています！最高です！",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    points: 50,
  },
  {
    id: "2",
    user: {
      name: "佐藤花子",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content: "フードエリアのラーメンが美味しかった！おすすめです。",
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    points: 30,
  },
  {
    id: "3",
    user: {
      name: "鈴木一郎",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content: "QRコードをスキャンしてポイントゲット！あと少しでプレゼントがもらえそう。",
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    points: 100,
  },
  {
    id: "4",
    user: {
      name: "鈴木一郎",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content: "QRコードをスキャンしてポイントゲット！あと少しでプレゼントがもらえそう。",
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    points: 100,
  },
]

export default function Home() {
  return (
    <MainLayout title="タイムライン">
      <h1 className="mb-4 text-2xl font-bold">タイムライン</h1>
      <div>
        {timelineItems.map((item) => (
          <TimelineItem key={item.id} {...item} />
        ))}
      </div>
    </MainLayout>
  )
}
