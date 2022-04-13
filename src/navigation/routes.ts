export type RootStackParamList = {
  Checkout: undefined;
  Completed: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
