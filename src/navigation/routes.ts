export type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  Signup: undefined;
  RemoveAccount: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
