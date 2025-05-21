import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"
import { ja } from "date-fns/locale"

interface TimelineItemProps {
  id: string
  user: {
    name: string
    avatar?: string
  }
  content: string
  timestamp: Date
  points?: number
}

export function TimelineItem({ user, content, timestamp, points }: TimelineItemProps) {
  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center gap-4 p-4 pb-0">
        <Avatar>
          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="font-semibold">{user.name}</p>
          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(timestamp, { addSuffix: true, locale: ja })}
          </p>
        </div>
        {points && (
          <div className="ml-auto rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800">
            +{points} ポイント
          </div>
        )}
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p>{content}</p>
      </CardContent>
    </Card>
  )
}
