"use client"

import { useState, useEffect, useRef } from "react"
import { Html5Qrcode } from "html5-qrcode"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { QrCode, X } from "lucide-react"
import { MainLayout } from "@/components/layouts/main-layout"

export default function QRScannerPage() {
  const [scanning, setScanning] = useState(false)
  const [scanResult, setScanResult] = useState<string | null>(null)
  const [points, setPoints] = useState<number | null>(null)
  const [isClient, setIsClient] = useState(false)
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null)

  // クライアントサイドでのみレンダリングされるようにする
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient || !scanning) return

    const startScanner = async () => {
      try {
        if (!document.getElementById("reader")) return

        html5QrCodeRef.current = new Html5Qrcode("reader")
        await html5QrCodeRef.current.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          (decodedText) => {
            handleScanSuccess(decodedText)
            if (html5QrCodeRef.current) {
              html5QrCodeRef.current.stop()
              setScanning(false)
            }
          },
          () => {},
        )
      } catch (err) {
        console.error("QRコードスキャナーの起動に失敗しました:", err)
        setScanning(false)
      }
    }

    startScanner()

    return () => {
      if (html5QrCodeRef.current) {
        html5QrCodeRef.current.stop().catch((err) => console.error("QRコードスキャナーの停止に失敗しました:", err))
      }
    }
  }, [scanning, isClient])

  const handleScanSuccess = (decodedText: string) => {
    setScanResult(decodedText)
    // ポイント獲得のシミュレーション
    const earnedPoints = Math.floor(Math.random() * 100) + 10
    setPoints(earnedPoints)
  }

  const handleStartScan = () => {
    setScanResult(null)
    setPoints(null)
    setScanning(true)
  }

  const handleReset = () => {
    setScanResult(null)
    setPoints(null)
    setScanning(false)
  }

  if (!isClient) {
    return (
      <MainLayout title="QRコードスキャナー">
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>読み込み中...</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center p-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
          </CardContent>
        </Card>
      </MainLayout>
    )
  }

  return (
    <MainLayout title="QRコードスキャナー">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>QRコードをスキャン</CardTitle>
          <CardDescription>イベント会場内のQRコードをスキャンしてポイントを獲得しましょう</CardDescription>
        </CardHeader>
        <CardContent>
          {!scanning && !scanResult ? (
            <div className="flex flex-col items-center">
              <QrCode className="mb-4 h-24 w-24 text-muted-foreground" />
              <Button onClick={handleStartScan}>スキャンを開始</Button>
            </div>
          ) : scanResult ? (
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-lg bg-green-100 p-4 text-green-800">
                <p className="mb-2 font-bold">スキャン成功！</p>
                <p className="mb-4">{scanResult}</p>
                {points && (
                  <div className="rounded-full bg-yellow-100 px-4 py-2 text-xl font-bold text-yellow-800">
                    +{points} ポイント獲得！
                  </div>
                )}
              </div>
              <Button onClick={handleReset} variant="outline">
                <X className="mr-2 h-4 w-4" />
                リセット
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div id="reader" className="w-full max-w-xs"></div>
              <Button onClick={() => setScanning(false)} variant="outline" className="mt-4">
                キャンセル
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </MainLayout>
  )
}
