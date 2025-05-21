"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Performance = {
  id: number;
  name: string;
  performerName: string;
  venueId: number;
  venueName: string;
  startTime: string;
  endTime: string;
  status: "確定" | "未確定";
  color: string;
  day: "day1" | "day2";
};

type Venue = {
  id: number;
  name: string;
};

const venues: Venue[] = [
  { id: 1, name: "メインステージ" },
  { id: 2, name: "サブステージ" },
  { id: 6, name: "ワークショップスペース" }
];

const timeSlots = [
  "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30"
];

const performances: Performance[] = [
  {
    id: 1,
    name: "オープニングセレモニー",
    performerName: "実行委員会",
    venueId: 1,
    venueName: "メインステージ",
    startTime: "10:00",
    endTime: "10:30",
    status: "確定",
    color: "bg-blue-100",
    day: "day1"
  },
  {
    id: 2,
    name: "バンド演奏「ROCK STARS」",
    performerName: "学生バンド連合",
    venueId: 1,
    venueName: "メインステージ",
    startTime: "11:00",
    endTime: "12:00",
    status: "確定",
    color: "bg-red-100",
    day: "day1"
  },
  {
    id: 3,
    name: "ダンスパフォーマンス",
    performerName: "ダンス部",
    venueId: 1,
    venueName: "メインステージ",
    startTime: "13:00",
    endTime: "14:00",
    status: "確定",
    color: "bg-green-100",
    day: "day1"
  },
  {
    id: 4,
    name: "アカペラコンサート",
    performerName: "音楽サークル",
    venueId: 2,
    venueName: "サブステージ",
    startTime: "11:30",
    endTime: "12:30",
    status: "確定",
    color: "bg-purple-100",
    day: "day1"
  },
  {
    id: 5,
    name: "民謡パフォーマンス",
    performerName: "伝統芸能部",
    venueId: 2,
    venueName: "サブステージ",
    startTime: "14:00",
    endTime: "15:00",
    status: "確定",
    color: "bg-yellow-100",
    day: "day1"
  },
  {
    id: 6,
    name: "手作りアクセサリー教室",
    performerName: "クラフトサークル",
    venueId: 6,
    venueName: "ワークショップスペース",
    startTime: "10:30",
    endTime: "12:00",
    status: "確定",
    color: "bg-pink-100",
    day: "day1"
  },
  {
    id: 7,
    name: "プログラミング体験",
    performerName: "情報技術研究会",
    venueId: 6,
    venueName: "ワークショップスペース",
    startTime: "13:30",
    endTime: "15:30",
    status: "確定",
    color: "bg-indigo-100",
    day: "day1"
  },
  {
    id: 8,
    name: "クロージングセレモニー",
    performerName: "実行委員会",
    venueId: 1,
    venueName: "メインステージ",
    startTime: "17:00",
    endTime: "18:00",
    status: "確定",
    color: "bg-blue-100",
    day: "day2"
  },
  {
    id: 9,
    name: "ジャズライブ",
    performerName: "ジャズ研究会",
    venueId: 2,
    venueName: "サブステージ",
    startTime: "13:00",
    endTime: "14:30",
    status: "確定",
    color: "bg-green-100",
    day: "day2"
  }
];

export default function TimeTableView() {
  const [selectedDay, setSelectedDay] = useState<"day1" | "day2">("day1");
  
  const filteredPerformances = performances.filter(p => p.day === selectedDay);

  return (
    <div className="space-y-6">
      <Card className="p-4">
        <div className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <h2 className="text-xl font-semibold mb-2 sm:mb-0">タイムテーブル</h2>
          <Tabs 
            defaultValue="day1" 
            value={selectedDay}
            onValueChange={(value) => setSelectedDay(value as "day1" | "day2")}
            className="w-full sm:w-auto"
          >
            <TabsList className="grid w-full sm:w-[200px] grid-cols-2">
              <TabsTrigger value="day1">1日目</TabsTrigger>
              <TabsTrigger value="day2">2日目</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-200 bg-gray-100 p-2 font-medium sticky left-0 z-10">時間 / 会場</th>
                {venues.map(venue => (
                  <th key={venue.id} className="border border-gray-200 bg-gray-100 p-2 font-medium text-center min-w-[200px]">
                    {venue.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map(timeSlot => (
                <tr key={timeSlot}>
                  <td className="border border-gray-200 p-2 sticky left-0 bg-white font-medium z-10">
                    {timeSlot}
                  </td>
                  {venues.map(venue => {
                    const performance = filteredPerformances.find(p => 
                      p.venueId === venue.id && 
                      p.startTime === timeSlot && 
                      p.status === "確定"
                    );
                    
                    if (performance) {
                      const startIndex = timeSlots.indexOf(performance.startTime);
                      const endIndex = timeSlots.indexOf(performance.endTime);
                      const rowSpan = endIndex - startIndex;
                      
                      return (
                        <td 
                          key={`${timeSlot}-${venue.id}`}
                          className={`border border-gray-200 p-2 ${performance.color} relative rounded-sm`}
                          rowSpan={rowSpan > 0 ? rowSpan : 1}
                        >
                          <div className="font-medium">{performance.name}</div>
                          <div className="text-xs mt-1">{performance.performerName}</div>
                          <div className="text-xs mt-1">{performance.startTime} - {performance.endTime}</div>
                        </td>
                      );
                    }
                    
                    // すでにスパンが設定されているセルは表示しない
                    const isOccupiedByPreviousEvent = filteredPerformances.some(p => 
                      p.venueId === venue.id && 
                      p.status === "確定" &&
                      timeSlots.indexOf(p.startTime) < timeSlots.indexOf(timeSlot) &&
                      timeSlots.indexOf(p.endTime) > timeSlots.indexOf(timeSlot)
                    );
                    
                    if (isOccupiedByPreviousEvent) {
                      return null;
                    }
                    
                    return (
                      <td 
                        key={`${timeSlot}-${venue.id}`}
                        className="border border-gray-200 p-2 h-12"
                      ></td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-4">確定済みパフォーマンス一覧</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">パフォーマンス名</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">パフォーマー</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">会場</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">時間</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">日程</th>
              </tr>
            </thead>
            <tbody>
              {performances
                .filter(performance => performance.status === "確定")
                .sort((a, b) => {
                  // まず日付でソート
                  if (a.day !== b.day) {
                    return a.day === "day1" ? -1 : 1;
                  }
                  // 同じ日付なら時間でソート
                  return timeSlots.indexOf(a.startTime) - timeSlots.indexOf(b.startTime);
                })
                .map(performance => (
                <tr key={performance.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{performance.name}</td>
                  <td className="px-4 py-3 text-sm">{performance.performerName}</td>
                  <td className="px-4 py-3 text-sm">{performance.venueName}</td>
                  <td className="px-4 py-3 text-sm">{performance.startTime} - {performance.endTime}</td>
                  <td className="px-4 py-3 text-sm">{performance.day === "day1" ? "1日目" : "2日目"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
} 