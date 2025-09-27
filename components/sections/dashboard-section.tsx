'use client';

import { motion } from 'framer-motion';
import { KPICards } from '@/components/dashboard/kpi-cards';
import { RevenueChart } from '@/components/dashboard/revenue-chart';
import { OrdersTable } from '@/components/dashboard/orders-table';
import { AlertsSection } from '@/components/dashboard/alerts-section';

export function DashboardSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Command Center</h1>
        <p className="text-sm text-gray-600">
          {new Date().toLocaleDateString('en-IN', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      <KPICards />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <RevenueChart />
        </div>
        <div>
          <AlertsSection />
        </div>
      </div>

      <OrdersTable />
    </motion.div>
  );
}