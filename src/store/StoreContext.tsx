import React, { useReducer } from 'react';
import AppReducer from './AppReducer';
import { State, Store } from './types';

const initialState: State = {
  loading: false,
};

export const StoreContext = React.createContext<Store>({
  state: initialState,
  dispatch: () => null,
});

const StoreProvider = ({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
