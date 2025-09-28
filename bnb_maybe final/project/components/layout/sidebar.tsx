'use client';

import { motion } from 'framer-motion';
import { LayoutDashboard, Calendar, Route, ChartBar as BarChart3, Users, UserCog, Settings, ChefHat } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    id: 'menu-planner',
    label: 'Menu Planner',
    icon: ChefHat,
  },
  {
    id: 'route-optimizer',
    label: 'Route Optimizer',
    icon: Route,
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
  },
  {
    id: 'customers',
    label: 'Customers & Billing',
    icon: Users,
  },
  {
    id: 'staff',
    label: 'Staff Management',
    icon: UserCog,
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
  },
];

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <ChefHat className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">NourishNet</span>
        </div>
      </div>

      <nav className="flex-1 px-4 pb-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <li key={item.id}>
                <motion.button
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSectionChange(item.id)}
                  className={cn(
                    'w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200',
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}