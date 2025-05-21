"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { ExternalLink, Filter, Eye, Search, Calendar, CalendarDays, CheckCircle2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type PerformanceStatus = "申請中" | "パフォーマ確認中" | "確定";
type Day = "day1" | "day2";

type Performance = {
  id: number;
  name: string;
  venueName: string;
  startTime: string;
  endTime: string;
  description: string;
  performers: string[];
  status: PerformanceStatus;
  day: Day;
  notes?: string;
};

const performances: Performance[] = [
  {
    id: 1,
    name: "オープニングセレモニー",
    venueName: "メインステージ",
    startTime: "10:00",
    endTime: "10:30",
    description: "フェスティバルの開会式です。主催者の挨拶と出演者の紹介を行います。",
    performers: ["実行委員会"],
    status: "確定",
    day: "day1"
  },
  {
    id: 2,
    name: "バンド演奏「ROCK STARS」",
    venueName: "メインステージ",
    startTime: "11:00",
    endTime: "12:00",
    description: "学生バンドによるロック演奏です。オリジナル曲を中心に演奏します。",
    performers: ["学生バンド連合", "軽音楽部"],
    status: "確定",
    day: "day1"
  },
  {
    id: 3,
    name: "ダンスパフォーマンス",
    venueName: "メインステージ",
    startTime: "13:00",
    endTime: "14:00",
    description: "ダンス部によるストリートダンスパフォーマンスです。",
    performers: ["ダンス部"],
    status: "確定",
    day: "day1"
  },
  {
    id: 4,
    name: "アカペラコンサート",
    venueName: "サブステージ",
    startTime: "11:30",
    endTime: "12:30",
    description: "音楽サークルによるアカペラパフォーマンスです。",
    performers: ["音楽サークル"],
    status: "確定",
    day: "day1"
  },
  {
    id: 5,
    name: "民謡パフォーマンス",
    venueName: "サブステージ",
    startTime: "14:00",
    endTime: "15:00",
    description: "伝統芸能部による民謡の演奏と踊りです。",
    performers: ["伝統芸能部"],
    status: "確定",
    day: "day1"
  },
  {
    id: 6,
    name: "手作りアクセサリー教室",
    venueName: "ワークショップスペース",
    startTime: "10:30",
    endTime: "12:00",
    description: "クラフトサークルによるアクセサリー作り体験ワークショップです。",
    performers: ["クラフトサークル"],
    status: "確定",
    day: "day1"
  },
  {
    id: 7,
    name: "プログラミング体験",
    venueName: "ワークショップスペース",
    startTime: "13:30",
    endTime: "15:30",
    description: "情報技術研究会によるプログラミング体験ワークショップです。",
    performers: ["情報技術研究会"],
    status: "確定",
    day: "day1"
  },
  {
    id: 8,
    name: "お笑いライブ",
    venueName: "サブステージ",
    startTime: "16:00",
    endTime: "17:00",
    description: "お笑いサークルによるコント・漫才の披露です。",
    performers: ["お笑いサークル"],
    status: "申請中",
    day: "day1"
  },
  {
    id: 9,
    name: "演劇部公演「夏の夢」",
    venueName: "メインステージ",
    startTime: "15:00",
    endTime: "16:30",
    description: "演劇部によるオリジナル短編劇の上演です。",
    performers: ["演劇部"],
    status: "パフォーマ確認中",
    day: "day1",
    notes: "他の公演と時間が重なるため、時間変更の検討が必要"
  },
  {
    id: 10,
    name: "マジックショー",
    venueName: "サブステージ",
    startTime: "13:00",
    endTime: "14:00",
    description: "手品サークルによるマジックショーです。",
    performers: ["手品サークル"],
    status: "パフォーマ確認中",
    day: "day1",
    notes: "他のイベントと重複するため、時間を13:30-14:30に変更提案中"
  },
  {
    id: 11,
    name: "クロージングセレモニー",
    venueName: "メインステージ",
    startTime: "17:00",
    endTime: "18:00",
    description: "フェスティバルの閉会式です。",
    performers: ["実行委員会"],
    status: "確定",
    day: "day2"
  },
  {
    id: 12,
    name: "ジャズライブ",
    venueName: "サブステージ",
    startTime: "13:00",
    endTime: "14:30",
    description: "ジャズ研究会によるジャズ演奏です。",
    performers: ["ジャズ研究会"],
    status: "確定",
    day: "day2"
  }
];

const statusColors: Record<PerformanceStatus, string> = {
  "申請中": "bg-blue-100 text-blue-800",
  "パフォーマ確認中": "bg-purple-100 text-purple-800",
  "確定": "bg-green-100 text-green-800"
};

export default function PerformanceListView() {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<string>("all");

  const filteredPerformances = performances
    .filter(p => selectedStatus === "all" || p.status === selectedStatus)
    .filter(p => selectedDay === "all" || p.day === selectedDay)
    .filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.performers.some(performer => performer.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  return (
    <div className="space-y-6">
      <Card className="p-4">
        <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center md:space-y-0 mb-4">
          <h2 className="text-xl font-semibold">パフォーマンス一覧</h2>
          <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-y-0 md:space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="パフォーマンス名を検索..."
                className="flex h-8 w-full rounded-md border border-input bg-transparent px-8 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500 flex items-center">
                <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                日程:
              </span>
              <Select
                value={selectedDay}
                onValueChange={(value) => setSelectedDay(value)}
              >
                <SelectTrigger className="w-[120px] h-8">
                  <SelectValue placeholder="日程を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">すべて</SelectItem>
                  <SelectItem value="day1">1日目</SelectItem>
                  <SelectItem value="day2">2日目</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500 flex items-center">
                <Filter className="w-4 h-4 mr-1 text-gray-400" />
                ステータス:
              </span>
              <Select
                value={selectedStatus}
                onValueChange={(value) => setSelectedStatus(value)}
              >
                <SelectTrigger className="w-[150px] h-8">
                  <SelectValue placeholder="ステータスを選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">すべて</SelectItem>
                  <SelectItem value="申請中">申請中</SelectItem>
                  <SelectItem value="パフォーマ確認中">パフォーマ確認中</SelectItem>
                  <SelectItem value="確定">確定</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="border rounded-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 whitespace-nowrap">パフォーマンス名</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 whitespace-nowrap">会場</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 whitespace-nowrap">時間</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 whitespace-nowrap">日程</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 whitespace-nowrap">パフォーマー</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 whitespace-nowrap">ステータス</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 whitespace-nowrap">操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredPerformances.length > 0 ? (
                  filteredPerformances.map((performance) => (
                    <tr key={performance.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium whitespace-nowrap">
                        <div>{performance.name}</div>
                        {performance.notes && (
                          <div className="text-xs text-red-600 mt-1 whitespace-nowrap">
                            <span className="font-medium">備考:</span> {performance.notes}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm whitespace-nowrap">{performance.venueName}</td>
                      <td className="px-4 py-3 text-sm whitespace-nowrap">{performance.startTime} - {performance.endTime}</td>
                      <td className="px-4 py-3 text-sm whitespace-nowrap">{performance.day === "day1" ? "1日目" : "2日目"}</td>
                      <td className="px-4 py-3 text-sm whitespace-nowrap">{performance.performers.join(", ")}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[performance.status]}`}>
                          {performance.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <button className="text-blue-600 hover:text-blue-800 text-sm">
                          詳細
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-gray-500">
                      該当するパフォーマンスはありません
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-4">ステータスの説明</h2>
        <ul className="space-y-2">
          <li className="flex items-center">
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
              申請中
            </span>
            <span className="text-sm">パフォーマーが希望の場所と時間で申請してきた状態</span>
          </li>
          <li className="flex items-center">
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mr-2">
              パフォーマ確認中
            </span>
            <span className="text-sm">場所や時間に被りがないか確認し、運営側からパフォーマーに確認している状態</span>
          </li>
          <li className="flex items-center">
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-2">
              確定
            </span>
            <span className="text-sm">確認をパフォーマーが承認し、実施が確定した状態</span>
          </li>
        </ul>
      </Card>
    </div>
  );
} 