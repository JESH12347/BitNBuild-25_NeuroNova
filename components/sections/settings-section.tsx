'use client';

import { motion } from 'framer-motion';
import { Settings, Bell, Shield, CreditCard, Users, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function SettingsSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-sm text-gray-600 mt-1">Manage your account and preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Order Alerts</p>
                <p className="text-xs text-gray-600">Get notified about new orders</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Low Stock Warnings</p>
                <p className="text-xs text-gray-600">Inventory threshold alerts</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Delivery Updates</p>
                <p className="text-xs text-gray-600">Real-time delivery status</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Performance Reports</p>
                <p className="text-xs text-gray-600">Weekly analytics summary</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" className="mt-1" />
            </div>
            <Button className="w-full">Update Password</Button>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Billing & Plans
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold text-indigo-900">Professional Plan</p>
                  <p className="text-sm text-indigo-700">Up to 500 orders/month</p>
                </div>
                <p className="text-lg font-bold text-indigo-900">₹2,999/mo</p>
              </div>
              <p className="text-xs text-indigo-600">Next billing: January 15, 2025</p>
            </div>
            <Button variant="outline" className="w-full">
              Manage Subscription
            </Button>
            <Button variant="outline" className="w-full">
              Download Invoices
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Team Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-indigo-600 font-semibold text-xs">JD</span>
                </div>
                <div>
                  <p className="font-medium text-sm">John Doe</p>
                  <p className="text-xs text-gray-600">Admin</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Edit</Button>
            </div>
            <Button variant="outline" className="w-full">
              Invite Team Member
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="h-5 w-5 mr-2" />
              Business Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="business-name">Business Name</Label>
                <Input id="business-name" defaultValue="NourishNet Kitchen" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="contact-email">Contact Email</Label>
                <Input id="contact-email" defaultValue="admin@nourishnet.com" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" defaultValue="+91 98765 43210" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="address">Business Address</Label>
                <Input id="address" defaultValue="123 Food Street, Bangalore" className="mt-1" />
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <Button>Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}