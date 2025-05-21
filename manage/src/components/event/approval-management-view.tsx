"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Check, X, Calendar, Clock, Edit, Eye, AlertTriangle, CheckCircle2, SendHorizonal, FileCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type PerformanceStatus = "申請中" | "重複あり" | "確認中" | "パフォーマ確認中" | "確定済み";
type Day = "day1" | "day2";

type ConflictingPerformance = {
  id: number;
  name: string;
  venueName: string;
  startTime: string;
  endTime: string;
  performers: string[];
  suggestedStartTime?: string;
  suggestedEndTime?: string;
  status: PerformanceStatus;
  conflictsWith: number[];
  day: Day;
  conflictTime?: string; // 重複時間帯（グループ化用）
};

const conflictingPerformances: ConflictingPerformance[] = [
  {
    id: 9,
    name: "演劇部公演「夏の夢」",
    venueName: "メインステージ",
    startTime: "15:00",
    endTime: "16:30",
    performers: ["演劇部"],
    status: "重複あり",
    conflictsWith: [8],
    day: "day1",
    conflictTime: "16:00-16:30"
  },
  {
    id: 8,
    name: "お笑いライブ",
    venueName: "サブステージ",
    startTime: "16:00",
    endTime: "17:00",
    performers: ["お笑いサークル"],
    suggestedStartTime: "17:00",
    suggestedEndTime: "18:00",
    status: "確認中",
    conflictsWith: [9],
    day: "day1",
    conflictTime: "16:00-16:30"
  },
  {
    id: 10,
    name: "マジックショー",
    venueName: "サブステージ",
    startTime: "13:00",
    endTime: "14:00",
    performers: ["手品サークル"],
    suggestedStartTime: "13:30",
    suggestedEndTime: "14:30",
    status: "確認中",
    conflictsWith: [5],
    day: "day1",
    conflictTime: "13:30-14:00"
  },
  {
    id: 5,
    name: "民謡パフォーマンス",
    venueName: "サブステージ",
    startTime: "14:00",
    endTime: "15:00",
    performers: ["伝統芸能部"],
    status: "確定済み",
    conflictsWith: [10],
    day: "day1",
    conflictTime: "13:30-14:00"
  },
  {
    id: 11,
    name: "ジャズバンド演奏",
    venueName: "メインステージ",
    startTime: "17:00",
    endTime: "18:00",
    performers: ["ジャズ研究会"],
    suggestedStartTime: "18:00",
    suggestedEndTime: "19:00",
    status: "重複あり",
    conflictsWith: [12],
    day: "day2",
    conflictTime: "17:00-18:00"
  },
  {
    id: 12,
    name: "クロージングセレモニー",
    venueName: "メインステージ",
    startTime: "18:00",
    endTime: "19:00",
    performers: ["実行委員会"],
    status: "重複あり",
    conflictsWith: [11],
    day: "day2",
    conflictTime: "17:00-18:00"
  },
  {
    id: 13,
    name: "フォークソングライブ",
    venueName: "サブステージ",
    startTime: "12:00",
    endTime: "13:00",
    performers: ["音楽サークル"],
    status: "申請中",
    conflictsWith: [],
    day: "day1",
  },
  {
    id: 14,
    name: "チアリーディング",
    venueName: "メインステージ",
    startTime: "13:30",
    endTime: "14:00",
    performers: ["チアリーディング部"],
    status: "申請中",
    conflictsWith: [],
    day: "day2",
  },
  {
    id: 15,
    name: "ヒップホップダンス",
    venueName: "サブステージ",
    startTime: "16:00",
    endTime: "16:30",
    performers: ["ストリートダンスサークル"],
    status: "確定済み",
    conflictsWith: [],
    day: "day2",
  }
];

export default function ApprovalManagementView() {
  const [conflicts, setConflicts] = useState<ConflictingPerformance[]>(conflictingPerformances);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedConflict, setSelectedConflict] = useState<ConflictingPerformance | null>(null);
  const [suggestedStartTime, setSuggestedStartTime] = useState<string>("");
  const [suggestedEndTime, setSuggestedEndTime] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<string>("applied");

  const handleViewDetails = (conflict: ConflictingPerformance) => {
    setSelectedConflict(conflict);
    setDialogOpen(true);
    setSuggestedStartTime(conflict.suggestedStartTime || conflict.startTime);
    setSuggestedEndTime(conflict.suggestedEndTime || conflict.endTime);
  };

  const updateStatus = (id: number, newStatus: PerformanceStatus) => {
    setConflicts(conflicts.map(c => 
      c.id === id ? {...c, status: newStatus} : c
    ));
  };

  const handleApprove = (id: number) => {
    updateStatus(id, "確定済み");
    setDialogOpen(false);
  };

  const handleSubmitSuggestion = () => {
    if (!selectedConflict) return;
    
    setConflicts(conflicts.map(c => 
      c.id === selectedConflict.id ? {
        ...c,
        suggestedStartTime,
        suggestedEndTime,
        status: "パフォーマ確認中" as PerformanceStatus
      } : c
    ));
    
    setDialogOpen(false);
  };

  const filteredConflicts = conflicts
    .filter(c => {
      switch (activeTab) {
        case "applied": return c.status === "申請中" || c.status === "重複あり";
        case "confirmed": return c.status === "パフォーマ確認中" || c.status === "確認中";
        case "approved": return c.status === "確定済み";
        default: return true;
      }
    })
    .filter(c => selectedDay === "all" || c.day === selectedDay);

  // タブごとのカウント
  const appliedCount = conflicts.filter(c => c.status === "申請中" || c.status === "重複あり").length;
  const confirmedCount = conflicts.filter(c => c.status === "パフォーマ確認中" || c.status === "確認中").length;
  const approvedCount = conflicts.filter(c => c.status === "確定済み").length;

  // 重複時間帯でグループ化
  const conflictGroups = activeTab === "applied" 
    ? filteredConflicts
        .filter(c => c.conflictsWith.length > 0)
        .reduce((groups, conflict) => {
          if (!conflict.conflictTime) return groups;
          
          if (!groups[conflict.conflictTime]) {
            groups[conflict.conflictTime] = [];
          }
          groups[conflict.conflictTime].push(conflict);
          return groups;
        }, {} as Record<string, ConflictingPerformance[]>)
    : {};

  // 重複時間でソートされたキー
  const sortedConflictTimes = Object.keys(conflictGroups).sort();

  // ステータスに応じたバッジスタイル
  const getStatusBadgeStyle = (status: PerformanceStatus) => {
    switch(status) {
      case "申請中": return "bg-blue-100 text-blue-800";
      case "パフォーマ確認中": return "bg-purple-100 text-purple-800";
      case "確定済み": return "bg-green-100 text-green-800";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-4">
        <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center md:space-y-0 mb-4">
          <h2 className="text-xl font-semibold">パフォーマンス承認管理</h2>
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
        </div>

        <Tabs defaultValue="applied" value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="applied" className="relative">
              <div className="flex items-center">
                申請
              </div>
              <Badge variant="secondary" className="ml-2 absolute right-2 bg-blue-100 text-blue-800">{appliedCount}</Badge>
            </TabsTrigger>
            <TabsTrigger value="confirmed" className="relative">
              <div className="flex items-center">
                パフォーマ確認中
              </div>
              <Badge variant="secondary" className="ml-2 absolute right-2 bg-purple-100 text-purple-800">{confirmedCount}</Badge>
            </TabsTrigger>
            <TabsTrigger value="approved" className="relative">
              <div className="flex items-center">
                確定
              </div>
              <Badge variant="outline" className="ml-2 absolute right-2 bg-green-100 text-green-800">{approvedCount}</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="applied" className="mt-6">
            {sortedConflictTimes.length > 0 && (
              <div className="space-y-8 mb-8">
                {sortedConflictTimes.map(timeKey => (
                  <div key={timeKey} className="border rounded-md p-4">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      重複時間: {timeKey}
                    </h3>
                    <div className="bg-amber-50 p-3 rounded-md mb-4">
                      <p className="text-sm text-amber-800">
                        この時間帯で{conflictGroups[timeKey].length}件のパフォーマンスが重複しています。
                        時間の調整が必要です。
                      </p>
                    </div>
                    <ConflictTable 
                      conflicts={conflictGroups[timeKey]} 
                      allConflicts={conflicts} 
                      onViewDetails={handleViewDetails}
                      getStatusBadgeStyle={getStatusBadgeStyle}
                    />
                  </div>
                ))}
              </div>
            )}
            <ConflictTable 
              conflicts={filteredConflicts.filter(c => c.conflictsWith.length === 0)} 
              allConflicts={conflicts} 
              onViewDetails={handleViewDetails}
              getStatusBadgeStyle={getStatusBadgeStyle}
            />
          </TabsContent>

          <TabsContent value="confirmed" className="mt-6">
            <ConflictTable 
              conflicts={filteredConflicts} 
              allConflicts={conflicts} 
              onViewDetails={handleViewDetails}
              getStatusBadgeStyle={getStatusBadgeStyle}
            />
          </TabsContent>

          <TabsContent value="approved" className="mt-6">
            <ConflictTable 
              conflicts={filteredConflicts} 
              allConflicts={conflicts} 
              onViewDetails={handleViewDetails}
              getStatusBadgeStyle={getStatusBadgeStyle}
            />
          </TabsContent>
        </Tabs>
      </Card>

      {/* 詳細ダイアログ */}
      {selectedConflict && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-bold text-lg">{selectedConflict.name}</DialogTitle>
              <DialogDescription asChild>
                <div className="mt-2 space-y-3">
                  <div className="flex justify-between">
                    <div className="text-sm">
                      <div className="flex items-center text-gray-700">
                        会場: {selectedConflict.venueName}
                      </div>
                      <div className="flex items-center text-gray-700">
                        申請時間: {selectedConflict.startTime} - {selectedConflict.endTime}
                      </div>
                      <div className="text-gray-700">
                        日程: {selectedConflict.day === "day1" ? "1日目" : "2日目"}
                      </div>
                    </div>
                    <Badge variant="secondary" className={`h-fit ${getStatusBadgeStyle(selectedConflict.status)}`}>
                      {selectedConflict.status}
                    </Badge>
                  </div>
                  
                  {selectedConflict.conflictsWith.length > 0 && (
                    <div className="border-t border-gray-200 pt-3">
                      <h4 className="font-semibold text-sm mb-1">重複情報</h4>
                      <div className="text-sm text-blue-600">
                        {selectedConflict.conflictsWith.map(id => {
                          const conflictingEvent = conflicts.find(c => c.id === id);
                          return conflictingEvent ? (
                            <div key={id} className="mb-1">
                              <span className="font-medium">{conflictingEvent.name}</span> - 
                              {conflictingEvent.startTime} - {conflictingEvent.endTime}
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}

                  {selectedConflict.status !== "確定済み" && (
                    <div className="border-t border-gray-200 pt-3">
                      <h4 className="font-semibold text-sm mb-2">時間を提案</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">開始時間</label>
                          <input 
                            type="time" 
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            value={suggestedStartTime}
                            onChange={(e) => setSuggestedStartTime(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">終了時間</label>
                          <input 
                            type="time" 
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            value={suggestedEndTime}
                            onChange={(e) => setSuggestedEndTime(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex justify-end space-x-2 mt-4">
              {selectedConflict.status !== "確定済み" && (
                <>
                  <Button variant="outline" size="sm" onClick={() => setDialogOpen(false)}>
                    キャンセル
                  </Button>
                  <Button size="sm" onClick={handleSubmitSuggestion} className="bg-purple-600 hover:bg-purple-700">
                    時間提案
                  </Button>
                  <Button size="sm" onClick={() => handleApprove(selectedConflict.id)} variant="default" className="bg-green-600 hover:bg-green-700">
                    承認
                  </Button>
                </>
              )}
              {selectedConflict.status === "確定済み" && (
                <Button size="sm" onClick={() => setDialogOpen(false)}>
                  閉じる
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

// テーブルコンポーネントの分離
function ConflictTable({ 
  conflicts, 
  allConflicts, 
  onViewDetails,
  getStatusBadgeStyle
}: { 
  conflicts: ConflictingPerformance[],
  allConflicts: ConflictingPerformance[],
  onViewDetails: (conflict: ConflictingPerformance) => void,
  getStatusBadgeStyle: (status: PerformanceStatus) => string
}) {
  return (
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
            {conflicts.length > 0 ? (
              conflicts.map((conflict) => (
                <tr key={conflict.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium whitespace-nowrap">
                    <div className="flex items-start">
                      <div>
                        {conflict.name}
                        {conflict.conflictsWith.length > 0 && (
                          <div className="text-xs text-blue-600 mt-1 whitespace-nowrap">
                            <span className="font-medium">重複: </span> 
                            {conflict.conflictsWith.map(id => {
                              const conflictingEvent = allConflicts.find(c => c.id === id);
                              return conflictingEvent ? `${conflictingEvent.name}` : "";
                            }).join(", ")}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm whitespace-nowrap">{conflict.venueName}</td>
                  <td className="px-4 py-3 text-sm whitespace-nowrap">
                    <div>{conflict.startTime} - {conflict.endTime}</div>
                    {(conflict.suggestedStartTime || conflict.suggestedEndTime) && (
                      <div className={`text-xs ${conflict.status === "確定済み" ? "text-green-600" : "text-purple-600"}`}>
                        {conflict.status === "確定済み" ? "確定: " : "提案: "}
                        {conflict.suggestedStartTime} - {conflict.suggestedEndTime}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm whitespace-nowrap">{conflict.day === "day1" ? "1日目" : "2日目"}</td>
                  <td className="px-4 py-3 text-sm whitespace-nowrap">{conflict.performers.join(", ")}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <Badge variant="secondary" className={`text-xs ${getStatusBadgeStyle(conflict.status)}`}>
                      {conflict.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <button 
                      className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
                      onClick={() => onViewDetails(conflict)}
                    >
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
  );
} 