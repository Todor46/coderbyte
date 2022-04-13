import { Text, StyleSheet, TextStyle } from 'react-native';
import React, { ReactElement } from 'react';
import Colors from '../config/colors';

interface Props {
  children: ReactElement | string;
  style?: TextStyle;
}

const ErrorText = ({ children, style }: Props) => {
  return <Text style={[styles.errorText, style]}>{children}</Text>;
};

export default ErrorText;

const styles = StyleSheet.create({
  errorText: {
    fontSize: 12,
    color: Colors.danger,
    marginLeft: 2,
    marginTop: 2,
  },
});
