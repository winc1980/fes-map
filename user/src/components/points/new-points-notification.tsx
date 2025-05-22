interface NewPointsNotificationProps {
  points: number
}

export function NewPointsNotification({ points }: NewPointsNotificationProps) {
  return (
    <div className="mb-4 animate-pulse rounded-lg bg-green-100 p-3 text-center text-green-800">
      <span className="text-xl font-bold">+{points} ポイント獲得！</span>
    </div>
  )
} 