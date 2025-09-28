
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from './Icon';

interface NotificationBannerProps {
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

const { width } = Dimensions.get('window');

export default function NotificationBanner({
  title,
  message,
  type,
  isVisible,
  onClose,
  duration = 4000
}: NotificationBannerProps) {
  const [slideAnim] = useState(new Animated.Value(-100));

  useEffect(() => {
    if (isVisible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();

      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: -100,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };

  const getTypeConfig = () => {
    switch (type) {
      case 'success':
        return {
          backgroundColor: colors.success,
          icon: 'checkmark-circle' as const,
        };
      case 'warning':
        return {
          backgroundColor: colors.warning,
          icon: 'warning' as const,
        };
      case 'error':
        return {
          backgroundColor: colors.error,
          icon: 'close-circle' as const,
        };
      default:
        return {
          backgroundColor: colors.primary,
          icon: 'information-circle' as const,
        };
    }
  };

  const typeConfig = getTypeConfig();

  if (!isVisible) return null;

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 50,
        left: 20,
        right: 20,
        zIndex: 1000,
        transform: [{ translateY: slideAnim }],
      }}
    >
      <View
        style={[
          commonStyles.card,
          {
            backgroundColor: typeConfig.backgroundColor,
            flexDirection: 'row',
            alignItems: 'center',
            padding: 16,
          }
        ]}
      >
        <Icon name={typeConfig.icon} size={24} color="white" />
        
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={[commonStyles.text, { color: 'white', fontWeight: '600' }]}>
            {title}
          </Text>
          <Text style={[commonStyles.textLight, { color: 'rgba(255,255,255,0.9)', fontSize: 14 }]}>
            {message}
          </Text>
        </View>
        
        <TouchableOpacity onPress={handleClose} style={{ padding: 4 }}>
          <Icon name="close" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}
