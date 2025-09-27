'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

const ordersData = [
  { id: '#OD-2024-001', customer: 'Rahul Sharma', items: 3, status: 'cooking', time: '10:30 AM', total: '₹450' },
  { id: '#OD-2024-002', customer: 'Priya Patel', items: 2, status: 'packing', time: '10:25 AM', total: '₹320' },
  { id: '#OD-2024-003', customer: 'Amit Singh', items: 4, status: 'delivery', time: '10:15 AM', total: '₹580' },
  { id: '#OD-2024-004', customer: 'Sneha Reddy', items: 1, status: 'cooking', time: '10:35 AM', total: '₹180' },
  { id: '#OD-2024-005', customer: 'Vikash Kumar', items: 3, status: 'packing', time: '10:20 AM', total: '₹420' },
];

const statusColors = {
  cooking: 'bg-orange-100 text-orange-800',
  packing: 'bg-blue-100 text-blue-800',
  delivery: 'bg-emerald-100 text-emerald-800',
};

const statusLabels = {
  cooking: 'Cooking',
  packing: 'Packing',
  delivery: 'Out for Delivery',
};

export function OrdersTable() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-gray-900">
          Live Orders
        </CardTitle>
        <Button variant="outline" size="sm">
          View All Orders
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Order ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Customer</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Items</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Time</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Total</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Action</th>
              </tr>
            </thead>
            <tbody>
              {ordersData.map((order, index) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4 font-medium text-sm">{order.id}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{order.customer}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{order.items} items</td>
                  <td className="py-3 px-4">
                    <Badge className={statusColors[order.status as keyof typeof statusColors]}>
                      {statusLabels[order.status as keyof typeof statusLabels]}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{order.time}</td>
                  <td className="py-3 px-4 font-medium text-sm">{order.total}</td>
                  <td className="py-3 px-4">
                    <Button variant="ghost" size="sm">
                      <Eye size={16} />
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}