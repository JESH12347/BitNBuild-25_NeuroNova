'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Users, Package, TriangleAlert as AlertTriangle, Award, Clock, TrendingDown } from 'lucide-react';

const staffRoster = [
  {
    id: 1,
    name: 'Raj Kumar',
    role: 'Delivery Executive',
    shift: 'Morning (9 AM - 2 PM)',
    status: 'active',
    performance: 92,
    deliveries: 45,
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Kitchen Staff',
    shift: 'Full Day (8 AM - 6 PM)',
    status: 'active',
    performance: 88,
    deliveries: 0,
    rating: 4.6,
  },
  {
    id: 3,
    name: 'Amit Singh',
    role: 'Delivery Executive',
    shift: 'Evening (2 PM - 8 PM)',
    status: 'active',
    performance: 95,
    deliveries: 38,
    rating: 4.9,
  },
];

const inventoryItems = [
  { item: 'Rice', current: 25, required: 50, unit: 'kg', status: 'low' },
  { item: 'Dal', current: 15, required: 30, unit: 'kg', status: 'low' },
  { item: 'Vegetables', current: 40, required: 35, unit: 'kg', status: 'good' },
  { item: 'Spices', current: 8, required: 10, unit: 'kg', status: 'medium' },
];

const wasteAlerts = [
  { item: 'Leftover Rice', quantity: '2.5 kg', date: 'Today', severity: 'medium' },
  { item: 'Expired Vegetables', quantity: '1.2 kg', date: 'Yesterday', severity: 'high' },
];

export function StaffSection() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'low': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'good': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Staff Management</h1>
          <p className="text-gray-600">Manage staff, inventory, and performance</p>
        </div>
        <Button>
          <Users className="h-4 w-4 mr-2" />
          Add Staff Member
        </Button>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Delivery Time</p>
                <p className="text-2xl font-bold text-gray-900">28 min</p>
                <p className="text-sm text-green-600">-5 min from last week</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Error Rate</p>
                <p className="text-2xl font-bold text-gray-900">2.1%</p>
                <p className="text-sm text-green-600">-0.5% from last week</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Staff Efficiency</p>
                <p className="text-2xl font-bold text-gray-900">91.7%</p>
                <p className="text-sm text-green-600">+2.3% from last week</p>
              </div>
              <Award className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Waste Reduction</p>
                <p className="text-2xl font-bold text-gray-900">15%</p>
                <p className="text-sm text-green-600">vs 18% last month</p>
              </div>
              <TrendingDown className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Staff Roster */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Staff Roster</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Rating</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {staffRoster.map((staff) => (
                  <TableRow key={staff.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{staff.name}</p>
                        <p className="text-sm text-gray-500">{staff.shift}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{staff.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{staff.performance}%</span>
                        </div>
                        <Progress value={staff.performance} className="h-2" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Award className="h-4 w-4 text-yellow-500 mr-1" />
                        <span>{staff.rating}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Inventory Tracker */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Inventory Tracker</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inventoryItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Package className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">{item.item}</p>
                      <p className="text-sm text-gray-500">
                        {item.current}/{item.required} {item.unit}
                      </p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(item.status)}>
                    {item.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Waste Reduction Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Waste Reduction Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {wasteAlerts.map((alert, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="font-medium text-orange-900">{alert.item}</p>
                    <p className="text-sm text-orange-700">{alert.quantity} wasted on {alert.date}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Review
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Staff Gamification */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Staff Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <Award className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <h3 className="font-medium text-yellow-900">On-Time Delivery Champion</h3>
              <p className="text-sm text-yellow-700">Amit Singh - 98% on-time rate</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Award className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-medium text-blue-900">Customer Favorite</h3>
              <p className="text-sm text-blue-700">Raj Kumar - 4.8/5 rating</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Award className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-medium text-green-900">Zero Waste Hero</h3>
              <p className="text-sm text-green-700">Priya Sharma - No waste this week</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}