import { NavigatorScreenParams } from "@react-navigation/native";

/* ================= ROOT ================= */

export type RootStackParamList = {
  Splash: undefined;
  Auth: NavigatorScreenParams<AuthStackParamList>;
  App: NavigatorScreenParams<AppStackParamList>;
};

/* ================= AUTH ================= */

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
};

/* ================= APP ================= */

export type AppStackParamList = {
  MainTabs: NavigatorScreenParams<TabParamList>;
  Settings: undefined;
  PersonalInfo: undefined;
  Notification: undefined;
  BankDetails: undefined;
  TranstionHistory: undefined;
  KYC: undefined;
  EnvelopeView: { id: string };
  CreateEnvelope: undefined;
  EnvelopePayment: { envelopeId: string };

  /** 🔥 ADD CHAT STACK HERE */
  Chat: NavigatorScreenParams<ChatStackParamList>;
};

/* ================= TABS ================= */

export type TabParamList = {
  Home: undefined;
  Profile: undefined;
};

/* ================= CHAT STACK ================= */

export type ChatStackParamList = {
  ChatList: undefined;
  ChatConversation: {
    chatId: string;
    isGroup?: boolean;
    title?: string;
  };
};

/* ================= CHAT MODELS ================= */

export type MessageType = 'text' | 'image' | 'voice';

// navigation/Types.ts
export interface Message {
  id: string;
  text?: string;

  senderId: string;
  senderName?: string; // ✅ ADD THIS (optional)

  type: MessageType;
  createdAt: number;

  edited?: boolean;
  pinned?: boolean;
  deletedForAll?: boolean;

  reaction?: string | null;
  replyTo?: string;
  voiceUri?: string;
  duration?: number;
}



export interface Chat {
  id: string;
  title: string;
  isGroup: boolean;
  lastMessage?: Message;
  participants: string[];
  unreadCount?: number;
}

