"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, MapPin, Info, Store, Clock, Users } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// 場所の定義
type VendorLocation = {
  id: number;
  name: string;
  type: string; // 飲食/物販
  size: string; // 大/中/小
  location: string;
  color: string;
  x: number;
  y: number;
};

// サークル情報
type Circle = {
  id: number;
  name: string;
  contactPerson: string;
  email: string;
};

// 出店情報
type VendorShop = {
  id: number;
  name: string;
  locationId: number;
  startTime: string;
  endTime: string;
  circles: Circle[];
  description: string;
};

// 場所データ
const vendorLocations: VendorLocation[] = [
  {
    id: 1,
    name: "飲食エリアA-1",
    type: "飲食",
    size: "大",
    location: "中央広場北側",
    color: "bg-red-500",
    x: 30,
    y: 20,
  },
  {
    id: 2,
    name: "飲食エリアA-2",
    type: "飲食",
    size: "中",
    location: "中央広場北側",
    color: "bg-red-500",
    x: 40,
    y: 20,
  },
  {
    id: 3,
    name: "飲食エリアB-1",
    type: "飲食",
    size: "大",
    location: "中央広場東側",
    color: "bg-orange-500",
    x: 60,
    y: 30,
  },
  {
    id: 4,
    name: "物販エリアA-1",
    type: "物販",
    size: "中",
    location: "体育館前",
    color: "bg-blue-500",
    x: 50,
    y: 70,
  },
  {
    id: 5,
    name: "物販エリアA-2",
    type: "物販",
    size: "小",
    location: "体育館前",
    color: "bg-blue-500",
    x: 60,
    y: 70,
  },
  {
    id: 6,
    name: "物販エリアB-1",
    type: "物販",
    size: "小",
    location: "正門前",
    color: "bg-green-500",
    x: 80,
    y: 40,
  }
];

// サークルデータ
const circles: Circle[] = [
  { id: 1, name: "フードクラブ", contactPerson: "山田太郎", email: "yamada@example.com" },
  { id: 2, name: "アクセサリー部", contactPerson: "鈴木花子", email: "suzuki@example.com" },
  { id: 3, name: "ビール愛好会", contactPerson: "佐藤健", email: "sato@example.com" },
  { id: 4, name: "手芸サークル", contactPerson: "高橋めぐみ", email: "takahashi@example.com" },
  { id: 5, name: "料理研究会", contactPerson: "田中一郎", email: "tanaka@example.com" },
  { id: 6, name: "アートクラブ", contactPerson: "小林アート", email: "kobayashi@example.com" },
];

// 出店データ
const shops: VendorShop[] = [
  {
    id: 1,
    name: "たこ焼き大阪",
    locationId: 1,
    startTime: "10:00",
    endTime: "15:00",
    circles: [circles[0]],
    description: "大阪風たこ焼きの屋台です。ソース、マヨネーズ、明太子味などバリエーション豊かに提供します。"
  },
  {
    id: 2,
    name: "アクセサリーショップ ルナ",
    locationId: 4,
    startTime: "10:00",
    endTime: "16:00",
    circles: [circles[1], circles[5]],
    description: "ハンドメイドのアクセサリーを販売します。フェスに合わせた特別デザインも用意しています。"
  },
  {
    id: 3,
    name: "クラフトビール専門店",
    locationId: 2,
    startTime: "11:00",
    endTime: "17:00",
    circles: [circles[2]],
    description: "全国の地ビールやクラフトビールを提供します。フェスティバル限定の特別ビールも用意しています。"
  },
  {
    id: 4,
    name: "手作り雑貨 ハンドメイド工房",
    locationId: 6,
    startTime: "09:30",
    endTime: "16:30",
    circles: [circles[3]],
    description: "手作りの小物や雑貨を販売します。木工品、布小物、アクセサリーなど多様な商品を取り揃えています。"
  },
  {
    id: 5,
    name: "ケバブハウス",
    locationId: 3,
    startTime: "10:30",
    endTime: "17:30",
    circles: [circles[4], circles[0]],
    description: "本格的なケバブを提供します。チキン、ビーフ、ベジタリアン向けの種類も用意しています。"
  },
];

export default function VendorMapView() {
  const [selectedLocation, setSelectedLocation] = useState<VendorLocation | null>(null);
  const [selectedShop, setSelectedShop] = useState<VendorShop | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [shopDialogOpen, setShopDialogOpen] = useState(false);
  
  const handleLocationClick = (location: VendorLocation) => {
    setSelectedLocation(location);
    setDialogOpen(true);
  };

  const handleShopClick = (shop: VendorShop) => {
    setSelectedShop(shop);
    setShopDialogOpen(true);
  };

  // 特定の場所に関連する店舗を取得
  const getLocationShop = (locationId: number) => {
    return shops.find(shop => shop.locationId === locationId);
  };

  // 場所に店舗があるかどうかをチェック
  const hasShop = (locationId: number) => {
    return shops.some(shop => shop.locationId === locationId);
  };

  return (
    <div className="space-y-6">
      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-4">出店マップ</h2>
        <div className="mb-2 flex items-center">
          <div className="flex mr-6">
            <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
            <span className="text-sm">飲食エリアA</span>
          </div>
          <div className="flex mr-6">
            <div className="w-4 h-4 bg-orange-500 rounded-full mr-2"></div>
            <span className="text-sm">飲食エリアB</span>
          </div>
          <div className="flex mr-6">
            <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-sm">物販エリアA</span>
          </div>
          <div className="flex">
            <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm">物販エリアB</span>
          </div>
        </div>
        
        <div className="relative w-full h-[500px] bg-gray-100 border border-gray-200 rounded-md">
          {vendorLocations.map((location) => {
            const hasShopAtLocation = hasShop(location.id);
            return (
              <div
                key={location.id}
                className={`absolute w-8 h-8 ${location.color} rounded-full flex items-center justify-center text-white font-bold -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform ${!hasShopAtLocation ? 'opacity-50' : ''}`}
                style={{ left: `${location.x}%`, top: `${location.y}%` }}
                title={`${location.name} (${hasShopAtLocation ? '出店あり' : '出店なし'})`}
                onClick={() => handleLocationClick(location)}
              >
                {location.id}
              </div>
            );
          })}
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">出品一覧</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">店舗名</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">出店時間</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">場所</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">出店サークル</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">操作</th>
              </tr>
            </thead>
            <tbody>
              {shops.map((shop) => {
                const location = vendorLocations.find(loc => loc.id === shop.locationId);
                return (
                  <tr key={shop.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">
                      <div className="flex items-center">
                        {shop.name}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center">
                        {shop.startTime} - {shop.endTime}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {location && (
                        <div className="flex items-center">
                          <div className={`w-3 h-3 ${location.color} rounded-full mr-2`}></div>
                          {location.name}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center">
                        {shop.circles.map(circle => circle.name).join(', ')}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleShopClick(shop)}
                      >
                        詳細
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 場所詳細ダイアログ */}
      {selectedLocation && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <div className={`w-5 h-5 ${selectedLocation.color} rounded-full mr-2`}></div>
                {selectedLocation.name}
              </DialogTitle>
              <DialogDescription>
                場所の詳細情報
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">エリア:</div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                    {selectedLocation.location}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500 mb-1">タイプ:</div>
                  <div>{selectedLocation.type}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500 mb-1">サイズ:</div>
                  <div>{selectedLocation.size}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500 mb-1">出店状況:</div>
                  {hasShop(selectedLocation.id) ? (
                    <div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        出店あり
                      </span>
                      <div className="mt-2">
                        {getLocationShop(selectedLocation.id)?.name}
                      </div>
                    </div>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      出店なし
                    </span>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>閉じる</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* 店舗詳細ダイアログ */}
      {selectedShop && (
        <Dialog open={shopDialogOpen} onOpenChange={setShopDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-bold text-lg">{selectedShop.name}</DialogTitle>
              <DialogDescription>
                出店詳細情報
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 space-y-4">
              <div>
                <div className="font-medium text-gray-700 mb-1">出店情報</div>
                <div className="flex items-center text-gray-700">
                  <Clock className="h-4 w-4 mr-1 text-gray-500" />
                  出店時間: {selectedShop.startTime} - {selectedShop.endTime}
                </div>
                <div className="flex items-center text-gray-700 mt-1">
                  <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                  場所: {vendorLocations.find(loc => loc.id === selectedShop.locationId)?.name}
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-3">
                <div className="font-medium text-gray-700 mb-1">出店サークル</div>
                {selectedShop.circles.map(circle => (
                  <div key={circle.id} className="mb-2">
                    <div className="font-medium">{circle.name}</div>
                    <div className="text-sm text-gray-600">担当者: {circle.contactPerson}</div>
                    <div className="text-sm text-gray-600">連絡先: {circle.email}</div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 pt-3">
                <div className="font-medium text-gray-700 mb-1">出店内容</div>
                <div className="text-gray-700 whitespace-pre-wrap text-sm">{selectedShop.description}</div>
              </div>
            </div>
            <DialogFooter className="mt-4">
              <Button onClick={() => setShopDialogOpen(false)}>閉じる</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
} 