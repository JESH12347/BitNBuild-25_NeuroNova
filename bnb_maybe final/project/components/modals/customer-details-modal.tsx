'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { User, Phone, Mail, CreditCard, Calendar, Pause, Play, X, RotateCcw } from 'lucide-react';

interface CustomerDetailsModalProps {
  customer: any;
  isOpen: boolean;
  onClose: () => void;
}

const paymentHistory = [
  { date: '2024-01-15', amount: '₹12,500', status: 'paid', method: 'UPI' },
  { date: '2023-12-15', amount: '₹12,500', status: 'paid', method: 'Bank Transfer' },
  { date: '2023-11-15', amount: '₹12,500', status: 'paid', method: 'UPI' },
];

export function CustomerDetailsModal({ customer, isOpen, onClose }: CustomerDetailsModalProps) {
  if (!customer) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Customer Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Customer Profile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Profile Information</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span>{customer.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span>{customer.contact}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span>{customer.email}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Subscription Details</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Plan:</span>
                  <Badge variant="outline">{customer.plan}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Meals/Week:</span>
                  <span>{customer.mealsPerWeek}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Next Billing:</span>
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {customer.nextBilling}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Spent:</span>
                  <span className="font-semibold">{customer.totalSpent}</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Subscription Controls */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Subscription Controls</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <Button size="sm" variant="outline">
                <Pause className="h-4 w-4 mr-1" />
                Pause
              </Button>
              <Button size="sm" variant="outline">
                <Play className="h-4 w-4 mr-1" />
                Resume
              </Button>
              <Button size="sm" variant="outline">
                <RotateCcw className="h-4 w-4 mr-1" />
                Extend
              </Button>
              <Button size="sm" variant="outline">
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
            </div>
          </div>

          <Separator />

          {/* Options */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <Button size="sm" variant="outline">
                Skip Days
              </Button>
              <Button size="sm" variant="outline">
                Swap Dishes
              </Button>
            </div>
          </div>

          <Separator />

          {/* Payment History */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Payment History</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentHistory.map((payment, index) => (
                  <TableRow key={index}>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell className="font-medium">{payment.amount}</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{payment.method}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}