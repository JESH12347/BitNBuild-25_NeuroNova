'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Calendar, MapPin, ChartBar as BarChart3, Users, UserCheck, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'menu-planner', label: 'Menu Planner', icon: Calendar },
  { id: 'route-optimizer', label: 'Route Optimizer', icon: MapPin },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'customers', label: 'Customers & Billing', icon: Users },
  { id: 'staff', label: 'Staff Management', icon: UserCheck },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.div
      className={cn(
        "sticky top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 shadow-sm",
        isCollapsed ? "w-16" : "w-64"
      )}
      initial={false}
      animate={{ width: isCollapsed ? 64 : 256 }}
    >
      <div className="flex items-center justify-between p-4">
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <span className="font-bold text-gray-800">NourishNet</span>
          </motion.div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <nav className="px-3 mt-6">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={cn(
                "w-full flex items-center px-3 py-2.5 mb-1 rounded-xl text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-indigo-50 text-indigo-700 shadow-sm"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon size={18} />
              {!isCollapsed && (
                <motion.span
                  className="ml-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {item.label}
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </nav>
    </motion.div>
  );
}