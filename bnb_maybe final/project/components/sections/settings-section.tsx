'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Settings, Bell, CreditCard, Gift, Calendar, Fuel } from 'lucide-react';

export function SettingsSection() {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });

  const [discountSettings, setDiscountSettings] = useState({
    newCustomer: 15,
    bulk: 10,
    loyalty: 5,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Configure your NourishNet dashboard</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              General Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="businessName">Business Name</Label>
              <Input id="businessName" defaultValue="NourishNet Tiffin Service" />
            </div>
            <div>
              <Label htmlFor="businessAddress">Business Address</Label>
              <Textarea 
                id="businessAddress" 
                defaultValue="123 Food Street, Sector 18, Noida, UP 201301"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" defaultValue="+91 98765 43210" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" defaultValue="admin@nourishnet.com" />
              </div>
            </div>
            <div>
              <Label htmlFor="timezone">Timezone</Label>
              <Select defaultValue="asia-kolkata">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asia-kolkata">Asia/Kolkata (IST)</SelectItem>
                  <SelectItem value="utc">UTC</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Email Notifications</Label>
                <p className="text-sm text-gray-500">Receive order and payment updates via email</p>
              </div>
              <Switch 
                checked={notifications.email} 
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, email: checked }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>SMS Notifications</Label>
                <p className="text-sm text-gray-500">Receive urgent alerts via SMS</p>
              </div>
              <Switch 
                checked={notifications.sms} 
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, sms: checked }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Push Notifications</Label>
                <p className="text-sm text-gray-500">Browser push notifications</p>
              </div>
              <Switch 
                checked={notifications.push} 
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, push: checked }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Discount Engine */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Gift className="h-5 w-5 mr-2" />
              Discount Engine
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="newCustomer">New Customer Discount (%)</Label>
              <Input 
                id="newCustomer" 
                type="number" 
                value={discountSettings.newCustomer}
                onChange={(e) => setDiscountSettings(prev => ({ ...prev, newCustomer: parseInt(e.target.value) }))}
              />
            </div>
            <div>
              <Label htmlFor="bulk">Bulk Order Discount (%)</Label>
              <Input 
                id="bulk" 
                type="number" 
                value={discountSettings.bulk}
                onChange={(e) => setDiscountSettings(prev => ({ ...prev, bulk: parseInt(e.target.value) }))}
              />
            </div>
            <div>
              <Label htmlFor="loyalty">Loyalty Discount (%)</Label>
              <Input 
                id="loyalty" 
                type="number" 
                value={discountSettings.loyalty}
                onChange={(e) => setDiscountSettings(prev => ({ ...prev, loyalty: parseInt(e.target.value) }))}
              />
            </div>
            <Button className="w-full">
              Generate Suggested Offers
            </Button>
          </CardContent>
        </Card>

        {/* Festival Promo Creator */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Festival Promo Creator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="festivalName">Festival Name</Label>
              <Input id="festivalName" placeholder="e.g., Diwali Special" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="promoDiscount">Discount (%)</Label>
                <Input id="promoDiscount" type="number" placeholder="20" />
              </div>
              <div>
                <Label htmlFor="promoDuration">Duration (days)</Label>
                <Input id="promoDuration" type="number" placeholder="7" />
              </div>
            </div>
            <div>
              <Label htmlFor="promoDescription">Promo Description</Label>
              <Textarea 
                id="promoDescription" 
                placeholder="Celebrate Diwali with special festive meals..."
                rows={3}
              />
            </div>
            <Button className="w-full">
              Create Festival Promo
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Additional Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fuel Savings Report */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Fuel className="h-5 w-5 mr-2" />
              Fuel Savings Report
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <h3 className="text-2xl font-bold text-green-600">₹2,340</h3>
                  <p className="text-sm text-green-800">Saved This Month</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <h3 className="text-2xl font-bold text-blue-600">18%</h3>
                  <p className="text-sm text-blue-800">Efficiency Improvement</p>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                View Detailed Report
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Payment Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Payment Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Accepted Payment Methods</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge>UPI</Badge>
                <Badge>Bank Transfer</Badge>
                <Badge>Cash</Badge>
                <Badge>Credit Card</Badge>
              </div>
            </div>
            <div>
              <Label htmlFor="paymentTerms">Payment Terms (days)</Label>
              <Input id="paymentTerms" type="number" defaultValue="30" />
            </div>
            <div>
              <Label htmlFor="lateFee">Late Payment Fee (%)</Label>
              <Input id="lateFee" type="number" defaultValue="2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Settings */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline">Reset to Defaults</Button>
        <Button>Save All Settings</Button>
      </div>
    </div>
  );
}