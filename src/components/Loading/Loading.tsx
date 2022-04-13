import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import Colors from '../../config/colors';
import useStore from '../../hooks/useStore';

const Loading = () => {
  const {
    state: { loading },
  } = useStore();

  return <Spinner visible={loading} color={Colors.primary} size="large" />;
};

export default Loading;
