
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Animated,
  Dimensions 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors, buttonStyles } from '../../styles/commonStyles';
import Icon from '../../components/Icon';
import Button from '../../components/Button';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

interface PlanCardProps {
  title: string;
  price: string;
  duration: string;
  features: string[];
  isPopular?: boolean;
  onSelect: () => void;
}

const PlanCard: React.FC<PlanCardProps> = ({ 
  title, 
  price, 
  duration, 
  features, 
  isPopular, 
  onSelect 
}) => {
  return (
    <TouchableOpacity 
      style={[
        commonStyles.card,
        { 
          marginHorizontal: 8,
          width: width * 0.8,
          borderWidth: isPopular ? 2 : 1,
          borderColor: isPopular ? colors.primary : colors.border,
        }
      ]}
      onPress={onSelect}
    >
      {isPopular && (
        <View style={{
          position: 'absolute',
          top: -10,
          right: 20,
          backgroundColor: colors.primary,
          paddingHorizontal: 12,
          paddingVertical: 4,
          borderRadius: 12,
        }}>
          <Text style={{ color: 'white', fontSize: 12, fontWeight: '600' }}>
            Most Popular
          </Text>
        </View>
      )}
      
      <View style={[commonStyles.row, { marginBottom: 16 }]}>
        <View>
          <Text style={[commonStyles.subtitle, { marginBottom: 4 }]}>{title}</Text>
          <Text style={commonStyles.textLight}>{duration}</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={[commonStyles.title, { color: colors.primary, fontSize: 24 }]}>
            ₹{price}
          </Text>
          <Text style={commonStyles.textLight}>per {duration.toLowerCase()}</Text>
        </View>
      </View>

      <View style={{ marginBottom: 20 }}>
        {features.map((feature, index) => (
          <View key={index} style={[commonStyles.flexRow, { marginBottom: 8 }]}>
            <Icon name="checkmark-circle" size={16} color={colors.success} />
            <Text style={[commonStyles.textLight, { marginLeft: 8 }]}>{feature}</Text>
          </View>
        ))}
      </View>

      <Button
        text="Select Plan"
        onPress={onSelect}
        style={[
          buttonStyles.primary,
          { backgroundColor: isPopular ? colors.primary : colors.secondary }
        ]}
        textStyle={{ color: 'white', fontWeight: '600' }}
      />
    </TouchableOpacity>
  );
};

export default function HomeScreen() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      id: 'daily',
      title: 'Daily Plan',
      price: '120',
      duration: 'Day',
      features: [
        'Fresh home-cooked meal',
        'Customizable preferences',
        'Same day delivery',
        'Cancel anytime'
      ],
    },
    {
      id: 'weekly',
      title: 'Weekly Plan',
      price: '750',
      duration: 'Week',
      features: [
        '7 fresh meals',
        'Free delivery',
        'Meal customization',
        '15% savings',
        'Skip any day'
      ],
      isPopular: true,
    },
    {
      id: 'monthly',
      title: 'Monthly Plan',
      price: '2800',
      duration: 'Month',
      features: [
        '30 fresh meals',
        'Free delivery',
        'Priority support',
        '25% savings',
        'Flexible scheduling'
      ],
    },
  ];

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    console.log('Selected plan:', planId);
    // Navigate to subscription setup
    router.push('/subscription');
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[commonStyles.paddingHorizontal, commonStyles.paddingVertical]}>
          <View style={[commonStyles.row, { marginBottom: 20 }]}>
            <View>
              <Text style={commonStyles.title}>Good Morning! 👋</Text>
              <Text style={commonStyles.textLight}>Choose your perfect meal plan</Text>
            </View>
            <TouchableOpacity 
              style={{
                backgroundColor: colors.backgroundAlt,
                padding: 12,
                borderRadius: 12,
              }}
              onPress={() => router.push('/profile')}
            >
              <Icon name="person" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          {/* Hero Section */}
          <View style={[commonStyles.card, { backgroundColor: colors.primary, marginBottom: 24 }]}>
            <View style={[commonStyles.row, { alignItems: 'flex-start' }]}>
              <View style={{ flex: 1 }}>
                <Text style={[commonStyles.subtitle, { color: 'white', marginBottom: 8 }]}>
                  Fresh Tiffin Delivery
                </Text>
                <Text style={[commonStyles.textLight, { color: 'rgba(255,255,255,0.9)' }]}>
                  Homemade meals delivered fresh to your doorstep daily
                </Text>
              </View>
              <View style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                padding: 16,
                borderRadius: 12,
              }}>
                <Icon name="restaurant" size={32} color="white" />
              </View>
            </View>
          </View>
        </View>

        {/* Subscription Plans */}
        <View style={{ marginBottom: 24 }}>
          <Text style={[commonStyles.subtitle, commonStyles.paddingHorizontal, { marginBottom: 16 }]}>
            Choose Your Plan
          </Text>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 12 }}
          >
            {plans.map((plan) => (
              <PlanCard
                key={plan.id}
                title={plan.title}
                price={plan.price}
                duration={plan.duration}
                features={plan.features}
                isPopular={plan.isPopular}
                onSelect={() => handlePlanSelect(plan.id)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Features Section */}
        <View style={[commonStyles.paddingHorizontal, { marginBottom: 24 }]}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>
            Why Choose Us?
          </Text>
          
          <View style={commonStyles.row}>
            <View style={[commonStyles.card, { flex: 1, marginRight: 8 }]}>
              <View style={[commonStyles.center, { marginBottom: 12 }]}>
                <Icon name="time" size={32} color={colors.primary} />
              </View>
              <Text style={[commonStyles.text, { textAlign: 'center', fontWeight: '600' }]}>
                On-Time Delivery
              </Text>
              <Text style={[commonStyles.textLight, { textAlign: 'center', fontSize: 12 }]}>
                Always fresh & punctual
              </Text>
            </View>
            
            <View style={[commonStyles.card, { flex: 1, marginLeft: 8 }]}>
              <View style={[commonStyles.center, { marginBottom: 12 }]}>
                <Icon name="leaf" size={32} color={colors.success} />
              </View>
              <Text style={[commonStyles.text, { textAlign: 'center', fontWeight: '600' }]}>
                Fresh Ingredients
              </Text>
              <Text style={[commonStyles.textLight, { textAlign: 'center', fontSize: 12 }]}>
                Locally sourced daily
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={[commonStyles.paddingHorizontal, { marginBottom: 40 }]}>
          <View style={commonStyles.row}>
            <TouchableOpacity 
              style={[buttonStyles.outline, { flex: 1, marginRight: 8 }]}
              onPress={() => router.push('/tracking')}
            >
              <Text style={[commonStyles.text, { color: colors.primary, fontWeight: '600' }]}>
                Track Order
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[buttonStyles.primary, { flex: 1, marginLeft: 8 }]}
              onPress={() => router.push('/subscription')}
            >
              <Text style={[commonStyles.text, { color: 'white', fontWeight: '600' }]}>
                My Subscription
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
