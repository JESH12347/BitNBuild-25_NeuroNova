
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity,
  Modal,
  Dimensions 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors, buttonStyles } from '../../styles/commonStyles';
import Icon from '../../components/Icon';
import Button from '../../components/Button';
import SimpleBottomSheet from '../../components/BottomSheet';

const { width } = Dimensions.get('window');

interface CalendarDay {
  date: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  status: 'active' | 'paused' | 'skipped' | 'delivered';
}

const MealCustomizationSheet: React.FC<{
  isVisible: boolean;
  onClose: () => void;
  onSave: (preferences: any) => void;
}> = ({ isVisible, onClose, onSave }) => {
  const [mealType, setMealType] = useState('veg');
  const [spiceLevel, setSpiceLevel] = useState('medium');
  const [portionSize, setPortionSize] = useState('regular');

  const handleSave = () => {
    onSave({ mealType, spiceLevel, portionSize });
    onClose();
  };

  return (
    <SimpleBottomSheet isVisible={isVisible} onClose={onClose}>
      <View style={{ padding: 20 }}>
        <Text style={[commonStyles.subtitle, { marginBottom: 20 }]}>
          Customize Your Meal
        </Text>

        {/* Meal Type */}
        <View style={{ marginBottom: 24 }}>
          <Text style={[commonStyles.text, { marginBottom: 12, fontWeight: '600' }]}>
            Meal Type
          </Text>
          <View style={commonStyles.flexRow}>
            {['veg', 'non-veg', 'vegan'].map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  {
                    flex: 1,
                    padding: 12,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: mealType === type ? colors.primary : colors.border,
                    backgroundColor: mealType === type ? colors.primary : 'transparent',
                    marginHorizontal: 4,
                  }
                ]}
                onPress={() => setMealType(type)}
              >
                <Text style={[
                  commonStyles.textLight,
                  { 
                    textAlign: 'center',
                    color: mealType === type ? 'white' : colors.text,
                    fontWeight: mealType === type ? '600' : '400'
                  }
                ]}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Spice Level */}
        <View style={{ marginBottom: 24 }}>
          <Text style={[commonStyles.text, { marginBottom: 12, fontWeight: '600' }]}>
            Spice Level
          </Text>
          <View style={commonStyles.flexRow}>
            {['mild', 'medium', 'spicy'].map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  {
                    flex: 1,
                    padding: 12,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: spiceLevel === level ? colors.primary : colors.border,
                    backgroundColor: spiceLevel === level ? colors.primary : 'transparent',
                    marginHorizontal: 4,
                  }
                ]}
                onPress={() => setSpiceLevel(level)}
              >
                <Text style={[
                  commonStyles.textLight,
                  { 
                    textAlign: 'center',
                    color: spiceLevel === level ? 'white' : colors.text,
                    fontWeight: spiceLevel === level ? '600' : '400'
                  }
                ]}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Portion Size */}
        <View style={{ marginBottom: 32 }}>
          <Text style={[commonStyles.text, { marginBottom: 12, fontWeight: '600' }]}>
            Portion Size
          </Text>
          <View style={commonStyles.flexRow}>
            {['small', 'regular', 'large'].map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  {
                    flex: 1,
                    padding: 12,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: portionSize === size ? colors.primary : colors.border,
                    backgroundColor: portionSize === size ? colors.primary : 'transparent',
                    marginHorizontal: 4,
                  }
                ]}
                onPress={() => setPortionSize(size)}
              >
                <Text style={[
                  commonStyles.textLight,
                  { 
                    textAlign: 'center',
                    color: portionSize === size ? 'white' : colors.text,
                    fontWeight: portionSize === size ? '600' : '400'
                  }
                ]}>
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Button
          text="Save Preferences"
          onPress={handleSave}
          style={buttonStyles.primary}
          textStyle={{ color: 'white', fontWeight: '600' }}
        />
      </View>
    </SimpleBottomSheet>
  );
};

export default function SubscriptionScreen() {
  const [showCustomization, setShowCustomization] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  // Mock subscription data
  const subscription = {
    plan: 'Weekly Plan',
    status: 'Active',
    nextDelivery: 'Tomorrow, 12:30 PM',
    mealsRemaining: 5,
    preferences: {
      mealType: 'veg',
      spiceLevel: 'medium',
      portionSize: 'regular'
    }
  };

  const generateCalendar = () => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const calendar: CalendarDay[] = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      calendar.push({
        date: 0,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        status: 'active'
      });
    }
    
    // Add days of the current month
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = today.getDate() === day && 
                     today.getMonth() === currentMonth && 
                     today.getFullYear() === currentYear;
      
      // Mock status for demonstration
      let status: 'active' | 'paused' | 'skipped' | 'delivered' = 'active';
      if (day < today.getDate() && currentMonth === today.getMonth()) {
        status = Math.random() > 0.7 ? 'skipped' : 'delivered';
      }
      
      calendar.push({
        date: day,
        isCurrentMonth: true,
        isToday,
        isSelected: selectedDate === day,
        status
      });
    }
    
    return calendar;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return colors.success;
      case 'skipped': return colors.warning;
      case 'paused': return colors.textLight;
      default: return colors.primary;
    }
  };

  const handleDatePress = (day: CalendarDay) => {
    if (day.isCurrentMonth && day.date > 0) {
      setSelectedDate(day.date);
      console.log('Selected date:', day.date);
    }
  };

  const handleCustomizationSave = (preferences: any) => {
    console.log('Saved preferences:', preferences);
    // Here you would typically save to your backend
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[commonStyles.paddingHorizontal, commonStyles.paddingVertical]}>
          <Text style={commonStyles.title}>My Subscription</Text>
          <Text style={commonStyles.textLight}>Manage your meal plan</Text>
        </View>

        {/* Current Plan Status */}
        <View style={[commonStyles.paddingHorizontal, { marginBottom: 24 }]}>
          <View style={[commonStyles.card, { backgroundColor: colors.primary }]}>
            <View style={[commonStyles.row, { marginBottom: 16 }]}>
              <View>
                <Text style={[commonStyles.subtitle, { color: 'white' }]}>
                  {subscription.plan}
                </Text>
                <Text style={[commonStyles.textLight, { color: 'rgba(255,255,255,0.9)' }]}>
                  Status: {subscription.status}
                </Text>
              </View>
              <View style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                padding: 12,
                borderRadius: 12,
              }}>
                <Icon name="checkmark-circle" size={24} color="white" />
              </View>
            </View>
            
            <View style={[commonStyles.row, { marginBottom: 16 }]}>
              <View>
                <Text style={[commonStyles.textLight, { color: 'rgba(255,255,255,0.9)' }]}>
                  Next Delivery
                </Text>
                <Text style={[commonStyles.text, { color: 'white', fontWeight: '600' }]}>
                  {subscription.nextDelivery}
                </Text>
              </View>
              <View>
                <Text style={[commonStyles.textLight, { color: 'rgba(255,255,255,0.9)' }]}>
                  Meals Left
                </Text>
                <Text style={[commonStyles.text, { color: 'white', fontWeight: '600' }]}>
                  {subscription.mealsRemaining}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={[commonStyles.paddingHorizontal, { marginBottom: 24 }]}>
          <View style={commonStyles.row}>
            <TouchableOpacity 
              style={[commonStyles.card, { flex: 1, marginRight: 8 }]}
              onPress={() => setShowCustomization(true)}
            >
              <View style={[commonStyles.center, { marginBottom: 8 }]}>
                <Icon name="restaurant" size={24} color={colors.primary} />
              </View>
              <Text style={[commonStyles.textLight, { textAlign: 'center', fontSize: 12 }]}>
                Customize Meal
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[commonStyles.card, { flex: 1, marginHorizontal: 4 }]}>
              <View style={[commonStyles.center, { marginBottom: 8 }]}>
                <Icon name="pause" size={24} color={colors.warning} />
              </View>
              <Text style={[commonStyles.textLight, { textAlign: 'center', fontSize: 12 }]}>
                Pause Plan
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[commonStyles.card, { flex: 1, marginLeft: 8 }]}>
              <View style={[commonStyles.center, { marginBottom: 8 }]}>
                <Icon name="card" size={24} color={colors.success} />
              </View>
              <Text style={[commonStyles.textLight, { textAlign: 'center', fontSize: 12 }]}>
                Billing
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Calendar */}
        <View style={[commonStyles.paddingHorizontal, { marginBottom: 24 }]}>
          <View style={[commonStyles.row, { marginBottom: 16 }]}>
            <Text style={commonStyles.subtitle}>Meal Calendar</Text>
            <View style={commonStyles.flexRow}>
              <TouchableOpacity 
                onPress={() => {
                  if (currentMonth === 0) {
                    setCurrentMonth(11);
                    setCurrentYear(currentYear - 1);
                  } else {
                    setCurrentMonth(currentMonth - 1);
                  }
                }}
                style={{ padding: 8 }}
              >
                <Icon name="chevron-back" size={20} color={colors.text} />
              </TouchableOpacity>
              
              <Text style={[commonStyles.text, { marginHorizontal: 16, fontWeight: '600' }]}>
                {monthNames[currentMonth]} {currentYear}
              </Text>
              
              <TouchableOpacity 
                onPress={() => {
                  if (currentMonth === 11) {
                    setCurrentMonth(0);
                    setCurrentYear(currentYear + 1);
                  } else {
                    setCurrentMonth(currentMonth + 1);
                  }
                }}
                style={{ padding: 8 }}
              >
                <Icon name="chevron-forward" size={20} color={colors.text} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={commonStyles.card}>
            {/* Day headers */}
            <View style={[commonStyles.row, { marginBottom: 8 }]}>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <View key={day} style={{ flex: 1, alignItems: 'center' }}>
                  <Text style={[commonStyles.textLight, { fontSize: 12, fontWeight: '600' }]}>
                    {day}
                  </Text>
                </View>
              ))}
            </View>

            {/* Calendar grid */}
            <View>
              {Array.from({ length: Math.ceil(generateCalendar().length / 7) }, (_, weekIndex) => (
                <View key={weekIndex} style={[commonStyles.row, { marginBottom: 4 }]}>
                  {generateCalendar().slice(weekIndex * 7, (weekIndex + 1) * 7).map((day, dayIndex) => (
                    <TouchableOpacity
                      key={dayIndex}
                      style={{
                        flex: 1,
                        aspectRatio: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 8,
                        backgroundColor: day.isSelected ? colors.primary : 
                                       day.isToday ? colors.backgroundAlt : 'transparent',
                        margin: 2,
                      }}
                      onPress={() => handleDatePress(day)}
                      disabled={!day.isCurrentMonth || day.date === 0}
                    >
                      {day.date > 0 && (
                        <>
                          <Text style={[
                            commonStyles.textLight,
                            {
                              color: day.isSelected ? 'white' : 
                                     day.isToday ? colors.primary : colors.text,
                              fontWeight: day.isToday || day.isSelected ? '600' : '400',
                              fontSize: 14,
                            }
                          ]}>
                            {day.date}
                          </Text>
                          {day.isCurrentMonth && (
                            <View style={{
                              width: 6,
                              height: 6,
                              borderRadius: 3,
                              backgroundColor: getStatusColor(day.status),
                              marginTop: 2,
                            }} />
                          )}
                        </>
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
            </View>

            {/* Legend */}
            <View style={[commonStyles.row, { marginTop: 16, justifyContent: 'space-around' }]}>
              <View style={commonStyles.flexRow}>
                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: colors.success, marginRight: 4 }} />
                <Text style={[commonStyles.textLight, { fontSize: 10 }]}>Delivered</Text>
              </View>
              <View style={commonStyles.flexRow}>
                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: colors.warning, marginRight: 4 }} />
                <Text style={[commonStyles.textLight, { fontSize: 10 }]}>Skipped</Text>
              </View>
              <View style={commonStyles.flexRow}>
                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary, marginRight: 4 }} />
                <Text style={[commonStyles.textLight, { fontSize: 10 }]}>Scheduled</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Current Preferences */}
        <View style={[commonStyles.paddingHorizontal, { marginBottom: 40 }]}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>
            Current Preferences
          </Text>
          
          <View style={commonStyles.card}>
            <View style={[commonStyles.row, { marginBottom: 12 }]}>
              <Text style={commonStyles.textLight}>Meal Type:</Text>
              <Text style={[commonStyles.text, { fontWeight: '600', textTransform: 'capitalize' }]}>
                {subscription.preferences.mealType}
              </Text>
            </View>
            
            <View style={[commonStyles.row, { marginBottom: 12 }]}>
              <Text style={commonStyles.textLight}>Spice Level:</Text>
              <Text style={[commonStyles.text, { fontWeight: '600', textTransform: 'capitalize' }]}>
                {subscription.preferences.spiceLevel}
              </Text>
            </View>
            
            <View style={commonStyles.row}>
              <Text style={commonStyles.textLight}>Portion Size:</Text>
              <Text style={[commonStyles.text, { fontWeight: '600', textTransform: 'capitalize' }]}>
                {subscription.preferences.portionSize}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <MealCustomizationSheet
        isVisible={showCustomization}
        onClose={() => setShowCustomization(false)}
        onSave={handleCustomizationSave}
      />
    </SafeAreaView>
  );
}
