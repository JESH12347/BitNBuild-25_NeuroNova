'use client';

import { motion } from 'framer-motion';
import { TriangleAlert as AlertTriangle, Clock, Utensils } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const alerts = [
  {
    id: 1,
    type: 'urgent',
    icon: AlertTriangle,
    title: 'Low Stock Alert',
    message: 'Rice and Dal stocks are running low. Restock needed within 2 hours.',
    time: '5 mins ago',
    action: 'Order Now',
  },
  {
    id: 2,
    type: 'warning',
    icon: Clock,
    title: 'Delayed Delivery',
    message: 'Order #OD-2024-087 is running 30 minutes behind schedule.',
    time: '12 mins ago',
    action: 'Contact Driver',
  },
  {
    id: 3,
    type: 'info',
    icon: Utensils,
    title: 'Menu Update Required',
    message: 'Weekly menu for next week needs approval by 6 PM today.',
    time: '1 hour ago',
    action: 'Review Menu',
  },
];

const alertStyles = {
  urgent: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', badge: 'bg-red-100 text-red-800' },
  warning: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-800', badge: 'bg-orange-100 text-orange-800' },
  info: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', badge: 'bg-blue-100 text-blue-800' },
};

export function AlertsSection() {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Issues to Address
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert, index) => {
            const Icon = alert.icon;
            const styles = alertStyles[alert.type as keyof typeof alertStyles];
            
            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-2xl border ${styles.bg} ${styles.border}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <Icon className={`h-5 w-5 mt-0.5 ${styles.text}`} />
                    <div className="flex-1">
                      <h4 className={`font-medium ${styles.text} mb-1`}>
                        {alert.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {alert.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge className={`text-xs ${styles.badge}`}>
                          {alert.time}
                        </Badge>
                        <Button size="sm" variant="outline" className="text-xs">
                          {alert.action}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}