
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity,
  Switch 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors, buttonStyles } from '../../styles/commonStyles';
import Icon from '../../components/Icon';
import Button from '../../components/Button';
import SimpleBottomSheet from '../../components/BottomSheet';

interface PaymentMethod {
  id: string;
  type: 'upi' | 'card' | 'wallet';
  name: string;
  details: string;
  isDefault: boolean;
}

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  plan: string;
}

const PaymentMethodsSheet: React.FC<{
  isVisible: boolean;
  onClose: () => void;
  paymentMethods: PaymentMethod[];
  onAddPayment: () => void;
}> = ({ isVisible, onClose, paymentMethods, onAddPayment }) => {
  return (
    <SimpleBottomSheet isVisible={isVisible} onClose={onClose}>
      <View style={{ padding: 20 }}>
        <Text style={[commonStyles.subtitle, { marginBottom: 20 }]}>
          Payment Methods
        </Text>

        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={[
              commonStyles.card,
              { 
                marginBottom: 12,
                borderWidth: method.isDefault ? 2 : 1,
                borderColor: method.isDefault ? colors.primary : colors.border
              }
            ]}
          >
            <View style={[commonStyles.row, { alignItems: 'center' }]}>
              <View style={{
                backgroundColor: colors.backgroundAlt,
                padding: 12,
                borderRadius: 12,
                marginRight: 16,
              }}>
                <Icon 
                  name={method.type === 'upi' ? 'phone-portrait' : 
                        method.type === 'card' ? 'card' : 'wallet'} 
                  size={20} 
                  color={colors.primary} 
                />
              </View>
              
              <View style={{ flex: 1 }}>
                <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                  {method.name}
                </Text>
                <Text style={commonStyles.textLight}>
                  {method.details}
                </Text>
              </View>
              
              {method.isDefault && (
                <View style={{
                  backgroundColor: colors.primary,
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 8,
                }}>
                  <Text style={{ color: 'white', fontSize: 10, fontWeight: '600' }}>
                    Default
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}

        <Button
          text="Add Payment Method"
          onPress={onAddPayment}
          style={[buttonStyles.outline, { marginTop: 16 }]}
          textStyle={{ color: colors.primary, fontWeight: '600' }}
        />
      </View>
    </SimpleBottomSheet>
  );
};

const InvoicesSheet: React.FC<{
  isVisible: boolean;
  onClose: () => void;
  invoices: Invoice[];
}> = ({ isVisible, onClose, invoices }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return colors.success;
      case 'pending': return colors.warning;
      case 'failed': return colors.error;
      default: return colors.textLight;
    }
  };

  return (
    <SimpleBottomSheet isVisible={isVisible} onClose={onClose}>
      <View style={{ padding: 20 }}>
        <Text style={[commonStyles.subtitle, { marginBottom: 20 }]}>
          Billing History
        </Text>

        {invoices.map((invoice) => (
          <View key={invoice.id} style={[commonStyles.card, { marginBottom: 12 }]}>
            <View style={[commonStyles.row, { marginBottom: 8 }]}>
              <View>
                <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                  {invoice.plan}
                </Text>
                <Text style={commonStyles.textLight}>
                  {invoice.date}
                </Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                  ₹{invoice.amount}
                </Text>
                <View style={{
                  backgroundColor: getStatusColor(invoice.status),
                  paddingHorizontal: 8,
                  paddingVertical: 2,
                  borderRadius: 8,
                  marginTop: 4,
                }}>
                  <Text style={{ 
                    color: 'white', 
                    fontSize: 10, 
                    fontWeight: '600',
                    textTransform: 'capitalize'
                  }}>
                    {invoice.status}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    </SimpleBottomSheet>
  );
};

export default function ProfileScreen() {
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [showInvoices, setShowInvoices] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);

  // Mock user data
  const user = {
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 98765 43210',
    address: '123, HSR Layout, Bangalore - 560102',
    memberSince: 'January 2024'
  };

  const paymentMethods: PaymentMethod[] = [
    {
      id: '1',
      type: 'upi',
      name: 'Google Pay',
      details: 'priya@okaxis',
      isDefault: true
    },
    {
      id: '2',
      type: 'card',
      name: 'HDFC Credit Card',
      details: '**** **** **** 1234',
      isDefault: false
    },
    {
      id: '3',
      type: 'wallet',
      name: 'Paytm Wallet',
      details: 'Balance: ₹1,250',
      isDefault: false
    }
  ];

  const invoices: Invoice[] = [
    {
      id: 'INV-001',
      date: 'Dec 15, 2024',
      amount: 750,
      status: 'paid',
      plan: 'Weekly Plan'
    },
    {
      id: 'INV-002',
      date: 'Dec 8, 2024',
      amount: 750,
      status: 'paid',
      plan: 'Weekly Plan'
    },
    {
      id: 'INV-003',
      date: 'Dec 1, 2024',
      amount: 750,
      status: 'paid',
      plan: 'Weekly Plan'
    },
    {
      id: 'INV-004',
      date: 'Nov 24, 2024',
      amount: 750,
      status: 'failed',
      plan: 'Weekly Plan'
    }
  ];

  const handleAddPaymentMethod = () => {
    console.log('Adding new payment method');
    setShowPaymentMethods(false);
    // In a real app, this would navigate to payment method setup
  };

  const handleLogout = () => {
    console.log('User logging out');
    // In a real app, this would handle logout logic
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[commonStyles.paddingHorizontal, commonStyles.paddingVertical]}>
          <Text style={commonStyles.title}>Profile</Text>
          <Text style={commonStyles.textLight}>Manage your account</Text>
        </View>

        {/* User Info Card */}
        <View style={[commonStyles.paddingHorizontal, { marginBottom: 24 }]}>
          <View style={[commonStyles.card, { backgroundColor: colors.primary }]}>
            <View style={[commonStyles.row, { marginBottom: 16 }]}>
              <View style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                padding: 16,
                borderRadius: 20,
                marginRight: 16,
              }}>
                <Icon name="person" size={32} color="white" />
              </View>
              
              <View style={{ flex: 1 }}>
                <Text style={[commonStyles.subtitle, { color: 'white', marginBottom: 4 }]}>
                  {user.name}
                </Text>
                <Text style={[commonStyles.textLight, { color: 'rgba(255,255,255,0.9)' }]}>
                  Member since {user.memberSince}
                </Text>
              </View>
            </View>
            
            <View style={{ marginBottom: 8 }}>
              <Text style={[commonStyles.textLight, { color: 'rgba(255,255,255,0.9)' }]}>
                Email: {user.email}
              </Text>
            </View>
            
            <Text style={[commonStyles.textLight, { color: 'rgba(255,255,255,0.9)' }]}>
              Phone: {user.phone}
            </Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={[commonStyles.paddingHorizontal, { marginBottom: 24 }]}>
          <View style={commonStyles.row}>
            <View style={[commonStyles.card, { flex: 1, marginRight: 8 }]}>
              <View style={[commonStyles.center, { marginBottom: 8 }]}>
                <Text style={[commonStyles.title, { color: colors.primary, fontSize: 24 }]}>
                  47
                </Text>
              </View>
              <Text style={[commonStyles.textLight, { textAlign: 'center', fontSize: 12 }]}>
                Meals Delivered
              </Text>
            </View>
            
            <View style={[commonStyles.card, { flex: 1, marginHorizontal: 4 }]}>
              <View style={[commonStyles.center, { marginBottom: 8 }]}>
                <Text style={[commonStyles.title, { color: colors.success, fontSize: 24 }]}>
                  ₹3.2K
                </Text>
              </View>
              <Text style={[commonStyles.textLight, { textAlign: 'center', fontSize: 12 }]}>
                Total Savings
              </Text>
            </View>
            
            <View style={[commonStyles.card, { flex: 1, marginLeft: 8 }]}>
              <View style={[commonStyles.center, { marginBottom: 8 }]}>
                <Text style={[commonStyles.title, { color: colors.warning, fontSize: 24 }]}>
                  4.9
                </Text>
              </View>
              <Text style={[commonStyles.textLight, { textAlign: 'center', fontSize: 12 }]}>
                Rating Given
              </Text>
            </View>
          </View>
        </View>

        {/* Account Settings */}
        <View style={[commonStyles.paddingHorizontal, { marginBottom: 24 }]}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>
            Account Settings
          </Text>
          
          <View style={commonStyles.card}>
            <TouchableOpacity style={[commonStyles.row, { marginBottom: 20 }]}>
              <View style={commonStyles.flexRow}>
                <Icon name="person-circle" size={24} color={colors.text} />
                <Text style={[commonStyles.text, { marginLeft: 16, fontWeight: '500' }]}>
                  Edit Profile
                </Text>
              </View>
              <Icon name="chevron-forward" size={20} color={colors.textLight} />
            </TouchableOpacity>
            
            <TouchableOpacity style={[commonStyles.row, { marginBottom: 20 }]}>
              <View style={commonStyles.flexRow}>
                <Icon name="location" size={24} color={colors.text} />
                <Text style={[commonStyles.text, { marginLeft: 16, fontWeight: '500' }]}>
                  Delivery Address
                </Text>
              </View>
              <Icon name="chevron-forward" size={20} color={colors.textLight} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[commonStyles.row, { marginBottom: 20 }]}
              onPress={() => setShowPaymentMethods(true)}
            >
              <View style={commonStyles.flexRow}>
                <Icon name="card" size={24} color={colors.text} />
                <Text style={[commonStyles.text, { marginLeft: 16, fontWeight: '500' }]}>
                  Payment Methods
                </Text>
              </View>
              <Icon name="chevron-forward" size={20} color={colors.textLight} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={commonStyles.row}
              onPress={() => setShowInvoices(true)}
            >
              <View style={commonStyles.flexRow}>
                <Icon name="receipt" size={24} color={colors.text} />
                <Text style={[commonStyles.text, { marginLeft: 16, fontWeight: '500' }]}>
                  Billing History
                </Text>
              </View>
              <Icon name="chevron-forward" size={20} color={colors.textLight} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Preferences */}
        <View style={[commonStyles.paddingHorizontal, { marginBottom: 24 }]}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>
            Preferences
          </Text>
          
          <View style={commonStyles.card}>
            <View style={[commonStyles.row, { marginBottom: 20 }]}>
              <View style={commonStyles.flexRow}>
                <Icon name="notifications" size={24} color={colors.text} />
                <Text style={[commonStyles.text, { marginLeft: 16, fontWeight: '500' }]}>
                  Push Notifications
                </Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={notificationsEnabled ? 'white' : colors.textLight}
              />
            </View>
            
            <View style={commonStyles.row}>
              <View style={commonStyles.flexRow}>
                <Icon name="location" size={24} color={colors.text} />
                <Text style={[commonStyles.text, { marginLeft: 16, fontWeight: '500' }]}>
                  Location Services
                </Text>
              </View>
              <Switch
                value={locationEnabled}
                onValueChange={setLocationEnabled}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={locationEnabled ? 'white' : colors.textLight}
              />
            </View>
          </View>
        </View>

        {/* Support */}
        <View style={[commonStyles.paddingHorizontal, { marginBottom: 24 }]}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>
            Support
          </Text>
          
          <View style={commonStyles.card}>
            <TouchableOpacity style={[commonStyles.row, { marginBottom: 20 }]}>
              <View style={commonStyles.flexRow}>
                <Icon name="help-circle" size={24} color={colors.text} />
                <Text style={[commonStyles.text, { marginLeft: 16, fontWeight: '500' }]}>
                  Help & FAQ
                </Text>
              </View>
              <Icon name="chevron-forward" size={20} color={colors.textLight} />
            </TouchableOpacity>
            
            <TouchableOpacity style={[commonStyles.row, { marginBottom: 20 }]}>
              <View style={commonStyles.flexRow}>
                <Icon name="chatbubble" size={24} color={colors.text} />
                <Text style={[commonStyles.text, { marginLeft: 16, fontWeight: '500' }]}>
                  Contact Support
                </Text>
              </View>
              <Icon name="chevron-forward" size={20} color={colors.textLight} />
            </TouchableOpacity>
            
            <TouchableOpacity style={commonStyles.row}>
              <View style={commonStyles.flexRow}>
                <Icon name="star" size={24} color={colors.text} />
                <Text style={[commonStyles.text, { marginLeft: 16, fontWeight: '500' }]}>
                  Rate Our App
                </Text>
              </View>
              <Icon name="chevron-forward" size={20} color={colors.textLight} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout */}
        <View style={[commonStyles.paddingHorizontal, { marginBottom: 40 }]}>
          <Button
            text="Logout"
            onPress={handleLogout}
            style={[buttonStyles.outline, { borderColor: colors.error }]}
            textStyle={{ color: colors.error, fontWeight: '600' }}
          />
        </View>
      </ScrollView>

      <PaymentMethodsSheet
        isVisible={showPaymentMethods}
        onClose={() => setShowPaymentMethods(false)}
        paymentMethods={paymentMethods}
        onAddPayment={handleAddPaymentMethod}
      />

      <InvoicesSheet
        isVisible={showInvoices}
        onClose={() => setShowInvoices(false)}
        invoices={invoices}
      />
    </SafeAreaView>
  );
}
