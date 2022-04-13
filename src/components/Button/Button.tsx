import { StyleSheet, Text, ViewStyle } from 'react-native';
import React, { ReactNode } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../../config/colors';

type ButtonType = 'filled' | 'outline' | 'text';
type ButtonVariant = 'primary' | 'success' | 'successDark' | 'danger';

interface ButtonProps {
  children: ReactNode;
  onPress: () => void;
  style?: ViewStyle;
  type?: ButtonType;
  variant?: ButtonVariant;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  style,
  type = 'filled',
  variant = 'primary',
}) => {
  const borderWidth = type === 'outline' ? 2 : 0;
  const inverted = type === 'outline' || type === 'text';

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        containerStyles.button,
        {
          borderWidth,
          borderColor: Colors[variant],
          ...(inverted
            ? { backgroundColor: 'transparent' }
            : { backgroundColor: Colors[variant] }),
        },
        style,
      ]}
      activeOpacity={0.8}
    >
      <Text
        style={[
          textStyles.text,
          { ...(inverted ? { color: Colors[variant] } : { color: '#FFFFFF' }) },
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const containerStyles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 4,
  },
  primary: {
    backgroundColor: Colors.primary,
  },
  success: {
    backgroundColor: Colors.successDark,
  },
});

const textStyles = StyleSheet.create({
  text: {
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 16,
  },
  primary: {
    color: '#FFFFFF',
  },
  secondary: {
    backgroundColor: '#FFFFFF',
  },
});
