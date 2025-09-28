'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CustomerDetailsModal } from '@/components/modals/customer-details-modal';
import { Eye, Pause, Play, X, Users, CreditCard, Clock, TriangleAlert as AlertTriangle } from 'lucide-react';

const customers = [
  {
    id: 1,
    name: 'Acme Corp',
    contact: '+91 98765 43210',
    email: 'admin@acmecorp.com',
    plan: 'Premium',
    status: 'active',
    mealsPerWeek: 25,
    nextBilling: '2024-02-15',
    totalSpent: '₹45,000',
  },
  {
    id: 2,
    name: 'Tech Solutions',
    contact: '+91 87654 32109',
    email: 'orders@techsol.com',
    plan: 'Standard',
    status: 'paused',
    mealsPerWeek: 15,
    nextBilling: '2024-02-20',
    totalSpent: '₹28,000',
  },
  {
    id: 3,
    name: 'Design Studio',
    contact: '+91 76543 21098',
    email: 'lunch@designstudio.com',
    plan: 'Basic',
    status: 'active',
    mealsPerWeek: 8,
    nextBilling: '2024-02-18',
    totalSpent: '₹15,000',
  },
];

const pendingPayments = [
  { id: 1, customer: 'Marketing Hub', amount: '₹12,500', dueDate: '2024-01-30', overdue: true },
  { id: 2, customer: 'Business Center', amount: '₹8,200', dueDate: '2024-02-05', overdue: false },
];

const statusConfig = {
  active: { label: 'Active', color: 'bg-green-100 text-green-800' },
  paused: { label: 'Paused', color: 'bg-orange-100 text-orange-800' },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-800' },
};

export function CustomersSection() {
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [autoRenew, setAutoRenew] = useState(true);

  const handleStatusChange = (customerId: number, newStatus: string) => {
    console.log(`Changing customer ${customerId} status to ${newStatus}`);
  };

  const handleMarkAsPaid = (paymentId: number) => {
    console.log(`Marking payment ${paymentId} as paid`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customers & Billing</h1>
          <p className="text-gray-600">Manage customer subscriptions and billing</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Subscribers</p>
                <p className="text-2xl font-bold text-gray-900">28</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Paused Count</p>
                <p className="text-2xl font-bold text-gray-900">5</p>
              </div>
              <Pause className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Duration</p>
                <p className="text-2xl font-bold text-gray-900">8.5 mo</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Churn Risk</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Table */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Customer List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Next Billing</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-gray-500">{customer.contact}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{customer.plan}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusConfig[customer.status as keyof typeof statusConfig].color}>
                        {statusConfig[customer.status as keyof typeof statusConfig].label}
                      </Badge>
                    </TableCell>
                    <TableCell>{customer.nextBilling}</TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedCustomer(customer)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {customer.status === 'active' ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatusChange(customer.id, 'paused')}
                          >
                            <Pause className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatusChange(customer.id, 'active')}
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusChange(customer.id, 'cancelled')}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Automation Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Automation Panel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Auto-renew Subscriptions</h4>
                <p className="text-sm text-gray-500">Automatically renew active subscriptions</p>
              </div>
              <Switch checked={autoRenew} onCheckedChange={setAutoRenew} />
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Send Payment Reminders</h4>
              <div className="space-y-2">
                <Button size="sm" variant="outline" className="w-full">
                  Send WhatsApp Reminder
                </Button>
                <Button size="sm" variant="outline" className="w-full">
                  Send Email Reminder
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Pending Payments</h4>
              <div className="space-y-2">
                {pendingPayments.map((payment) => (
                  <div key={payment.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-sm">{payment.customer}</p>
                      {payment.overdue && (
                        <Badge className="bg-red-100 text-red-800 text-xs">Overdue</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{payment.amount}</p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full text-xs"
                      onClick={() => handleMarkAsPaid(payment.id)}
                    >
                      Mark as Paid
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <CustomerDetailsModal
        customer={selectedCustomer}
        isOpen={!!selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
      />
    </div>
  );
}