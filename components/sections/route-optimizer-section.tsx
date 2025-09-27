'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { MapPin, Navigation, Clock, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const deliveryStaff = [
  { id: 1, name: 'Rajesh Kumar', vehicle: 'Bike', status: 'active', orders: 8, eta: '45 min' },
  { id: 2, name: 'Amit Singh', vehicle: 'Scooter', status: 'active', orders: 6, eta: '32 min' },
  { id: 3, name: 'Priya Sharma', vehicle: 'Bike', status: 'break', orders: 0, eta: '-' },
  { id: 4, name: 'Vikash Yadav', vehicle: 'Car', status: 'active', orders: 12, eta: '58 min' },
];

const deliveryPins = [
  { id: 1, address: 'Koramangala 4th Block', orders: 3, priority: 'high' },
  { id: 2, address: 'HSR Layout Sector 2', orders: 5, priority: 'medium' },
  { id: 3, address: 'BTM Layout Stage 1', orders: 2, priority: 'low' },
  { id: 4, address: 'Jayanagar 9th Block', orders: 4, priority: 'high' },
  { id: 5, address: 'Banashankari Stage 2', orders: 3, priority: 'medium' },
];

export function RouteOptimizerSection() {
  const [optimizedRoute, setOptimizedRoute] = useState(false);

  const handleOptimizeRoute = () => {
    setOptimizedRoute(true);
    // Simulate route optimization
    setTimeout(() => {
      setOptimizedRoute(false);
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Route Optimizer</h1>
          <p className="text-sm text-gray-600 mt-1">Optimize delivery routes for maximum efficiency</p>
        </div>
        <Button 
          onClick={handleOptimizeRoute}
          className="bg-emerald-600 hover:bg-emerald-700"
          disabled={optimizedRoute}
        >
          <Navigation className="h-4 w-4 mr-2" />
          {optimizedRoute ? 'Optimizing...' : 'Calculate Optimal Route'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Delivery Map
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-gray-100 rounded-2xl flex items-center justify-center relative overflow-hidden">
                {/* Mock Map Interface */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-emerald-50">
                  {/* Simulated delivery pins */}
                  {deliveryPins.map((pin, index) => (
                    <motion.div
                      key={pin.id}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.2 }}
                      className={`absolute w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                        pin.priority === 'high' 
                          ? 'bg-red-500' 
                          : pin.priority === 'medium' 
                          ? 'bg-yellow-500' 
                          : 'bg-green-500'
                      }`}
                      style={{
                        top: `${20 + index * 15}%`,
                        left: `${15 + index * 12}%`
                      }}
                    >
                      {pin.orders}
                    </motion.div>
                  ))}
                  
                  {optimizedRoute && (
                    <motion.div
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2 }}
                      className="absolute inset-0"
                    >
                      {/* Simulated route line */}
                      <svg className="w-full h-full">
                        <path
                          d="M 60 80 Q 150 60 240 120 Q 300 160 360 200"
                          stroke="#4f46e5"
                          strokeWidth="3"
                          fill="none"
                          strokeDasharray="5,5"
                        />
                      </svg>
                    </motion.div>
                  )}
                </div>
                
                {!optimizedRoute && (
                  <div className="text-center z-10">
                    <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">Click "Calculate Optimal Route" to view delivery map</p>
                  </div>
                )}
              </div>
              
              {optimizedRoute && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-emerald-50 rounded-xl"
                >
                  <p className="text-emerald-800 font-medium">Route Optimized!</p>
                  <p className="text-emerald-600 text-sm mt-1">
                    Total distance reduced by 23%. Estimated time savings: 1.2 hours
                  </p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Delivery Areas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {deliveryPins.map((pin, index) => (
                  <motion.div
                    key={pin.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex justify-between items-center p-3 border rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-sm">{pin.address}</p>
                      <p className="text-xs text-gray-600">{pin.orders} orders</p>
                    </div>
                    <Badge 
                      variant={
                        pin.priority === 'high' ? 'destructive' : 
                        pin.priority === 'medium' ? 'default' : 'secondary'
                      }
                    >
                      {pin.priority}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Delivery Staff</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {deliveryStaff.map((staff, index) => (
                  <motion.div
                    key={staff.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 border rounded-xl"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-indigo-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{staff.name}</p>
                        <p className="text-xs text-gray-600">{staff.vehicle}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={staff.status === 'active' ? 'default' : 'secondary'}
                        className="mb-1"
                      >
                        {staff.status}
                      </Badge>
                      <div className="flex items-center text-xs text-gray-600">
                        <Clock className="h-3 w-3 mr-1" />
                        {staff.eta}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}