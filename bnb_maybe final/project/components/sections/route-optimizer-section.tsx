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
import { MapContainer } from '@/components/maps/map-container';
import { Route, Share, Download, Navigation } from 'lucide-react';

const deliveryStaff = [
  {
    id: 1,
    name: 'Raj Kumar',
    vehicle: 'Bike - DL 8C 1234',
    route: 'Route A',
    orders: 8,
    status: 'active',
    estimatedTime: '2.5 hrs',
  },
  {
    id: 2,
    name: 'Amit Singh',
    vehicle: 'Bike - DL 9B 5678',
    route: 'Route B',
    orders: 6,
    status: 'active',
    estimatedTime: '2.0 hrs',
  },
  {
    id: 3,
    name: 'Suresh Yadav',
    vehicle: 'Car - DL 7A 9012',
    route: 'Route C',
    orders: 12,
    status: 'active',
    estimatedTime: '3.0 hrs',
  },
];

export function RouteOptimizerSection() {
  const [optimizedRoute, setOptimizedRoute] = useState(false);

  const handleOptimizeRoute = () => {
    setOptimizedRoute(true);
    // Simulate route optimization
    setTimeout(() => {
      alert('Route optimized! Estimated time saved: 45 minutes');
    }, 1000);
  };

  const handleExportRoute = (format: string) => {
    alert(`Exporting route to ${format}...`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Route Optimizer</h1>
          <p className="text-gray-600">Optimize delivery routes for maximum efficiency</p>
        </div>
        <Button onClick={handleOptimizeRoute} className="bg-green-600 hover:bg-green-700">
          <Route className="h-4 w-4 mr-2" />
          Calculate Most Efficient Route
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map View */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              <span>Delivery Map</span>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" onClick={() => handleExportRoute('Google Maps')}>
                  <Navigation className="h-4 w-4 mr-1" />
                  Google Maps
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleExportRoute('WhatsApp')}>
                  <Share className="h-4 w-4 mr-1" />
                  WhatsApp
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleExportRoute('Download')}>
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MapContainer optimizedRoute={optimizedRoute} />
          </CardContent>
        </Card>

        {/* Delivery Staff Assignment */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Delivery Staff Assignment</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Staff</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Est. Time</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deliveryStaff.map((staff) => (
                  <TableRow key={staff.id}>
                    <TableCell className="font-medium">{staff.name}</TableCell>
                    <TableCell className="text-sm">{staff.vehicle}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{staff.route}</Badge>
                    </TableCell>
                    <TableCell>{staff.orders}</TableCell>
                    <TableCell>{staff.estimatedTime}</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">
                        {staff.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Route Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Route Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <h3 className="text-2xl font-bold text-blue-600">26</h3>
              <p className="text-sm text-blue-800">Total Orders</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <h3 className="text-2xl font-bold text-green-600">7.5 hrs</h3>
              <p className="text-sm text-green-800">Total Time</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <h3 className="text-2xl font-bold text-orange-600">45 km</h3>
              <p className="text-sm text-orange-800">Total Distance</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <h3 className="text-2xl font-bold text-purple-600">₹340</h3>
              <p className="text-sm text-purple-800">Fuel Cost</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}