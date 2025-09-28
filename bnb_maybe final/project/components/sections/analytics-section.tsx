'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, Users, TriangleAlert as AlertTriangle, Target } from 'lucide-react';

const subscriberGrowthData = [
  { month: 'Jan', subscribers: 120 },
  { month: 'Feb', subscribers: 145 },
  { month: 'Mar', subscribers: 180 },
  { month: 'Apr', subscribers: 220 },
  { month: 'May', subscribers: 280 },
  { month: 'Jun', subscribers: 340 },
];

const topSellingDishes = [
  { rank: 1, dish: 'Dal Rice', orders: 1250, profit: '₹45,000' },
  { rank: 2, dish: 'Biryani', orders: 980, profit: '₹52,000' },
  { rank: 3, dish: 'Chole Bhature', orders: 850, profit: '₹38,000' },
  { rank: 4, dish: 'South Indian Thali', orders: 720, profit: '₹42,000' },
  { rank: 5, dish: 'Rajma Chawal', orders: 650, profit: '₹28,000' },
];

export function AnalyticsSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600">Insights and performance metrics</p>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Subscribers</p>
                <p className="text-2xl font-bold text-gray-900">340</p>
                <p className="text-sm text-green-600">+12.5% from last month</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-2xl">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₹2.8L</p>
                <p className="text-sm text-green-600">+18.2% from last month</p>
              </div>
              <div className="p-3 bg-green-50 rounded-2xl">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">At Risk Customers</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-sm text-orange-600">Churn prediction</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-2xl">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Order Value</p>
                <p className="text-2xl font-bold text-gray-900">₹185</p>
                <p className="text-sm text-green-600">+5.8% from last month</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-2xl">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subscriber Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Subscriber Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={subscriberGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="subscribers" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Competitor Benchmarking */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Competitor Benchmarking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-green-900">Market Position</h4>
                  <p className="text-sm text-green-700">#2 in local market</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Leading</Badge>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-blue-900">Pricing Strategy</h4>
                  <p className="text-sm text-blue-700">15% below premium competitors</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800">Competitive</Badge>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-orange-900">Customer Satisfaction</h4>
                  <p className="text-sm text-orange-700">4.2/5 vs industry 3.8/5</p>
                </div>
                <Badge className="bg-orange-100 text-orange-800">Above Average</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Selling Dishes Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Top-Selling Dishes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Dish</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Profit</TableHead>
                <TableHead>Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topSellingDishes.map((dish) => (
                <TableRow key={dish.rank}>
                  <TableCell>
                    <Badge variant="outline">#{dish.rank}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{dish.dish}</TableCell>
                  <TableCell>{dish.orders.toLocaleString()}</TableCell>
                  <TableCell className="font-medium text-green-600">{dish.profit}</TableCell>
                  <TableCell>
                    <div className="flex items-center text-green-600">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span className="text-sm">+8.5%</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}