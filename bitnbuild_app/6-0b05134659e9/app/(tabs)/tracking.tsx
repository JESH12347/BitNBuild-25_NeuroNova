
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity,
  Animated,
  Dimensions 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors, buttonStyles } from '../../styles/commonStyles';
import Icon from '../../components/Icon';
import Button from '../../components/Button';

const { width, height } = Dimensions.get('window');

interface DeliveryStep {
  id: string;
  title: string;
  description: string;
  time: string;
  status: 'completed' | 'current' | 'pending';
  icon: string;
}

const MapPlaceholder: React.FC = () => {
  return (
    <View style={{
      height: 300,
      backgroundColor: colors.backgroundAlt,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    }}>
      <Icon name="map" size={48} color={colors.textLight} />
      <Text style={[commonStyles.text, { marginTop: 12, textAlign: 'center' }]}>
        Live Map Tracking
      </Text>
      <Text style={[commonStyles.textLight, { textAlign: 'center', marginTop: 4 }]}>
        react-native-maps is not supported in Natively web environment.
        {'\n'}On mobile devices, you would see a live map with delivery tracking.
      </Text>
    </View>
  );
};

const DeliveryProgress: React.FC<{ steps: DeliveryStep[] }> = ({ steps }) => {
  return (
    <View style={commonStyles.card}>
      <Text style={[commonStyles.subtitle, { marginBottom: 20 }]}>
        Delivery Progress
      </Text>
      
      {steps.map((step, index) => (
        <View key={step.id} style={{ marginBottom: index === steps.length - 1 ? 0 : 20 }}>
          <View style={commonStyles.flexRow}>
            {/* Timeline indicator */}
            <View style={{ alignItems: 'center', marginRight: 16 }}>
              <View style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: step.status === 'completed' ? colors.success :
                                step.status === 'current' ? colors.primary : colors.border,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Icon 
                  name={step.status === 'completed' ? 'checkmark' : step.icon as any}
                  size={16} 
                  color={step.status === 'pending' ? colors.textLight : 'white'} 
                />
              </View>
              
              {index < steps.length - 1 && (
                <View style={{
                  width: 2,
                  height: 40,
                  backgroundColor: step.status === 'completed' ? colors.success : colors.border,
                  marginTop: 8,
                }} />
              )}
            </View>
            
            {/* Step content */}
            <View style={{ flex: 1 }}>
              <View style={[commonStyles.row, { marginBottom: 4 }]}>
                <Text style={[
                  commonStyles.text,
                  { 
                    fontWeight: '600',
                    color: step.status === 'current' ? colors.primary : colors.text
                  }
                ]}>
                  {step.title}
                </Text>
                <Text style={[
                  commonStyles.textLight,
                  { fontSize: 12, color: step.status === 'current' ? colors.primary : colors.textLight }
                ]}>
                  {step.time}
                </Text>
              </View>
              
              <Text style={[
                commonStyles.textLight,
                { color: step.status === 'current' ? colors.text : colors.textLight }
              ]}>
                {step.description}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const RouteVisualization: React.FC = () => {
  const deliveryStops = [
    { id: '1', address: 'Kitchen - Koramangala', eta: 'Departed', status: 'completed' },
    { id: '2', address: 'Stop 1 - Indiranagar', eta: '12:15 PM', status: 'completed' },
    { id: '3', address: 'Stop 2 - Whitefield', eta: '12:30 PM', status: 'current' },
    { id: '4', address: 'Your Location - HSR Layout', eta: '12:45 PM', status: 'pending' },
    { id: '5', address: 'Stop 4 - Electronic City', eta: '1:00 PM', status: 'pending' },
  ];

  return (
    <View style={commonStyles.card}>
      <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>
        Optimized Route
      </Text>
      
      <Text style={[commonStyles.textLight, { marginBottom: 20 }]}>
        AI-powered route optimization for efficient multi-stop delivery
      </Text>
      
      {deliveryStops.map((stop, index) => (
        <View key={stop.id} style={[commonStyles.row, { marginBottom: 16 }]}>
          <View style={{
            width: 24,
            height: 24,
            borderRadius: 12,
            backgroundColor: stop.status === 'completed' ? colors.success :
                            stop.status === 'current' ? colors.primary : colors.border,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 12,
          }}>
            <Text style={{
              color: stop.status === 'pending' ? colors.textLight : 'white',
              fontSize: 12,
              fontWeight: '600',
            }}>
              {index + 1}
            </Text>
          </View>
          
          <View style={{ flex: 1 }}>
            <Text style={[
              commonStyles.text,
              { 
                fontWeight: '600',
                color: stop.status === 'current' ? colors.primary : colors.text
              }
            ]}>
              {stop.address}
            </Text>
            <Text style={[
              commonStyles.textLight,
              { fontSize: 12, color: stop.status === 'current' ? colors.primary : colors.textLight }
            ]}>
              ETA: {stop.eta}
            </Text>
          </View>
          
          {stop.status === 'current' && (
            <View style={{
              backgroundColor: colors.primary,
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 8,
            }}>
              <Text style={{ color: 'white', fontSize: 10, fontWeight: '600' }}>
                En Route
              </Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

export default function TrackingScreen() {
  const [currentOrder, setCurrentOrder] = useState({
    id: 'ORD-12345',
    status: 'out_for_delivery',
    estimatedTime: '12:45 PM',
    deliveryPerson: {
      name: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      rating: 4.8,
    }
  });

  const deliverySteps: DeliveryStep[] = [
    {
      id: '1',
      title: 'Order Confirmed',
      description: 'Your meal is being prepared',
      time: '11:30 AM',
      status: 'completed',
      icon: 'checkmark-circle'
    },
    {
      id: '2',
      title: 'Meal Prepared',
      description: 'Fresh meal ready for pickup',
      time: '12:00 PM',
      status: 'completed',
      icon: 'restaurant'
    },
    {
      id: '3',
      title: 'Out for Delivery',
      description: 'Rajesh is on the way to your location',
      time: '12:15 PM',
      status: 'current',
      icon: 'car'
    },
    {
      id: '4',
      title: 'Delivered',
      description: 'Enjoy your fresh meal!',
      time: '12:45 PM',
      status: 'pending',
      icon: 'home'
    }
  ];

  const handleCallDeliveryPerson = () => {
    console.log('Calling delivery person:', currentOrder.deliveryPerson.phone);
    // In a real app, this would initiate a phone call
  };

  const handleChatDeliveryPerson = () => {
    console.log('Opening chat with delivery person');
    // In a real app, this would open a chat interface
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[commonStyles.paddingHorizontal, commonStyles.paddingVertical]}>
          <Text style={commonStyles.title}>Track Your Order</Text>
          <Text style={commonStyles.textLight}>Order #{currentOrder.id}</Text>
        </View>

        {/* ETA Card */}
        <View style={[commonStyles.paddingHorizontal, { marginBottom: 24 }]}>
          <View style={[commonStyles.card, { backgroundColor: colors.primary }]}>
            <View style={[commonStyles.row, { marginBottom: 16 }]}>
              <View>
                <Text style={[commonStyles.textLight, { color: 'rgba(255,255,255,0.9)' }]}>
                  Estimated Arrival
                </Text>
                <Text style={[commonStyles.title, { color: 'white', fontSize: 32 }]}>
                  {currentOrder.estimatedTime}
                </Text>
              </View>
              <View style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                padding: 16,
                borderRadius: 12,
              }}>
                <Icon name="time" size={32} color="white" />
              </View>
            </View>
            
            <View style={[commonStyles.row, { alignItems: 'flex-start' }]}>
              <View style={{ flex: 1 }}>
                <Text style={[commonStyles.text, { color: 'white', fontWeight: '600' }]}>
                  {currentOrder.deliveryPerson.name}
                </Text>
                <Text style={[commonStyles.textLight, { color: 'rgba(255,255,255,0.9)' }]}>
                  Your delivery partner
                </Text>
              </View>
              <View style={commonStyles.flexRow}>
                <Icon name="star" size={16} color="white" />
                <Text style={[commonStyles.text, { color: 'white', marginLeft: 4, fontWeight: '600' }]}>
                  {currentOrder.deliveryPerson.rating}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Map Section */}
        <View style={[commonStyles.paddingHorizontal, { marginBottom: 24 }]}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>
            Live Tracking
          </Text>
          <MapPlaceholder />
        </View>

        {/* Contact Delivery Person */}
        <View style={[commonStyles.paddingHorizontal, { marginBottom: 24 }]}>
          <View style={commonStyles.row}>
            <TouchableOpacity 
              style={[buttonStyles.outline, { flex: 1, marginRight: 8 }]}
              onPress={handleCallDeliveryPerson}
            >
              <View style={[commonStyles.flexRow, commonStyles.center]}>
                <Icon name="call" size={16} color={colors.primary} />
                <Text style={[commonStyles.text, { color: colors.primary, fontWeight: '600', marginLeft: 8 }]}>
                  Call
                </Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[buttonStyles.primary, { flex: 1, marginLeft: 8 }]}
              onPress={handleChatDeliveryPerson}
            >
              <View style={[commonStyles.flexRow, commonStyles.center]}>
                <Icon name="chatbubble" size={16} color="white" />
                <Text style={[commonStyles.text, { color: 'white', fontWeight: '600', marginLeft: 8 }]}>
                  Chat
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Delivery Progress */}
        <View style={[commonStyles.paddingHorizontal, { marginBottom: 24 }]}>
          <DeliveryProgress steps={deliverySteps} />
        </View>

        {/* Route Visualization */}
        <View style={[commonStyles.paddingHorizontal, { marginBottom: 40 }]}>
          <RouteVisualization />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
