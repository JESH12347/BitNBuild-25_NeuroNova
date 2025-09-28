'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Plus, Save } from 'lucide-react';
import { AddMealModal } from '@/components/modals/add-meal-modal';
import { format, startOfWeek, addDays } from 'date-fns';

const meals = [
  { id: 1, name: 'Dal Rice', type: 'lunch', calories: 450 },
  { id: 2, name: 'Chole Bhature', type: 'lunch', calories: 520 },
  { id: 3, name: 'South Indian Thali', type: 'lunch', calories: 480 },
  { id: 4, name: 'Biryani', type: 'lunch', calories: 550 },
  { id: 5, name: 'Rajma Chawal', type: 'lunch', calories: 420 },
];

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export function MenuPlannerSection() {
  const [weeklyMenu, setWeeklyMenu] = useState<Record<string, any>>({});
  const [isAddMealOpen, setIsAddMealOpen] = useState(false);
  const [currentWeek] = useState(new Date());

  const handleDragStart = (e: React.DragEvent, meal: any) => {
    e.dataTransfer.setData('meal', JSON.stringify(meal));
  };

  const handleDrop = (e: React.DragEvent, day: string) => {
    e.preventDefault();
    const meal = JSON.parse(e.dataTransfer.getData('meal'));
    setWeeklyMenu(prev => ({
      ...prev,
      [day]: meal
    }));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const getWeekDate = (dayIndex: number) => {
    const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
    return format(addDays(weekStart, dayIndex), 'MMM dd');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Menu Planner</h1>
          <p className="text-gray-600">Plan your weekly menu by dragging meals to calendar slots</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => setIsAddMealOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Special Meal
          </Button>
          <Button variant="outline">
            <Save className="h-4 w-4 mr-2" />
            Save & Publish Menu
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Available Meals */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Available Meals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {meals.map((meal) => (
                <div
                  key={meal.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, meal)}
                  className="p-3 bg-gray-50 rounded-lg cursor-move hover:bg-gray-100 transition-colors"
                >
                  <h4 className="font-medium">{meal.name}</h4>
                  <div className="flex items-center justify-between mt-1">
                    <Badge variant="secondary">{meal.type}</Badge>
                    <span className="text-xs text-gray-500">{meal.calories} cal</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Calendar */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Weekly Menu Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-4">
              {weekDays.map((day, index) => (
                <div key={day} className="space-y-2">
                  <div className="text-center">
                    <h3 className="font-medium text-gray-900">{day}</h3>
                    <p className="text-sm text-gray-500">{getWeekDate(index)}</p>
                  </div>
                  <div
                    onDrop={(e) => handleDrop(e, day)}
                    onDragOver={handleDragOver}
                    className="min-h-32 p-3 border-2 border-dashed border-gray-200 rounded-lg hover:border-indigo-300 transition-colors"
                  >
                    {weeklyMenu[day] ? (
                      <div className="p-2 bg-indigo-50 rounded border border-indigo-200">
                        <h4 className="font-medium text-indigo-900">{weeklyMenu[day].name}</h4>
                        <p className="text-xs text-indigo-600">{weeklyMenu[day].calories} cal</p>
                      </div>
                    ) : (
                      <div className="text-center text-gray-400 text-sm">
                        Drop meal here
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <AddMealModal
        isOpen={isAddMealOpen}
        onClose={() => setIsAddMealOpen(false)}
      />
    </div>
  );
}