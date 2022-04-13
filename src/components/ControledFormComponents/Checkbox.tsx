import { View, StyleSheet, TextStyle, ViewStyle, Text } from 'react-native';
import React from 'react';
import {
  Control,
  Controller,
  DeepMap,
  DeepPartial,
  FieldError,
  FieldValues,
} from 'react-hook-form';
import ErrorText from '../ErrorText';
import Colors from '../../config/colors';
import CheckBox from '@react-native-community/checkbox';

interface ITextInput {
  name: string;
  errorName?: string;
  control: Control<any>;
  style?: TextStyle | TextStyle[];
  errors: DeepMap<DeepPartial<FieldValues>, FieldError>;
  containerStyle?: ViewStyle | ViewStyle[];
  label: string | JSX.Element;
}

const Checkbox = ({
  name,
  errorName,
  control,
  errors,
  containerStyle,
  label,
  style,
}: ITextInput) => {
  return (
    <View style={containerStyle}>
      <View style={styles.inner}>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <CheckBox
              tintColors={{ true: Colors.primary }}
              onCheckColor={Colors.primary}
              onValueChange={onChange}
              value={value}
            />
          )}
        />
        {typeof label === 'string' ? <Text>{label}</Text> : label}
      </View>
      {errors[errorName ? errorName : name] && (
        <ErrorText>{errors[errorName ? errorName : name].message}</ErrorText>
      )}
    </View>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
