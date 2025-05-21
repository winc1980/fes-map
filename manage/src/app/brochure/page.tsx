import { Download, Eye, Upload } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function BrochurePage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">パンフレット</h1>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          <Upload className="w-4 h-4" />
          <span>新規アップロード</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brochures.map((brochure) => (
          <Card key={brochure.id} className="overflow-hidden">
            <div className="aspect-[3/4] bg-gray-100 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-gray-400">プレビュー</span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium">{brochure.title}</h3>
              <p className="text-sm text-gray-500 mt-1">
                アップロード日: {brochure.uploadDate}
              </p>
              <div className="flex justify-end mt-4 gap-2">
                <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                  <Eye className="w-4 h-4" />
                  <span>プレビュー</span>
                </button>
                <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800">
                  <Download className="w-4 h-4" />
                  <span>ダウンロード</span>
                </button>
              </div>
            </div>
          </Card>
        ))}

        {brochures.length === 0 && (
          <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-500">パンフレットがアップロードされていません</p>
            <button className="mt-4 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mx-auto">
              <Upload className="w-4 h-4" />
              <span>アップロード</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const brochures = [
  {
    id: 1,
    title: '夏祭り2024公式パンフレット',
    uploadDate: '2024-05-15',
    fileUrl: '/brochures/summer-festival-2024.pdf'
  },
  {
    id: 2,
    title: '出店者向けガイドライン',
    uploadDate: '2024-05-10',
    fileUrl: '/brochures/vendor-guidelines.pdf'
  },
  {
    id: 3,
    title: 'マップ・会場案内',
    uploadDate: '2024-05-05',
    fileUrl: '/brochures/venue-map.pdf'
  }
]; 