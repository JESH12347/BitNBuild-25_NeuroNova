'use client';

import { motion } from 'framer-motion';
import { TrendingUp, ShoppingBag, UserPlus, TriangleAlert as AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const kpiData = [
  {
    title: "Today's Revenue",
    value: "₹45,230",
    change: "+12.5%",
    trend: "up",
    icon: TrendingUp,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    title: "Live Orders",
    value: "127",
    change: "8 new",
    trend: "up",
    icon: ShoppingBag,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "New Subscribers",
    value: "23",
    change: "+15.2%",
    trend: "up",
    icon: UserPlus,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
  },
  {
    title: "Issues to Address",
    value: "3",
    change: "-2 from yesterday",
    trend: "down",
    icon: AlertTriangle,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
];

export function KPICards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {kpiData.map((kpi, index) => {
        const Icon = kpi.icon;
        return (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -2 }}
          >
            <Card className="shadow-sm hover:shadow-md transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {kpi.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mb-1">
                      {kpi.value}
                    </p>
                    <p className={`text-sm font-medium ${kpi.color}`}>
                      {kpi.change}
                    </p>
                  </div>
                  <div className={`p-3 rounded-2xl ${kpi.bgColor}`}>
                    <Icon className={`h-6 w-6 ${kpi.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}