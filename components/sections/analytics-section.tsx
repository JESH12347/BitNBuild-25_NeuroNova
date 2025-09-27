'use client';

import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, TriangleAlert as AlertTriangle, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const growthData = [
  { month: 'Jan', subscribers: 1200, churn: 45 },
  { month: 'Feb', subscribers: 1450, churn: 38 },
  { month: 'Mar', subscribers: 1680, churn: 42 },
  { month: 'Apr', subscribers: 1920, churn: 35 },
  { month: 'May', subscribers: 2150, churn: 31 },
  { month: 'Jun', subscribers: 2380, churn: 28 },
];

const topDishes = [
  { rank: 1, name: 'Biryani Special', orders: 2847, profit: '₹4,56,320' },
  { rank: 2, name: 'Butter Chicken', orders: 2156, profit: '₹3,45,280' },
  { rank: 3, name: 'Dal Makhani', orders: 1934, profit: '₹2,51,420' },
  { rank: 4, name: 'Paneer Tikka', orders: 1678, profit: '₹2,34,920' },
  { rank: 5, name: 'Fish Curry', orders: 1423, profit: '₹2,13,450' },
];

const atRiskCustomers = [
  { name: 'Rahul Sharma', plan: 'Premium', lastOrder: '15 days ago', riskScore: 85 },
  { name: 'Priya Patel', plan: 'Basic', lastOrder: '22 days ago', riskScore: 92 },
  { name: 'Amit Singh', plan: 'Premium', lastOrder: '18 days ago', riskScore: 78 },
];

export function AnalyticsSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-sm text-gray-600 mt-1">Business insights and performance metrics</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Growth Rate</p>
                <p className="text-2xl font-bold text-green-600">+18.2%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Subscribers</p>
                <p className="text-2xl font-bold text-indigo-600">2,380</p>
              </div>
              <Users className="h-8 w-8 text-indigo-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Churn Rate</p>
                <p className="text-2xl font-bold text-orange-600">2.8%</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Target Achievement</p>
                <p className="text-2xl font-bold text-emerald-600">94.5%</p>
              </div>
              <Target className="h-8 w-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Subscriber Growth Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#6b7280" />
                <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px' 
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="subscribers" 
                  stroke="#4f46e5" 
                  strokeWidth={3}
                  dot={{ fill: '#4f46e5', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Top-Selling Dishes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topDishes.map((dish, index) => (
                <motion.div
                  key={dish.rank}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 border rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className="text-xs">
                      #{dish.rank}
                    </Badge>
                    <div>
                      <p className="font-medium text-sm">{dish.name}</p>
                      <p className="text-xs text-gray-600">{dish.orders} orders</p>
                    </div>
                  </div>
                  <p className="font-semibold text-emerald-600">{dish.profit}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-red-700">Churn Prediction - At Risk Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {atRiskCustomers.map((customer, index) => (
                <motion.div
                  key={customer.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-xl"
                >
                  <div>
                    <p className="font-medium text-sm">{customer.name}</p>
                    <p className="text-xs text-gray-600">{customer.plan} • {customer.lastOrder}</p>
                  </div>
                  <Badge variant="destructive">
                    {customer.riskScore}% risk
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Competitor Benchmarking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-xl">
                <span className="font-medium">Market Share</span>
                <Badge className="bg-emerald-100 text-emerald-800">23.4%</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl">
                <span className="font-medium">Customer Satisfaction</span>
                <Badge className="bg-blue-100 text-blue-800">4.7/5</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-xl">
                <span className="font-medium">Delivery Time</span>
                <Badge className="bg-orange-100 text-orange-800">32 min avg</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-xl">
                <span className="font-medium">Price Competitiveness</span>
                <Badge className="bg-purple-100 text-purple-800">15% below avg</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}