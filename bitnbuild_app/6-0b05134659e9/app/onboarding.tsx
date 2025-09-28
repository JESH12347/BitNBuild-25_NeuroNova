
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity,
  Dimensions,
  Image 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import Icon from '../components/Icon';
import Button from '../components/Button';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

interface OnboardingSlide {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export default function OnboardingScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: OnboardingSlide[] = [
    {
      id: '1',
      title: 'Fresh Tiffin Delivery',
      description: 'Get homemade, fresh meals delivered to your doorstep daily. Choose from various meal plans that suit your lifestyle.',
      icon: 'restaurant',
      color: colors.primary,
    },
    {
      id: '2',
      title: 'Real-Time Tracking',
      description: 'Track your delivery in real-time with live map updates, ETA calculations, and instant notifications.',
      icon: 'location',
      color: colors.success,
    },
    {
      id: '3',
      title: 'Flexible Subscriptions',
      description: 'Customize your meal preferences, pause or skip meals anytime, and manage your subscription with ease.',
      icon: 'calendar',
      color: colors.warning,
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      handleGetStarted();
    }
  };

  const handleSkip = () => {
    handleGetStarted();
  };

  const handleGetStarted = () => {
    console.log('User completed onboarding');
    router.replace('/(tabs)');
  };

  const currentSlideData = slides[currentSlide];

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={{ flex: 1 }}>
        {/* Skip Button */}
        <View style={[commonStyles.row, commonStyles.paddingHorizontal, { paddingTop: 20 }]}>
          <View style={{ flex: 1 }} />
          <TouchableOpacity onPress={handleSkip}>
            <Text style={[commonStyles.text, { color: colors.textLight, fontWeight: '600' }]}>
              Skip
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={[commonStyles.flex1, commonStyles.center, commonStyles.paddingHorizontal]}>
          {/* Icon */}
          <View style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            backgroundColor: currentSlideData.color,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
          }}>
            <Icon name={currentSlideData.icon as any} size={60} color="white" />
          </View>

          {/* Title */}
          <Text style={[commonStyles.title, { textAlign: 'center', marginBottom: 16 }]}>
            {currentSlideData.title}
          </Text>

          {/* Description */}
          <Text style={[commonStyles.text, { textAlign: 'center', lineHeight: 24, marginBottom: 40 }]}>
            {currentSlideData.description}
          </Text>
        </View>

        {/* Bottom Section */}
        <View style={[commonStyles.paddingHorizontal, { paddingBottom: 40 }]}>
          {/* Pagination Dots */}
          <View style={[commonStyles.row, commonStyles.center, { marginBottom: 32 }]}>
            {slides.map((_, index) => (
              <View
                key={index}
                style={{
                  width: currentSlide === index ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: currentSlide === index ? colors.primary : colors.border,
                  marginHorizontal: 4,
                }}
              />
            ))}
          </View>

          {/* Action Buttons */}
          <View style={commonStyles.row}>
            {currentSlide > 0 && (
              <TouchableOpacity
                style={[buttonStyles.outline, { flex: 1, marginRight: 12 }]}
                onPress={() => setCurrentSlide(currentSlide - 1)}
              >
                <Text style={[commonStyles.text, { color: colors.primary, fontWeight: '600' }]}>
                  Back
                </Text>
              </TouchableOpacity>
            )}
            
            <Button
              text={currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
              onPress={handleNext}
              style={[buttonStyles.primary, { flex: currentSlide === 0 ? 1 : 2 }]}
              textStyle={{ color: 'white', fontWeight: '600' }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
