"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  CalendarClock, 
  Store, 
  Settings, 
  FileText
} from 'lucide-react';

const navItems = [
  {
    path: '/dashboard',
    name: 'ダッシュボード',
    icon: Home
  },
  {
    path: '/events',
    name: 'イベント管理',
    icon: CalendarClock
  },
  {
    path: '/vendors',
    name: '出店管理',
    icon: Store
  },
  {
    path: '/settings',
    name: '全体設定',
    icon: Settings
  },
  {
    path: '/brochure',
    name: 'パンフレット',
    icon: FileText
  }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 h-screen bg-gray-50 border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold">FesMap Admin</h1>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.path}>
                <Link 
                  href={item.path}
                  className={`flex items-center p-2 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-gray-100 text-gray-900' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200">
        <div className="text-sm text-gray-500">
          FesMap Admin v0.1.0
        </div>
      </div>
    </div>
  );
} 