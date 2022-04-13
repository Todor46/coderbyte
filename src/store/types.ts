export interface State {
  loading: boolean;
}

export interface Action {
  type: ActionTypes;
  payload: any;
}

export interface Store {
  state: State;
  dispatch: React.Dispatch<Action>;
}

export type ActionTypes = 'SET_LOADING';
