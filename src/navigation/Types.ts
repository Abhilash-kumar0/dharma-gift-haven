// src/navigation/types.ts
import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
  Splash: undefined;
  Auth: NavigatorScreenParams<AuthStackParamList>;
  App: NavigatorScreenParams<AppStackParamList>;
};

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
};

export type AppStackParamList = {
  MainTabs: NavigatorScreenParams<TabParamList>;
  Settings: undefined;
  PersonalInfo: undefined;
  Notification: undefined;
  BankDetails: undefined;
  TranstionHistory: undefined;
  KYC: undefined;
  EnvelopeView: { id: string }; // Example with parameter
};

export type TabParamList = {
  Home: undefined;
  Profile: undefined;
};
