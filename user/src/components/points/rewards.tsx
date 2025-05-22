import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Gift } from "lucide-react"

interface Reward {
  points: number
  name: string
  claimed: boolean
}

interface RewardsProps {
  totalPoints: number
  rewards: Reward[]
}

export function Rewards({ totalPoints, rewards }: RewardsProps) {
  return (
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
  )
} 