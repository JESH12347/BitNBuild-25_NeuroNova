'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const revenueData = [
  { day: 'Mon', revenue: 42000, orders: 85 },
  { day: 'Tue', revenue: 38000, orders: 72 },
  { day: 'Wed', revenue: 51000, orders: 96 },
  { day: 'Thu', revenue: 47000, orders: 89 },
  { day: 'Fri', revenue: 55000, orders: 108 },
  { day: 'Sat', revenue: 62000, orders: 125 },
  { day: 'Sun', revenue: 45000, orders: 91 },
];

export function RevenueChart() {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Weekly Revenue Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="day" 
              tick={{ fontSize: 12 }}
              stroke="#6b7280"
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              stroke="#6b7280"
              tickFormatter={(value) => `₹${value / 1000}k`}
            />
            <Tooltip 
              formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']}
              labelStyle={{ color: '#374151' }}
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Bar 
              dataKey="revenue" 
              fill="#4f46e5"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}