'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { OrderDetailsModal } from '@/components/modals/order-details-modal';
import { Eye } from 'lucide-react';

const orders = [
  {
    id: 'OD-2024-001',
    customer: 'Acme Corp',
    items: 'Dal Rice, Sabzi, Roti',
    quantity: 25,
    status: 'cooking',
    time: '11:30 AM',
    driver: 'Raj Kumar',
  },
  {
    id: 'OD-2024-002',
    customer: 'Tech Solutions',
    items: 'Biryani, Raita, Pickle',
    quantity: 15,
    status: 'packing',
    time: '12:00 PM',
    driver: 'Amit Singh',
  },
  {
    id: 'OD-2024-003',
    customer: 'Design Studio',
    items: 'Chole Bhature, Lassi',
    quantity: 8,
    status: 'out-for-delivery',
    time: '12:15 PM',
    driver: 'Suresh Yadav',
  },
  {
    id: 'OD-2024-004',
    customer: 'Marketing Hub',
    items: 'South Indian Thali',
    quantity: 12,
    status: 'cooking',
    time: '12:30 PM',
    driver: 'Vikash Kumar',
  },
];

const statusConfig = {
  cooking: { label: 'Cooking', color: 'bg-orange-100 text-orange-800' },
  packing: { label: 'Packing', color: 'bg-blue-100 text-blue-800' },
  'out-for-delivery': { label: 'Out for Delivery', color: 'bg-green-100 text-green-800' },
};

export function LiveOrdersTable() {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  return (
    <>
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Live Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>
                    <Badge className={statusConfig[order.status as keyof typeof statusConfig].color}>
                      {statusConfig[order.status as keyof typeof statusConfig].label}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.time}</TableCell>
                  <TableCell>{order.driver}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <OrderDetailsModal
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </>
  );
}