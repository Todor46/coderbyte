import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { faker } from '@faker-js/faker';
import { useForm, useWatch } from 'react-hook-form';
import _capitalize from 'lodash/capitalize';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Icon from 'react-native-vector-icons/FontAwesome5';
import useStore from '../hooks/useStore';
import TextInput from '../components/ControledFormComponents/TextInput';
import EventSection from '../components/Checkout/EventSection';
import Colors from '../config/colors';
import Button from '../components/Button/Button';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

export interface Event {
  id: string;
  name: string;
  date: Date;
  price: string;
}

export interface FormData {
  event: string;
  quantity: number;
  creditCard: string;
  expiration: string;
  cvc: string;
}

const events: Event[] = new Array(20).fill(null).map(() => ({
  id: faker.datatype.uuid(),
  name: `${_capitalize(faker.word.adjective())} ${_capitalize(
    faker.word.noun(),
  )}`,
  date: faker.date.future(),
  price: faker.commerce.price(10, 100, 0),
}));

const Checkout = () => {
  const [totalOpen, setTotalOpen] = useState(false);
  const { dispatch } = useStore();
  const { navigate } = useNavigation();

  const schema = yup.object().shape({
    event: yup.string().required().label('Show'),
    quantity: yup.number().required().label('Quantity'),
    creditCard: yup
      .string()
      .required()
      .label('Credit card')
      .min(19, 'Please enter a valid credit card number'),
    expiration: yup
      .string()
      .required()
      .label('Expiration date')
      .min(4, 'Please enter a valid expiration date'),
    cvc: yup.string().required().label('CVC'),
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit = (data: FormData) => {
    console.log(data);

    dispatch({ type: 'SET_LOADING', payload: true });
    setTimeout(() => {
      dispatch({ type: 'SET_LOADING', payload: false });
      navigate('Completed');
    }, 3000);
  };

  const eventId = useWatch({ control, name: 'event' });
  const event = events.find((x) => x.id === eventId);
  const quantity = useWatch({ control, name: 'quantity' });
  const serviceFee = 20;
  const serviceFeeTotal = quantity ? serviceFee * quantity : 0;
  const processingFee = 2.95;

  const ticketsPrice =
    event && quantity ? parseInt(event?.price, 10) * quantity : 0;

  const total =
    event && quantity
      ? ticketsPrice + serviceFee * quantity + processingFee
      : 0;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Checkout page</Text>
      <EventSection events={events} control={control} errors={errors} />
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment info</Text>
        <Text style={styles.label}>Credit card number</Text>
        <TextInput
          name="creditCard"
          control={control}
          errors={errors}
          containerStyle={styles.textInput}
          placeholder="XXXX XXXX XXXX XXXX"
          keyboardType="number-pad"
          transform={(value: string) => {
            if (!value) {
              return value;
            }
            const stringArray = value.split('').filter((char) => char !== ' ');

            const formated = stringArray.map((data, index) => {
              if ((index + 1) % 4 === 0 && index !== stringArray.length - 1) {
                data += ' ';
              }
              return data;
            });
            return formated.join('').substring(0, 19);
          }}
        />
        <View style={styles.horizontal}>
          <View style={styles.horizontalItem}>
            <Text style={styles.label}>Expiration date</Text>
            <TextInput
              name="expiration"
              control={control}
              errors={errors}
              containerStyle={styles.textInput}
              placeholder="MM/YY"
              keyboardType="number-pad"
              transform={(value: string) => {
                if (!value) {
                  return value;
                }
                const stringArray = value
                  .split('')
                  .filter((char) => char !== '/');
                if (stringArray.length > 2) {
                  stringArray.splice(2, 0, '/');
                }
                return stringArray.join('').substring(0, 5);
              }}
            />
          </View>
          <View style={styles.separator} />
          <View style={styles.horizontalItem}>
            <Text style={styles.label}>CVC</Text>
            <TextInput
              name="cvc"
              control={control}
              errors={errors}
              containerStyle={styles.textInput}
              placeholder="Security code"
              keyboardType="number-pad"
              transform={(value: string) => value && value.substring(0, 3)}
            />
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <View
          style={[
            styles.horizontal,
            // eslint-disable-next-line react-native/no-inline-styles
            { justifyContent: 'space-between', alignItems: 'baseline' },
          ]}
        >
          <Text style={styles.sectionTitle}>Total</Text>
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>${total}</Text>
            <Pressable onPress={() => setTotalOpen(!totalOpen)}>
              <Icon
                name={totalOpen ? 'chevron-up' : 'chevron-down'}
                size={16}
                color={Colors.border}
              />
            </Pressable>
          </View>
        </View>
        {totalOpen && (
          <>
            <Text style={styles.label}>Tickets</Text>
            <View style={styles.feeContainer}>
              <Text>
                Resale tickets:{' '}
                {event && quantity && `$${event.price} x ${quantity}`}
              </Text>
              <Text>${ticketsPrice}</Text>
            </View>
            <Text style={styles.label}>Fees</Text>
            <View style={styles.feeContainer}>
              <Text>
                Service Fee: {quantity && `$${serviceFee} x ${quantity}`}
              </Text>
              <Text>${serviceFeeTotal}</Text>
            </View>
            <View style={styles.feeContainer}>
              <Text>Order Processing Fee</Text>
              <Text>${processingFee}</Text>
            </View>
          </>
        )}
      </View>
      <Button onPress={handleSubmit(onSubmit)} style={styles.button}>
        Purchase
      </Button>
    </ScrollView>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: Colors.text,
  },
  section: {
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
  sectionTitle: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 12,
  },
  textInput: {
    marginVertical: 8,
  },
  horizontal: {
    flexDirection: 'row',
  },
  horizontalItem: {
    flex: 1,
  },
  separator: {
    marginHorizontal: 8,
  },
  totalText: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: '600',
    marginRight: 8,
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  feeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  button: {
    marginBottom: 24,
  },
});
