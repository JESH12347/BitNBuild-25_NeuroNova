'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Calendar, Plus, ChefHat } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const mealPlans = {
  Monday: [
    { name: 'Rajma Rice', type: 'lunch', price: '₹120', available: true },
    { name: 'Palak Paneer', type: 'dinner', price: '₹140', available: true }
  ],
  Tuesday: [
    { name: 'Chole Bhature', type: 'lunch', price: '₹110', available: true },
    { name: 'Dal Makhani', type: 'dinner', price: '₹130', available: true }
  ],
  Wednesday: [
    { name: 'Biryani Special', type: 'lunch', price: '₹180', available: true },
    { name: 'Aloo Gobi', type: 'dinner', price: '₹100', available: true }
  ],
  Thursday: [
    { name: 'Butter Chicken', type: 'lunch', price: '₹160', available: true },
    { name: 'Vegetable Curry', type: 'dinner', price: '₹120', available: true }
  ],
  Friday: [
    { name: 'Fish Curry', type: 'lunch', price: '₹150', available: true },
    { name: 'Paneer Tikka', type: 'dinner', price: '₹140', available: true }
  ],
  Saturday: [
    { name: 'Weekend Special Thali', type: 'lunch', price: '₹200', available: true },
    { name: 'South Indian Combo', type: 'dinner', price: '₹130', available: true }
  ],
  Sunday: [
    { name: 'Family Feast', type: 'lunch', price: '₹220', available: true },
    { name: 'Light Dinner', type: 'dinner', price: '₹90', available: true }
  ]
};

export function MenuPlannerSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Menu Planner</h1>
          <p className="text-sm text-gray-600 mt-1">Plan and manage weekly meal offerings</p>
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Special Meal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Special Meal</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="dishName">Dish Name</Label>
                <Input id="dishName" placeholder="Enter dish name" />
              </div>
              <div>
                <Label htmlFor="price">Price</Label>
                <Input id="price" placeholder="₹0" />
              </div>
              <div>
                <Label htmlFor="quantity">Limited Quantity</Label>
                <Input id="quantity" type="number" placeholder="50" />
              </div>
              <Button className="w-full">Add Special Meal</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Weekly Meal Calendar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
            {weekDays.map((day, index) => (
              <motion.div
                key={day}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border rounded-2xl p-4 hover:shadow-md transition-all duration-200"
              >
                <h3 className="font-semibold text-gray-900 mb-3 text-center">
                  {day}
                </h3>
                <div className="space-y-3">
                  {mealPlans[day as keyof typeof mealPlans]?.map((meal, mealIndex) => (
                    <div
                      key={mealIndex}
                      className="p-3 bg-gray-50 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <ChefHat className="h-4 w-4 text-indigo-600" />
                        <Badge variant={meal.type === 'lunch' ? 'default' : 'secondary'}>
                          {meal.type}
                        </Badge>
                      </div>
                      <h4 className="font-medium text-sm text-gray-900 mb-1">
                        {meal.name}
                      </h4>
                      <p className="text-xs text-gray-600">{meal.price}</p>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3">
                  <Plus className="h-3 w-3 mr-1" />
                  Add Meal
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Smart Customization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-xl">
                <span className="text-sm font-medium">Vegan Options</span>
                <Badge className="bg-emerald-100 text-emerald-800">12 dishes</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl">
                <span className="text-sm font-medium">Low Calorie</span>
                <Badge className="bg-blue-100 text-blue-800">8 dishes</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-xl">
                <span className="text-sm font-medium">Gluten Free</span>
                <Badge className="bg-orange-100 text-orange-800">6 dishes</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Popular Dishes This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Biryani Special</span>
                <span className="text-sm font-medium text-emerald-600">247 orders</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Butter Chicken</span>
                <span className="text-sm font-medium text-emerald-600">186 orders</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Dal Makhani</span>
                <span className="text-sm font-medium text-emerald-600">154 orders</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}