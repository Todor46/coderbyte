import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Colors from '../config/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Completed = () => {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Icon name="check-circle" size={60} color={Colors.primary} />
        <Text style={styles.title}>Congratulations!</Text>
        <Text style={styles.text}>Your purchase is successful.</Text>
      </View>
    </View>
  );
};

export default Completed;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    color: Colors.text,
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 8,
    marginTop: 24,
  },
  text: {
    fontSize: 16,
  },
  section: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 4,
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
  },
});
