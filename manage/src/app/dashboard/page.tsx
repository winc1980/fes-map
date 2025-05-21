"use client";

import React from "react";
import { Card } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">ダッシュボード</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <h3 className="text-sm font-medium">総イベント数</h3>
          <div className="mt-2 text-2xl font-bold">12</div>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium">本日の来場者数</h3>
          <div className="mt-2 text-2xl font-bold">2,348</div>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium">売上</h3>
          <div className="mt-2 text-2xl font-bold">¥1,234,567</div>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium">登録ユーザー数</h3>
          <div className="mt-2 text-2xl font-bold">5,432</div>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
        <Card className="col-span-2 p-4">
          <h3 className="mb-4 text-sm font-medium">訪問者推移</h3>
          <div className="h-[200px] w-full bg-gray-100 flex items-center justify-center">
            グラフデータ表示エリア
          </div>
        </Card>
        <Card className="p-4">
          <h3 className="mb-4 text-sm font-medium">人気ブース</h3>
          <div className="space-y-2">
            {["フードコート A", "メインステージ", "ワークショップ", "グッズ販売"].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span>{item}</span>
                <span className="text-sm text-gray-500">{100 - index * 12}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mt-6">
        <Card className="p-4">
          <h3 className="mb-4 text-sm font-medium">最近のアクティビティ</h3>
          <div className="space-y-2">
            {[
              "新しいパフォーマンスが申請されました",
              "タイムテーブルが更新されました",
              "イベント「夏祭り2024」の設定が変更されました",
              "新しい出店者が登録されました"
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between border-b border-gray-100 pb-2">
                <span className="text-sm">{item}</span>
                <span className="text-xs text-gray-500">{index + 1}時間前</span>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-4">
          <h3 className="mb-4 text-sm font-medium">今後のイベント</h3>
          <div className="space-y-2">
            {[
              { name: "夏祭り2024", date: "2024-07-20" },
              { name: "秋の収穫祭", date: "2024-10-10" },
              { name: "冬のイルミネーション", date: "2024-12-15" }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between border-b border-gray-100 pb-2">
                <span className="text-sm">{item.name}</span>
                <span className="text-xs text-gray-500">{item.date}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
} 