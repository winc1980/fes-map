"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Plus, Trash2, Edit2, Save } from "lucide-react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

type LocationColumn = {
  id: number;
  name: string;
  type: string;
  isRequired: boolean;
  isEnabled: boolean;
};

export default function SettingsPage() {
  // 開催情報のステート
  const [eventName, setEventName] = useState("フェスティバル2023");
  const [startDate, setStartDate] = useState<Date | undefined>(new Date(2023, 10, 15));
  const [endDate, setEndDate] = useState<Date | undefined>(new Date(2023, 10, 16));
  const [isPublished, setIsPublished] = useState(false);
  
  // 場所テーブルのカラム
  const [columns, setColumns] = useState<LocationColumn[]>([
    { id: 1, name: "場所名", type: "テキスト", isRequired: true, isEnabled: true },
    { id: 2, name: "カテゴリ", type: "選択肢", isRequired: true, isEnabled: true },
    { id: 3, name: "サイズ", type: "選択肢", isRequired: false, isEnabled: true },
    { id: 4, name: "場所説明", type: "テキストエリア", isRequired: false, isEnabled: true },
    { id: 5, name: "利用料金", type: "数値", isRequired: false, isEnabled: true },
    { id: 6, name: "備考", type: "テキストエリア", isRequired: false, isEnabled: false },
  ]);
  
  // 新しいカラムの追加
  const [newColumn, setNewColumn] = useState({ name: "", type: "テキスト", isRequired: false });
  
  const addColumn = () => {
    if (newColumn.name) {
      setColumns([
        ...columns,
        {
          id: columns.length > 0 ? Math.max(...columns.map(c => c.id)) + 1 : 1,
          name: newColumn.name,
          type: newColumn.type,
          isRequired: newColumn.isRequired,
          isEnabled: true
        }
      ]);
      setNewColumn({ name: "", type: "テキスト", isRequired: false });
    }
  };
  
  // カラムの有効/無効切り替え
  const toggleColumnEnabled = (id: number) => {
    setColumns(columns.map(column => 
      column.id === id ? { ...column, isEnabled: !column.isEnabled } : column
    ));
  };
  
  // カラムの必須/任意切り替え
  const toggleColumnRequired = (id: number) => {
    setColumns(columns.map(column => 
      column.id === id ? { ...column, isRequired: !column.isRequired } : column
    ));
  };
  
  const saveSettings = () => {
    // ここでは単にメッセージを表示するだけ
    alert("設定が保存されました");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">全体設定</h1>
      
      <Tabs defaultValue="event" className="space-y-4">
        <TabsList>
          <TabsTrigger value="event">開催情報</TabsTrigger>
          <TabsTrigger value="database">データベース</TabsTrigger>
          <TabsTrigger value="appearance">外観</TabsTrigger>
          <TabsTrigger value="notifications">通知</TabsTrigger>
          <TabsTrigger value="advanced">詳細設定</TabsTrigger>
        </TabsList>
        
        {/* 開催情報 */}
        <TabsContent value="event" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>開催情報設定</CardTitle>
              <CardDescription>
                フェスティバルの基本情報を設定します
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid w-full gap-4">
                <div className="space-y-2">
                  <Label htmlFor="eventName">イベント名</Label>
                  <Input 
                    id="eventName" 
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    placeholder="イベント名を入力" 
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>開始日</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? (
                            format(startDate, "yyyy年MM月dd日", { locale: ja })
                          ) : (
                            <span>日付を選択</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>終了日</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? (
                            format(endDate, "yyyy年MM月dd日", { locale: ja })
                          ) : (
                            <span>日付を選択</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="published"
                    checked={isPublished}
                    onCheckedChange={setIsPublished}
                  />
                  <Label htmlFor="published">一般公開する</Label>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveSettings}>設定を保存</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* データベース設定 */}
        <TabsContent value="database" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>場所テーブル設定</CardTitle>
              <CardDescription>
                場所データベースのカラム設定を管理します
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>場所テーブルのカラム設定</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>カラム名</TableHead>
                    <TableHead>データ型</TableHead>
                    <TableHead className="text-center">必須</TableHead>
                    <TableHead className="text-center">有効</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {columns.map((column) => (
                    <TableRow key={column.id}>
                      <TableCell className="font-medium">{column.name}</TableCell>
                      <TableCell>{column.type}</TableCell>
                      <TableCell className="text-center">
                        <Switch
                          checked={column.isRequired}
                          onCheckedChange={() => toggleColumnRequired(column.id)}
                          disabled={column.id <= 2} // 場所名とカテゴリは必須固定
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch
                          checked={column.isEnabled}
                          onCheckedChange={() => toggleColumnEnabled(column.id)}
                          disabled={column.id <= 2} // 場所名とカテゴリは有効固定
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        {column.id > 2 && (
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="mt-6 border-t pt-4">
                <h3 className="text-md font-medium mb-2">新しいカラムを追加</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <Label htmlFor="columnName">カラム名</Label>
                    <Input 
                      id="columnName" 
                      value={newColumn.name}
                      onChange={(e) => setNewColumn({...newColumn, name: e.target.value})}
                      placeholder="カラム名を入力" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="columnType">データ型</Label>
                    <select 
                      id="columnType" 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      value={newColumn.type}
                      onChange={(e) => setNewColumn({...newColumn, type: e.target.value})}
                    >
                      <option value="テキスト">テキスト</option>
                      <option value="数値">数値</option>
                      <option value="選択肢">選択肢</option>
                      <option value="テキストエリア">テキストエリア</option>
                      <option value="日付">日付</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="newColumnRequired"
                        checked={newColumn.isRequired}
                        onCheckedChange={(checked) => setNewColumn({...newColumn, isRequired: checked})}
                      />
                      <Label htmlFor="newColumnRequired">必須</Label>
                    </div>
                    <Button onClick={addColumn} disabled={!newColumn.name}>
                      <Plus className="h-4 w-4 mr-2" />
                      追加
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">キャンセル</Button>
              <Button onClick={saveSettings} disabled={columns.length === 0}>
                <Save className="h-4 w-4 mr-2" />
                設定を保存
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>テーマ設定</CardTitle>
              <CardDescription>
                アプリケーションの表示設定を変更します
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex flex-col items-center gap-1">
                    <div className="h-8 w-8 rounded-full bg-primary"></div>
                    <span className="text-xs">デフォルト</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="h-8 w-8 rounded-full bg-blue-500"></div>
                    <span className="text-xs">ブルー</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="h-8 w-8 rounded-full bg-green-500"></div>
                    <span className="text-xs">グリーン</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>通知設定</CardTitle>
              <CardDescription>
                通知の受け取り方を設定します
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">メール通知</div>
                    <div className="text-sm text-muted-foreground">
                      重要な更新をメールで受け取ります
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">ブラウザ通知</div>
                    <div className="text-sm text-muted-foreground">
                      ブラウザでプッシュ通知を受け取ります
                    </div>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>詳細設定</CardTitle>
              <CardDescription>
                システムの詳細設定を変更します
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                これらの設定は上級ユーザー向けです。変更する場合は慎重に行ってください。
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 