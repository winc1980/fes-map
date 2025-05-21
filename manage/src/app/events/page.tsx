"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import event components
import MapView from "@/components/event/map-view";
import TimeTableView from "@/components/event/time-table-view";
import PerformanceListView from "@/components/event/performance-list-view";
import ApprovalManagementView from "@/components/event/approval-management-view";

export default function EventsPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">イベント管理</h1>
      </div>

      <Tabs defaultValue="map" className="space-y-4">
        <TabsList className="grid grid-cols-4 max-w-lg">
          <TabsTrigger value="map">
            イベント
          </TabsTrigger>
          <TabsTrigger value="timetable">
            タイムテーブル
          </TabsTrigger>
          <TabsTrigger value="performances">
            パフォーマンス
          </TabsTrigger>
          <TabsTrigger value="approvals">
            承認管理
          </TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="space-y-4">
          <MapView />
        </TabsContent>

        <TabsContent value="timetable" className="space-y-4">
          <TimeTableView />
        </TabsContent>

        <TabsContent value="performances" className="space-y-4">
          <PerformanceListView />
        </TabsContent>

        <TabsContent value="approvals" className="space-y-4">
          <ApprovalManagementView />
        </TabsContent>
      </Tabs>
    </div>
  );
} 