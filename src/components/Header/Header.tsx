import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const Header = ({ title }: { title: string }) => {
  const { goBack } = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => goBack()}>
        <Icon name="chevron-left" size={24} />
      </Pressable>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 20,
    lineHeight: 24,
  },
});
