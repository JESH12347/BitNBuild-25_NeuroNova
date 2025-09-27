'use client';

import { motion } from 'framer-motion';
import { UserCheck, Clock, TriangleAlert as AlertTriangle, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const staffRoster = [
  { id: 1, name: 'Ramesh Chandra', role: 'Head Chef', shift: 'Morning', status: 'active', performance: 95 },
  { id: 2, name: 'Sunita Devi', role: 'Cook', shift: 'Morning', status: 'active', performance: 88 },
  { id: 3, name: 'Rajesh Kumar', role: 'Delivery', shift: 'All Day', status: 'active', performance: 92 },
  { id: 4, name: 'Priya Sharma', role: 'Packaging', shift: 'Evening', status: 'break', performance: 85 },
  { id: 5, name: 'Amit Singh', role: 'Delivery', shift: 'Evening', status: 'active', performance: 91 },
];

const inventory = [
  { item: 'Rice', current: 85, required: 100, status: 'warning' },
  { item: 'Dal', current: 45, required: 80, status: 'critical' },
  { item: 'Vegetables', current: 92, required: 100, status: 'good' },
  { item: 'Spices', current: 78, required: 90, status: 'good' },
  { item: 'Oil', current: 35, required: 60, status: 'critical' },
];

const wasteAlerts = [
  { category: 'Food Waste', amount: '2.3kg', status: 'good', trend: 'down' },
  { category: 'Packaging Waste', amount: '1.8kg', status: 'warning', trend: 'up' },
  { category: 'Water Usage', amount: '450L', status: 'good', trend: 'down' },
];

export function StaffSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Staff Management</h1>
          <p className="text-sm text-gray-600 mt-1">Manage team performance and operations</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Staff</p>
                <p className="text-2xl font-bold text-indigo-600">24</p>
              </div>
              <UserCheck className="h-8 w-8 text-indigo-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Delivery Time</p>
                <p className="text-2xl font-bold text-emerald-600">28 min</p>
              </div>
              <Clock className="h-8 w-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Error Rate</p>
                <p className="text-2xl font-bold text-green-600">0.8%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Alerts</p>
                <p className="text-2xl font-bold text-orange-600">3</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Staff Roster</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {staffRoster.map((staff, index) => (
                <motion.div
                  key={staff.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-indigo-600 font-semibold text-sm">
                        {staff.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{staff.name}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {staff.role}
                        </Badge>
                        <span className="text-xs text-gray-600">•</span>
                        <span className="text-xs text-gray-600">{staff.shift}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <p className="text-sm font-medium">{staff.performance}%</p>
                      <Progress value={staff.performance} className="w-16 h-2" />
                    </div>
                    <Badge 
                      variant={staff.status === 'active' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {staff.status}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Inventory Tracker</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inventory.map((item, index) => (
                  <motion.div
                    key={item.item}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 border rounded-xl"
                  >
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-sm">{item.item}</span>
                        <Badge 
                          variant={
                            item.status === 'critical' ? 'destructive' : 
                            item.status === 'warning' ? 'default' : 
                            'secondary'
                          }
                          className="text-xs"
                        >
                          {item.status}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <Progress 
                          value={(item.current / item.required) * 100} 
                          className="h-2"
                        />
                        <p className="text-xs text-gray-600">
                          {item.current}kg / {item.required}kg
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Waste Reduction</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {wasteAlerts.map((waste, index) => (
                  <motion.div
                    key={waste.category}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-3 rounded-xl border ${
                      waste.status === 'good' 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-orange-50 border-orange-200'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-sm">{waste.category}</p>
                        <p className="text-xs text-gray-600">Today: {waste.amount}</p>
                      </div>
                      <Badge 
                        variant={waste.status === 'good' ? 'secondary' : 'default'}
                        className="text-xs"
                      >
                        {waste.trend === 'down' ? '↓' : '↑'} {waste.status}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}