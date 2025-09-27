'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Users, CreditCard, Pause, Play, Gift } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

const customers = [
  { id: 1, name: 'Rahul Sharma', plan: 'Premium', lastOrder: '2 days ago', status: 'active', amount: '₹2,400' },
  { id: 2, name: 'Priya Patel', plan: 'Basic', lastOrder: '1 day ago', status: 'active', amount: '₹1,200' },
  { id: 3, name: 'Amit Singh', plan: 'Premium', lastOrder: '5 days ago', status: 'paused', amount: '₹2,400' },
  { id: 4, name: 'Sneha Reddy', plan: 'Standard', lastOrder: '3 days ago', status: 'active', amount: '₹1,800' },
  { id: 5, name: 'Vikash Kumar', plan: 'Basic', lastOrder: '1 day ago', status: 'active', amount: '₹1,200' },
];

const billingCycles = [
  { type: 'Weekly', customers: 145, revenue: '₹1,74,000' },
  { type: 'Monthly', customers: 89, revenue: '₹2,13,600' },
  { type: 'Quarterly', customers: 23, revenue: '₹1,65,600' },
];

export function CustomersSection() {
  const [autoBilling, setAutoBilling] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers & Billing</h1>
          <p className="text-sm text-gray-600 mt-1">Manage customer subscriptions and billing</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold text-indigo-600">257</p>
              </div>
              <Users className="h-8 w-8 text-indigo-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-emerald-600">₹5,53,200</p>
              </div>
              <CreditCard className="h-8 w-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Paused Subscriptions</p>
                <p className="text-2xl font-bold text-orange-600">12</p>
              </div>
              <Pause className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Customer Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customers.map((customer, index) => (
                <motion.div
                  key={customer.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-indigo-600 font-semibold text-sm">
                        {customer.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{customer.name}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {customer.plan}
                        </Badge>
                        <span className="text-xs text-gray-600">•</span>
                        <span className="text-xs text-gray-600">{customer.lastOrder}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold text-sm">{customer.amount}</span>
                    <Button
                      variant={customer.status === 'active' ? 'outline' : 'default'}
                      size="sm"
                      className="text-xs"
                    >
                      {customer.status === 'active' ? (
                        <>
                          <Pause className="h-3 w-3 mr-1" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="h-3 w-3 mr-1" />
                          Resume
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Automated Billing
                <Switch
                  checked={autoBilling}
                  onCheckedChange={setAutoBilling}
                />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {billingCycles.map((cycle, index) => (
                  <motion.div
                    key={cycle.type}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-xl"
                  >
                    <div>
                      <p className="font-medium text-sm">{cycle.type} Billing</p>
                      <p className="text-xs text-gray-600">{cycle.customers} customers</p>
                    </div>
                    <p className="font-semibold text-emerald-600">{cycle.revenue}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Gift className="h-5 w-5 mr-2" />
                Smart Discounts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                  <p className="font-medium text-emerald-800 text-sm">Loyalty Reward</p>
                  <p className="text-emerald-600 text-xs mt-1">
                    Offer 15% discount to customers with 6+ months subscription
                  </p>
                </div>
                <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                  <p className="font-medium text-blue-800 text-sm">Win-back Campaign</p>
                  <p className="text-blue-600 text-xs mt-1">
                    20% discount for paused subscriptions to reactivate
                  </p>
                </div>
                <div className="p-3 bg-purple-50 rounded-xl border border-purple-200">
                  <p className="font-medium text-purple-800 text-sm">Referral Bonus</p>
                  <p className="text-purple-600 text-xs mt-1">
                    ₹200 credit for successful referrals
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}