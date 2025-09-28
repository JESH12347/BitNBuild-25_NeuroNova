'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MapPin, Phone, Clock } from 'lucide-react';

interface OrderDetailsModalProps {
  order: any;
  isOpen: boolean;
  onClose: () => void;
}

export function OrderDetailsModal({ order, isOpen, onClose }: OrderDetailsModalProps) {
  if (!order) return null;

  const statusConfig = {
    cooking: { label: 'Cooking', color: 'bg-orange-100 text-orange-800' },
    packing: { label: 'Packing', color: 'bg-blue-100 text-blue-800' },
    'out-for-delivery': { label: 'Out for Delivery', color: 'bg-green-100 text-green-800' },
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-lg">{order.id}</span>
            <Badge className={statusConfig[order.status as keyof typeof statusConfig].color}>
              {statusConfig[order.status as keyof typeof statusConfig].label}
            </Badge>
          </div>

          <Separator />

          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Customer</h4>
              <p className="text-gray-600">{order.customer}</p>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-1">Items</h4>
              <p className="text-gray-600">{order.items}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Quantity</h4>
                <p className="text-gray-600">{order.quantity} meals</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Time</h4>
                <p className="text-gray-600 flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {order.time}
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-1">Driver</h4>
              <div className="flex items-center justify-between">
                <p className="text-gray-600">{order.driver}</p>
                <Button size="sm" variant="outline">
                  <Phone className="h-4 w-4 mr-1" />
                  Call
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-1">Delivery Address</h4>
              <p className="text-gray-600 flex items-start">
                <MapPin className="h-4 w-4 mr-1 mt-0.5" />
                Office Complex, Sector 18, Noida, UP 201301
              </p>
            </div>
          </div>

          <Separator />

          <div className="flex space-x-2">
            <Button className="flex-1">Update Status</Button>
            <Button variant="outline" className="flex-1">
              Track Order
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}