"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Store, AlertCircle, CheckCircle, XCircle, Clock, Eye, FileText } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type VendorApplication = {
  id: number;
  vendorName: string;
  category: string;
  locationName: string;
  locationId: number;
  contactName: string;
  contactEmail: string;
  description: string;
  appliedAt: string;
  status: "申請中" | "審査中" | "承認済み" | "却下";
  note?: string;
};

const applications: VendorApplication[] = [
  {
    id: 1,
    vendorName: "たこ焼き大阪",
    category: "飲食",
    locationName: "飲食エリアA-1",
    locationId: 1,
    contactName: "山田太郎",
    contactEmail: "yamada@example.com",
    description: "大阪風たこ焼きの屋台です。ソース、マヨネーズ、明太子味などバリエーション豊かに提供します。",
    appliedAt: "2023-05-10",
    status: "承認済み"
  },
  {
    id: 2,
    vendorName: "アクセサリーショップ ルナ",
    category: "物販",
    locationName: "物販エリアA-1",
    locationId: 4,
    contactName: "鈴木花子",
    contactEmail: "suzuki@example.com",
    description: "ハンドメイドのアクセサリーを販売します。フェスに合わせた特別デザインも用意しています。",
    appliedAt: "2023-05-11",
    status: "承認済み"
  },
  {
    id: 3,
    vendorName: "クラフトビール専門店",
    category: "飲食",
    locationName: "飲食エリアA-2",
    locationId: 2,
    contactName: "佐藤健",
    contactEmail: "sato@example.com",
    description: "全国の地ビールやクラフトビールを提供します。フェスティバル限定の特別ビールも用意しています。",
    appliedAt: "2023-05-15",
    status: "申請中"
  },
  {
    id: 4,
    vendorName: "手作り雑貨 ハンドメイド工房",
    category: "物販",
    locationName: "物販エリアB-1",
    locationId: 6,
    contactName: "高橋めぐみ",
    contactEmail: "takahashi@example.com",
    description: "手作りの小物や雑貨を販売します。木工品、布小物、アクセサリーなど多様な商品を取り揃えています。",
    appliedAt: "2023-05-16",
    status: "審査中",
    note: "場所の変更を検討中"
  },
  {
    id: 5,
    vendorName: "ケバブハウス",
    category: "飲食",
    locationName: "飲食エリアB-1",
    locationId: 3,
    contactName: "田中一郎",
    contactEmail: "tanaka@example.com",
    description: "本格的なケバブを提供します。チキン、ビーフ、ベジタリアン向けの種類も用意しています。",
    appliedAt: "2023-05-17",
    status: "申請中"
  },
  {
    id: 6,
    vendorName: "似顔絵アート",
    category: "物販",
    locationName: "物販エリアA-2",
    locationId: 5,
    contactName: "小林アート",
    contactEmail: "kobayashi@example.com",
    description: "その場で似顔絵を描きます。記念に残る特別な思い出をお届けします。",
    appliedAt: "2023-05-18",
    status: "却下",
    note: "申請内容に不備があったため"
  }
];

export default function VendorApplicationView() {
  const [selectedApplication, setSelectedApplication] = useState<VendorApplication | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [vendorApplications, setVendorApplications] = useState<VendorApplication[]>(applications);
  const [activeTab, setActiveTab] = useState<string>("applied");
  const [adminNote, setAdminNote] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const handleViewDetails = (application: VendorApplication) => {
    setSelectedApplication(application);
    setAdminNote(application.note || "");
    setDialogOpen(true);
  };

  const handleStatusChange = (id: number, newStatus: VendorApplication["status"]) => {
    setVendorApplications(vendorApplications.map(app => 
      app.id === id ? { ...app, status: newStatus, note: adminNote || undefined } : app
    ));
    setDialogOpen(false);
  };

  const filteredApplications = vendorApplications.filter(app => {
    // カテゴリーフィルター
    if (selectedCategory !== "all" && app.category !== selectedCategory) {
      return false;
    }
    
    // タブフィルター
    switch (activeTab) {
      case "applied": return app.status === "申請中";
      case "reviewing": return app.status === "審査中";
      case "approved": return app.status === "承認済み" || app.status === "却下";
      default: return true;
    }
  });

  // タブごとのカウント
  const appliedCount = vendorApplications.filter(app => app.status === "申請中").length;
  const reviewingCount = vendorApplications.filter(app => app.status === "審査中").length;
  const approvedCount = vendorApplications.filter(app => app.status === "承認済み" || app.status === "却下").length;

  // ステータスに応じたバッジスタイル
  const getStatusBadgeStyle = (status: VendorApplication["status"]) => {
    switch(status) {
      case "申請中": return "bg-blue-100 text-blue-800";
      case "審査中": return "bg-yellow-100 text-yellow-800";
      case "承認済み": return "bg-green-100 text-green-800";
      case "却下": return "bg-red-100 text-red-800";
      default: return "";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-4">
        <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center md:space-y-0 mb-4">
          <h2 className="text-xl font-semibold">出店承認管理</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 flex items-center">
              カテゴリー:
            </span>
            <Select
              value={selectedCategory}
              onValueChange={(value) => setSelectedCategory(value)}
            >
              <SelectTrigger className="w-[120px] h-8">
                <SelectValue placeholder="カテゴリー選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべて</SelectItem>
                <SelectItem value="飲食">飲食</SelectItem>
                <SelectItem value="物販">物販</SelectItem>
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
            <TabsTrigger value="reviewing" className="relative">
              <div className="flex items-center">
                審査中
              </div>
              <Badge variant="secondary" className="ml-2 absolute right-2 bg-yellow-100 text-yellow-800">{reviewingCount}</Badge>
            </TabsTrigger>
            <TabsTrigger value="approved" className="relative">
              <div className="flex items-center">
                確定
              </div>
              <Badge variant="outline" className="ml-2 absolute right-2 bg-green-100 text-green-800">{approvedCount}</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <div className="border rounded-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 whitespace-nowrap">店舗名</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 whitespace-nowrap">カテゴリ</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 whitespace-nowrap">希望場所</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 whitespace-nowrap">担当者</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 whitespace-nowrap">申請日</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 whitespace-nowrap">ステータス</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 whitespace-nowrap">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApplications.length > 0 ? (
                      filteredApplications.map((application) => (
                        <tr key={application.id} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="px-4 py-3 font-medium whitespace-nowrap">
                            <div className="flex items-center">
                              {application.vendorName}
                            </div>
                            {application.note && (
                              <div className="text-xs text-blue-600 mt-1 whitespace-nowrap">
                                <span className="font-medium">備考:</span> {application.note}
                              </div>
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm whitespace-nowrap">{application.category}</td>
                          <td className="px-4 py-3 text-sm whitespace-nowrap">{application.locationName}</td>
                          <td className="px-4 py-3 text-sm whitespace-nowrap">{application.contactName}</td>
                          <td className="px-4 py-3 text-sm whitespace-nowrap">{application.appliedAt}</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center">
                              <Badge variant="secondary" className={`${getStatusBadgeStyle(application.status)}`}>
                                {application.status}
                              </Badge>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-blue-600 hover:text-blue-800 flex items-center"
                              onClick={() => handleViewDetails(application)}
                            >
                              詳細
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="text-center py-8 text-gray-500">
                          該当する申請はありません
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      {/* 詳細ダイアログ */}
      {selectedApplication && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-bold text-lg">{selectedApplication.vendorName}</DialogTitle>
              <DialogDescription>
                出店申請の詳細情報
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 space-y-4">
              <div className="flex justify-between">
                <div className="text-sm">
                  <div className="font-medium text-gray-700 mb-1">出店情報</div>
                  <div className="text-gray-700">カテゴリ: {selectedApplication.category}</div>
                  <div className="text-gray-700">希望場所: {selectedApplication.locationName}</div>
                  <div className="text-gray-700">申請日: {selectedApplication.appliedAt}</div>
                </div>
                <Badge variant="secondary" className={`h-fit ${getStatusBadgeStyle(selectedApplication.status)}`}>
                  {selectedApplication.status}
                </Badge>
              </div>
              
              <div className="border-t border-gray-200 pt-3">
                <div className="font-medium text-gray-700 mb-1">担当者情報</div>
                <div className="text-gray-700">名前: {selectedApplication.contactName}</div>
                <div className="text-gray-700">メール: {selectedApplication.contactEmail}</div>
              </div>
              
              <div className="border-t border-gray-200 pt-3">
                <div className="font-medium text-gray-700 mb-1">出店内容</div>
                <div className="text-gray-700 whitespace-pre-wrap text-sm">{selectedApplication.description}</div>
              </div>

              <div className="border-t border-gray-200 pt-3">
                <label className="block font-medium text-gray-700 mb-1">管理者メモ</label>
                <textarea 
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  rows={3}
                  placeholder="メモを入力（申請者には表示されません）"
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                ></textarea>
              </div>
            </div>
            <DialogFooter className="flex justify-end space-x-2 mt-4">
              {selectedApplication.status === "申請中" && (
                <>
                  <Button variant="outline" size="sm" onClick={() => handleStatusChange(selectedApplication.id, "審査中")}>
                    審査中にする
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50" onClick={() => handleStatusChange(selectedApplication.id, "却下")}>
                    却下
                  </Button>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleStatusChange(selectedApplication.id, "承認済み")}>
                    承認
                  </Button>
                </>
              )}
              {selectedApplication.status === "審査中" && (
                <>
                  <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50" onClick={() => handleStatusChange(selectedApplication.id, "却下")}>
                    却下
                  </Button>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleStatusChange(selectedApplication.id, "承認済み")}>
                    承認
                  </Button>
                </>
              )}
              {(selectedApplication.status === "承認済み" || selectedApplication.status === "却下") && (
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