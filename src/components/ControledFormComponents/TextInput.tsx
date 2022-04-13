import {
  View,
  TextInput as RNTextInput,
  StyleSheet,
  TextStyle,
  ViewStyle,
  KeyboardType,
} from 'react-native';
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

interface ITextInput {
  name: string;
  errorName?: string;
  control: Control<any>;
  style?: TextStyle | TextStyle[];
  placeholder?: string;
  errors: DeepMap<DeepPartial<FieldValues>, FieldError>;
  containerStyle?: ViewStyle | ViewStyle[];
  secureTextEntry?: boolean;
  keyboardType?: KeyboardType;
  transform?: (value: any) => any;
}

const TextInput = ({
  name,
  errorName,
  control,
  errors,
  style,
  containerStyle,
  placeholder,
  keyboardType,
  transform,
  ...props
}: ITextInput) => {
  return (
    <View style={containerStyle}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <RNTextInput
            onChangeText={onChange}
            onBlur={onBlur}
            value={transform ? transform(value) : value}
            placeholder={placeholder}
            style={[styles.textInput, style]}
            keyboardType={keyboardType}
            {...props}
          />
        )}
      />
      {errors[errorName ? errorName : name] && (
        <ErrorText>{errors[errorName ? errorName : name].message}</ErrorText>
      )}
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  textInput: {
    borderRadius: 4,
    borderColor: Colors.border,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 6,
    fontSize: 14,
    alignItems: 'center',
  },
});
