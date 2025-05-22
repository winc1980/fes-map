// app/page.tsx
import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/timeline') // 任意のパスに変更可能
}
