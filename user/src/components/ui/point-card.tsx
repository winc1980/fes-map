import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy } from "lucide-react"

interface PointCardProps {
  totalPoints: number
  recentPoints?: {
    amount: number
    source: string
    timestamp: Date
  }[]
}

export function PointCard({ totalPoints, recentPoints = [] }: PointCardProps) {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Trophy className="h-5 w-5 text-yellow-500" />
          現在のポイント
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 text-center">
          <span className="text-4xl font-bold">{totalPoints}</span>
          <span className="ml-2">ポイント</span>
        </div>
        {recentPoints.length > 0 && (
          <div>
            <h3 className="mb-2 text-sm font-medium">最近の獲得ポイント</h3>
            <div className="space-y-2">
              {recentPoints.map((point, index) => (
                <div key={index} className="flex items-center justify-between rounded-lg bg-muted p-2 text-sm">
                  <span>{point.source}</span>
                  <span className="font-medium text-green-600">+{point.amount}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
