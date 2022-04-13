import { Action } from './types';

export default (state: any, action: Action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};
