import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ControledSelect from '../ControledFormComponents/ControledSelect';
import Colors from '../../config/colors';
import { format } from 'date-fns';
import { Event } from '../../screens/Checkout';

interface Props {
  events: Event[];
  control: any;
  errors: any;
}

const EventSection = ({ events, control, errors }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select your show</Text>
      <ControledSelect
        data={events.map((item: Event) => ({
          label: `${item.name}, ${format(item.date, 'dd/MM/yyyy')} - $${
            item.price
          }`,
          value: item.id,
        }))}
        name="event"
        control={control}
        errors={errors}
        containerStyle={styles.item}
      />
      <Text style={styles.label}>Quantity</Text>
      <ControledSelect
        data={new Array(10).fill(undefined).map((_, idx) => ({
          label: (idx + 1).toString(),
          value: (idx + 1).toString(),
        }))}
        name="quantity"
        control={control}
        errors={errors}
        containerStyle={styles.item}
      />
    </View>
  );
};

export default EventSection;

const styles = StyleSheet.create({
  container: {
    borderColor: Colors.border,
    borderWidth: 1,
    padding: 16,
    marginVertical: 12,
    borderRadius: 4,
  },
  label: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '500',
  },
  item: {
    marginVertical: 8,
  },
});
