"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// コンポーネントのインポート
import VendorMapView from "@/components/vendor/vendor-map-view";
import VendorApplicationView from "@/components/vendor/vendor-application-view";

export default function VendorsPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">出店管理</h1>
      </div>

      <Tabs defaultValue="map" className="space-y-4">
        <TabsList className="grid grid-cols-2 max-w-md">
          <TabsTrigger value="map">
            出店
          </TabsTrigger>
          <TabsTrigger value="applications">
            承認管理
          </TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="space-y-4">
          <VendorMapView />
        </TabsContent>

        <TabsContent value="applications" className="space-y-4">
          <VendorApplicationView />
        </TabsContent>
      </Tabs>
    </div>
  );
}

type VendorStatus = '承認済み' | '審査中' | '却下';

type Vendor = {
  id: number;
  name: string;
  category: string;
  contact: {
    name: string;
    email: string;
  };
  status: VendorStatus;
};

const statusColors: Record<VendorStatus, string> = {
  '承認済み': 'bg-green-100 text-green-800',
  '審査中': 'bg-yellow-100 text-yellow-800',
  '却下': 'bg-red-100 text-red-800',
};

const vendors: Vendor[] = [
  {
    id: 1,
    name: 'たこ焼き大阪',
    category: '飲食',
    contact: {
      name: '山田太郎',
      email: 'yamada@example.com'
    },
    status: '承認済み'
  },
  {
    id: 2,
    name: 'アクセサリーショップ ルナ',
    category: '物販',
    contact: {
      name: '鈴木花子',
      email: 'suzuki@example.com'
    },
    status: '承認済み'
  },
  {
    id: 3,
    name: 'クラフトビール専門店',
    category: '飲食',
    contact: {
      name: '佐藤健',
      email: 'sato@example.com'
    },
    status: '審査中'
  },
  {
    id: 4,
    name: '手作り雑貨 ハンドメイド工房',
    category: '物販',
    contact: {
      name: '高橋めぐみ',
      email: 'takahashi@example.com'
    },
    status: '却下'
  }
]; 