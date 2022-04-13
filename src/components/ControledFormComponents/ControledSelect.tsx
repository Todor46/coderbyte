import React from 'react';
import {
  Control,
  Controller,
  DeepMap,
  DeepPartial,
  FieldError,
  FieldValues,
} from 'react-hook-form';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import ErrorText from '../ErrorText';
import RNPickerSelect from 'react-native-picker-select';
import Colors from '../../config/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface ISelectData {
  label: string;
  value: any;
}

interface IControledSelect {
  name: string;
  control: Control<FieldValues, object>;
  errors: DeepMap<DeepPartial<FieldValues>, FieldError>;
  placeholder?: ISelectData;
  data: ISelectData[];
  containerStyle?: ViewStyle | ViewStyle[];
  defaultValue?: string | number;
}

const ControledSelect = ({
  name,
  control,
  errors,
  placeholder = { value: undefined, label: 'Select an item' },
  data,
  containerStyle,
  defaultValue,
}: IControledSelect) => {
  return (
    <View style={containerStyle}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <RNPickerSelect
            value={value}
            onValueChange={onChange}
            items={data}
            placeholder={placeholder}
          >
            <View style={styles.selectContainer}>
              <Text style={styles.selectText}>
                {value
                  ? data.find((x) => x.value === value)?.label
                  : placeholder.label}
              </Text>
              <Icon name="chevron-down" size={14} color={Colors.text} />
            </View>
          </RNPickerSelect>
        )}
      />
      {errors[name] && <ErrorText>{errors[name].message}</ErrorText>}
    </View>
  );
};

export default ControledSelect;

const styles = StyleSheet.create({
  selectContainer: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectText: {
    fontSize: 14,
    color: Colors.text,
  },
});
