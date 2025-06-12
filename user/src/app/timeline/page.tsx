import React from "react"
import { TimelineItem } from "../../components/ui/timeline-item"
import { MainLayout } from "@/components/layouts/main-layout"
import { timelineItem } from "@/types"

const FES_START_DATE = new Date('2025-11-01T09:00:00');
const FES_END_DATE = new Date('2025-11-03T18:00:00');
// サンプルデータ
const timelineItems: timelineItem[] = [
  {
    id: 'post-001',
    pabilion: {
      id: 'pabilion-wmc',
      name: 'Waseda Music Circle',
      avatar: 'https://example.com/avatars/wmc.jpg', // 適当なURL
      startAt: FES_START_DATE,
      endAt: FES_END_DATE,
    },
    title: '🎸焼きそば販売開始！🎸',
    content: '中庭のブースで特製ソース焼きそばの販売を開始しました！13時からはミニライブも開催します。ぜひお立ち寄りください！',
    timestamp: new Date('2025-11-01T10:05:00'),
    photos: [
      'https://example.com/photos/yakisoba.jpg',
      'https://example.com/photos/live_stage.jpg',
    ],
    like: 152,
  },
  {
    id: 'post-002',
    pabilion: {
      id: 'pabilion-committee',
      name: '文化祭実行委員会',
      avatar: 'https://example.com/avatars/committee.jpg',
      startAt: FES_START_DATE,
      endAt: FES_END_DATE,
    },
    title: '【お知らせ】落とし物について',
    content: '赤いイヤホン（ケース付き）が総合案内所に届けられています。お心当たりの方は、1号館前の総合案内所までお越しください。',
    timestamp: new Date('2025-11-01T11:30:00'),
    like: 34,
  },
  {
    id: 'post-003',
    pabilion: {
      id: 'pabilion-dance',
      name: 'ダンスサークル "groove"',
      avatar: 'https://example.com/avatars/dance.jpg',
      startAt: FES_START_DATE,
      endAt: FES_END_DATE,
    },
    title: '【本日14:00~】メインステージでパフォーマンス！',
    content: 'いよいよ本日14時から！メインステージで練習の成果を披露します🔥 K-POPからHIPHOPまで、皆で盛り上がりましょう！ぜひ見に来てください！',
    timestamp: new Date('2025-11-01T12:15:00'),
    photos: [
      'https://example.com/photos/dance_practice.jpg',
    ],
    like: 289,
  },
  {
    id: 'post-004',
    pabilion: {
      id: 'pabilion-robotics',
      name: '先端ロボット研究会',
      // avatarはオプショナルなので、設定しないケース
      startAt: FES_START_DATE,
      endAt: FES_END_DATE,
    },
    title: '自作ロボットのデモ実演、大盛況！',
    content: '5号館201教室で実施中のロボットデモ、多くの方にお越しいただきありがとうございます！午後の部は15時からを予定しています。',
    timestamp: new Date('2025-11-01T13:45:00'),
    // photosはオプショナルなので、設定しないケース
    like: 98,
  },
  {
    id: 'post-005',
    pabilion: {
      id: 'pabilion-wmc',
      name: 'Waseda Music Circle',
      avatar: 'https://example.com/avatars/wmc.jpg',
      startAt: FES_START_DATE,
      endAt: FES_END_DATE,
    },
    title: '焼きそば、まもなく完売です！',
    content: 'ご好評につき、焼きそばは残り10食ほどで完売となります！お求めの方はお早めに！',
    timestamp: new Date('2025-11-02T14:20:00'),
    like: 76,
  },
];
export default function Home() {
  return (
    <MainLayout title="タイムライン">
      <div>
        {timelineItems.map((item) => (
          <TimelineItem key={item.id} {...item} />
        ))}
      </div>
    </MainLayout>
  )
}
