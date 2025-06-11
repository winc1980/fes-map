"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Utensils, Music, Gift } from "lucide-react";
import Script from "next/script";
import { MainLayout } from "@/components/layouts/main-layout";

export default function MapPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInitializedRef = useRef(false);
  const [isClient, setIsClient] = useState(false);

  // クライアントサイドでのみレンダリングされるようにする
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Leafletが読み込まれた後にマップを初期化する関数
  const initializeMap = useCallback(() => {
    if (!isClient || !mapRef.current || mapInitializedRef.current || !window.L)
      return;

    mapInitializedRef.current = true;

    try {
      // 東京ビッグサイトの座標
      const map = window.L.map(mapRef.current).setView([35.6298, 139.7962], 16);

      window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // サンプルのマーカーを追加
      const mainStageIcon = window.L.divIcon({
        html: `<div class="bg-red-500 text-white p-1 rounded-full flex items-center justify-center" style="width: 30px; height: 30px;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12"/><circle cx="17" cy="7" r="5"/></svg></div>`,
        className: "",
      });

      const foodIcon = window.L.divIcon({
        html: `<div class="bg-yellow-500 text-white p-1 rounded-full flex items-center justify-center" style="width: 30px; height: 30px;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2"/><path d="M18 15V2"/><path d="M21 15a3 3 0 1 1-6 0"/></svg></div>`,
        className: "",
      });

      const shopIcon = window.L.divIcon({
        html: `<div class="bg-green-500 text-white p-1 rounded-full flex items-center justify-center" style="width: 30px; height: 30px;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg></div>`,
        className: "",
      });

      // マーカーを追加
      window.L.marker([35.6298, 139.7962], { icon: mainStageIcon })
        .addTo(map)
        .bindPopup("メインステージ");
      window.L.marker([35.6305, 139.7975], { icon: foodIcon })
        .addTo(map)
        .bindPopup("フードエリア");
      window.L.marker([35.629, 139.795], { icon: shopIcon })
        .addTo(map)
        .bindPopup("グッズショップ");
    } catch (error) {
      console.error("マップの初期化に失敗しました:", error);
    }
  }, [isClient, mapRef, mapInitializedRef]);

  // Leafletスクリプトが読み込まれたときのコールバック
  const handleLeafletLoad = () => {
    initializeMap();
  };

  // コンポーネントがマウントされたときにマップを初期化
  useEffect(() => {
    // window.Lが既に存在する場合は直接初期化
    if (isClient && window.L) {
      initializeMap();
    }

    return () => {
      // クリーンアップ処理
      if (isClient && mapInitializedRef.current && window.L && mapRef.current) {
        const currentMapRef = mapRef.current;
        // マップのインスタンスを取得できれば削除
        try {
          const mapInstance = window.L.DomUtil.get(currentMapRef);
          if (mapInstance) {
            mapInstance.remove();
          }
        } catch (e) {
          console.error("マップのクリーンアップに失敗しました:", e);
        }
      }
    };
  }, [isClient, initializeMap]);

  return (
    <MainLayout title="マップ">
      {isClient && (
        <>
          {/* Leaflet CSS */}
          <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
            integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
            crossOrigin=""
          />

          {/* Leaflet JS */}
          <Script
            src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
            integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
            crossOrigin=""
            onLoad={handleLeafletLoad}
          />
        </>
      )}

      <Tabs defaultValue="map" className="mb-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="map">マップ</TabsTrigger>
          <TabsTrigger value="list">リスト</TabsTrigger>
        </TabsList>
        <TabsContent value="map">
          <Card>
            <CardContent className="p-0">
              <div ref={mapRef} className="h-[60vh] w-full"></div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>会場案内</CardTitle>
              <CardDescription>イベント会場の主要スポット</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-red-100 p-2 text-red-500">
                    <Music className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">メインステージ</h3>
                    <p className="text-sm text-muted-foreground">
                      主要なパフォーマンスが行われるエリアです。
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-yellow-100 p-2 text-yellow-500">
                    <Utensils className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">フードエリア</h3>
                    <p className="text-sm text-muted-foreground">
                      様々な飲食店が出店しているエリアです。
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-green-100 p-2 text-green-500">
                    <Gift className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">グッズショップ</h3>
                    <p className="text-sm text-muted-foreground">
                      オフィシャルグッズを購入できるエリアです。
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-blue-100 p-2 text-blue-500">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">休憩エリア</h3>
                    <p className="text-sm text-muted-foreground">
                      ゆっくり休憩できるスペースです。
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}
