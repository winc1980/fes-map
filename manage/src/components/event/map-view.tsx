"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, MapPin, Info } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Venue = {
  id: number;
  name: string;
  type: string;
  location: string;
  color: string;
  x: number;
  y: number;
};

type Event = {
  id: number;
  name: string;
  venueId: number;
  startTime: string;
  endTime: string;
  description: string;
};

const venues: Venue[] = [
  {
    id: 1,
    name: "メインステージ",
    type: "ステージ",
    location: "中央広場",
    color: "bg-red-500",
    x: 50,
    y: 30
  },
  {
    id: 2,
    name: "サブステージ",
    type: "ステージ",
    location: "東側広場",
    color: "bg-blue-500",
    x: 75,
    y: 60
  },
  {
    id: 3,
    name: "物販エリアA",
    type: "物販",
    location: "北側エリア",
    color: "bg-green-500",
    x: 30,
    y: 20
  },
  {
    id: 4,
    name: "物販エリアB",
    type: "物販",
    location: "南側エリア",
    color: "bg-yellow-500",
    x: 40,
    y: 70
  },
  {
    id: 5,
    name: "飲食エリア",
    type: "飲食",
    location: "西側エリア",
    color: "bg-purple-500",
    x: 15,
    y: 45
  },
  {
    id: 6,
    name: "ワークショップスペース",
    type: "ワークショップ",
    location: "体育館",
    color: "bg-pink-500",
    x: 65,
    y: 15
  }
];

// サンプルイベント
const initialEvents: Event[] = [
  {
    id: 1,
    name: "オープニングセレモニー",
    venueId: 1,
    startTime: "10:00",
    endTime: "10:30",
    description: "フェスティバルの開会式です。主催者の挨拶と出演者の紹介を行います。"
  },
  {
    id: 2,
    name: "バンド演奏「ROCK STARS」",
    venueId: 2,
    startTime: "11:00",
    endTime: "12:00",
    description: "学生バンドによるロック演奏です。オリジナル曲を中心に演奏します。"
  }
];

export default function MapView() {
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>(initialEvents);
  
  // 新しいイベント追加用の状態
  const [addEventDialog, setAddEventDialog] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    venueId: 0,
    startTime: "",
    endTime: "",
    name: "",
    description: ""
  });

  const handleVenueClick = (venue: Venue) => {
    setSelectedVenue(venue);
    setDialogOpen(true);
  };

  const handleAddEventClick = () => {
    setAddEventDialog(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewEvent({
      ...newEvent,
      [name]: value
    });
  };

  const handleVenueChange = (value: string) => {
    setNewEvent({
      ...newEvent,
      venueId: parseInt(value)
    });
  };

  const handleAddEvent = () => {
    const newEventData: Event = {
      id: events.length + 1,
      name: newEvent.name || "",
      venueId: newEvent.venueId || 0,
      startTime: newEvent.startTime || "",
      endTime: newEvent.endTime || "",
      description: newEvent.description || ""
    };

    setEvents([...events, newEventData]);
    setAddEventDialog(false);
    setNewEvent({
      venueId: 0,
      startTime: "",
      endTime: "",
      name: "",
      description: ""
    });
  };

  // 特定の会場に関連するイベントを取得
  const getVenueEvents = (venueId: number) => {
    return events.filter(event => event.venueId === venueId);
  };

  // 会場の情報を取得
  const getVenueById = (venueId: number) => {
    return venues.find(venue => venue.id === venueId);
  };

  return (
    <div className="space-y-6">
      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-4">マップ</h2>
        <div className="relative w-full h-[500px] bg-gray-100 border border-gray-200 rounded-md">
          {venues.map((venue) => (
            <div
              key={venue.id}
              className={`absolute w-8 h-8 ${venue.color} rounded-full flex items-center justify-center text-white font-bold -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform`}
              style={{ left: `${venue.x}%`, top: `${venue.y}%` }}
              title={venue.name}
              onClick={() => handleVenueClick(venue)}
            >
              {venue.id}
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">イベント一覧</h2>
          <Button variant="outline" size="sm" onClick={handleAddEventClick}>
            <Plus className="h-4 w-4 mr-1" />
            イベント追加
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">イベント名</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">会場</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">時間</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => {
                const venue = getVenueById(event.venueId);
                return (
                  <tr key={event.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{event.name}</td>
                    <td className="px-4 py-3">
                      {venue && (
                        <div className="flex items-center">
                          <div className={`w-4 h-4 ${venue.color} rounded-full mr-2`}></div>
                          <span>{venue.name}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm">{event.startTime} - {event.endTime}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 会場詳細ダイアログ */}
      {selectedVenue && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <div className={`w-5 h-5 ${selectedVenue.color} rounded-full mr-2`}></div>
                {selectedVenue.name}
              </DialogTitle>
              <DialogDescription>
                この会場で開催されるイベント一覧
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="mb-4">
                <div className="text-sm text-gray-500 mb-1">場所:</div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                  {selectedVenue.location}
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-500 mb-2">スケジュール:</div>
                {getVenueEvents(selectedVenue.id).length > 0 ? (
                  <div className="space-y-3">
                    {getVenueEvents(selectedVenue.id).map(event => (
                      <div key={event.id} className="border-l-2 border-blue-500 pl-3 py-1">
                        <div className="font-medium">{event.name}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {event.startTime} - {event.endTime}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-gray-500">予定されているイベントはありません</div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>閉じる</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* イベント追加ダイアログ */}
      <Dialog open={addEventDialog} onOpenChange={setAddEventDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>新しいイベントを追加</DialogTitle>
            <DialogDescription>
              イベントの詳細情報を入力してください。
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium mb-1 block">会場</label>
              <Select
                value={newEvent.venueId ? newEvent.venueId.toString() : undefined}
                onValueChange={handleVenueChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="会場を選択してください" />
                </SelectTrigger>
                <SelectContent>
                  {venues.map(venue => (
                    <SelectItem key={venue.id} value={venue.id.toString()}>
                      <div className="flex items-center">
                        <div className={`w-3 h-3 ${venue.color} rounded-full mr-2`}></div>
                        {venue.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">イベント名</label>
              <input 
                type="text" 
                name="name"
                value={newEvent.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                placeholder="イベント名を入力"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">開始時間</label>
                <input 
                  type="time" 
                  name="startTime"
                  value={newEvent.startTime}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">終了時間</label>
                <input 
                  type="time" 
                  name="endTime"
                  value={newEvent.endTime}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">詳細</label>
              <textarea 
                name="description"
                value={newEvent.description}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                rows={3}
                placeholder="イベントの詳細情報を入力"
              ></textarea>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddEventDialog(false)}>キャンセル</Button>
            <Button onClick={handleAddEvent}>
              <Plus className="w-4 h-4 mr-1" />
              イベントを追加
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 