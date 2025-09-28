'use client';

import { KPICards } from '@/components/kpi-cards';
import { AlertsSection } from '@/components/alerts-section';
import { WeeklyRevenueChart } from '@/components/charts/weekly-revenue-chart';
import { LiveOrdersTable } from '@/components/tables/live-orders-table';

export function DashboardSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
      </div>

      <KPICards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeeklyRevenueChart />
        <AlertsSection />
      </div>

      <LiveOrdersTable />
    </div>
  );
}