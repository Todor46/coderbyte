import { useContext } from 'react';
import { StoreContext } from '../store/StoreContext';

const useStore = () => useContext(StoreContext);

export default useStore;
