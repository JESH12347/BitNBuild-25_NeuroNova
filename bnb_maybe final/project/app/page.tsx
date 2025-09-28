'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Sidebar } from '@/components/layout/sidebar';
import { DashboardSection } from '@/components/sections/dashboard-section';
import { MenuPlannerSection } from '@/components/sections/menu-planner-section';
import { RouteOptimizerSection } from '@/components/sections/route-optimizer-section';
import { AnalyticsSection } from '@/components/sections/analytics-section';
import { CustomersSection } from '@/components/sections/customers-section';
import { StaffSection } from '@/components/sections/staff-section';
import { SettingsSection } from '@/components/sections/settings-section';

export default function Home() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardSection />;
      case 'menu-planner':
        return <MenuPlannerSection />;
      case 'route-optimizer':
        return <RouteOptimizerSection />;
      case 'analytics':
        return <AnalyticsSection />;
      case 'customers':
        return <CustomersSection />;
      case 'staff':
        return <StaffSection />;
      case 'settings':
        return <SettingsSection />;
      default:
        return <DashboardSection />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            {renderActiveSection()}
          </div>
        </main>
      </div>
    </div>
  );
}