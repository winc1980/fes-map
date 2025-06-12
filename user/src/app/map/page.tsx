"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { MainLayout } from "@/components/layouts/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Utensils, Gift, MapPin } from "lucide-react";
// import MapboxLanguage from "@mapbox/mapbox-gl-language";
import mapboxgl from "mapbox-gl";
import type { Spot } from "@/types";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    mapboxgl: typeof mapboxgl;
  }
}

const spots: Spot[] = [
  {
    id: "main-stage",
    name: "メインステージ",
    description: "主要なパフォーマンスが行われるエリアです。",
    coordinates: [139.7202, 35.7089], // 早稲田大学近辺
    color: "#ef4444",
    icon: <Music className="h-5 w-5" />,
  },
  {
    id: "food-area",
    name: "フードエリア",
    description: "様々な飲食店が出店しているエリアです。",
    coordinates: [139.7195, 35.7095],
    color: "#f59e0b",
    icon: <Utensils className="h-5 w-5" />,
  },
  {
    id: "goods-shop",
    name: "グッズショップ",
    description: "オフィシャルグッズを購入できるエリアです。",
    coordinates: [139.721, 35.7085],
    color: "#10b981",
    icon: <Gift className="h-5 w-5" />,
  },
  {
    id: "rest-area",
    name: "休憩エリア",
    description: "ゆっくり休憩できるスペースです。",
    coordinates: [139.7188, 35.708],
    color: "#3b82f6",
    icon: <MapPin className="h-5 w-5" />,
  },
];

export default function MapPage() {
  const [activeView, setActiveView] = useState<"map" | "list">("map");
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (activeView === "map") {
      if (!map.current) {
        // 初回のマップ初期化
        const script = document.createElement("script");
        script.src = "https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.js";
        script.onload = initializeMap;
        document.head.appendChild(script);

        const link = document.createElement("link");
        link.href = "https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.css";
        link.rel = "stylesheet";
        document.head.appendChild(link);
      } else {
        // マップビューに戻った時の処理
        setTimeout(() => {
          if (map.current) {
            map.current.resize();
          }
        }, 100);
      }
    }
  }, [activeView]);

  const initializeMap = () => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [139.72, 35.7087], // 早稲田大学周辺
      zoom: 16,
    });

    // マーカーを追加
    spots.forEach((spot) => {
      // カスタムマーカー要素を作成
      const markerElement = document.createElement("div");
      markerElement.className = "custom-marker";
      markerElement.style.cssText = `
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: ${spot.color};
        border: 3px solid white;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: white;
        font-weight: bold;
        font-size: 18px;
      `;
      markerElement.innerHTML = "●";

      new mapboxgl.Marker(markerElement)
        .setLngLat(spot.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(`
              <div style="padding: 8px;">
                <h3 style="margin: 0 0 4px 0; font-weight: bold;">${spot.name}</h3>
                <p style="margin: 0; font-size: 14px; color: #666;">${spot.description}</p>
              </div>
            `)
        )
        .addTo(map.current!);
    });
  };

  return (
    <MainLayout title="マップ">
      <div className="w-full max-w-4xl mx-auto bg-white">
        {/* トグルボタン */}
        <div className="flex bg-gray-100 p-1 rounded-lg mb-4">
          <Button
            variant={activeView === "map" ? "default" : "ghost"}
            className={cn(
              "flex-1 rounded-md",
              activeView === "map" ? "bg-white shadow-sm text-gray-600" : ""
            )}
            onClick={() => setActiveView("map")}
          >
            マップ
          </Button>
          <Button
            variant={activeView === "list" ? "default" : "ghost"}
            className={cn(
              "flex-1 rounded-md",
              activeView === "list" ? "bg-white shadow-sm text-gray-600" : ""
            )}
            onClick={() => setActiveView("list")}
          >
            リスト
          </Button>
        </div>

        {/* コンテンツエリア */}
        <div className="relative">
          {activeView === "map" ? (
            <div className="w-full h-[600px] rounded-lg overflow-hidden border">
              <div ref={mapContainer} className="w-full h-full" />
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>会場案内</CardTitle>
                <p className="text-sm text-muted-foreground">
                  イベント会場の主要スポット
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {spots.map((spot) => (
                  <div
                    key={spot.id}
                    className="flex items-start gap-4 p-4 rounded-lg border"
                  >
                    <div
                      className="flex items-center justify-center w-12 h-12 rounded-full text-white"
                      style={{ backgroundColor: spot.color }}
                    >
                      {spot.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">
                        {spot.name}
                      </h3>
                      <p className="text-muted-foreground">
                        {spot.description}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
