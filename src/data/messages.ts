import { Message } from "../navigation/types";

export const messages: Message[] = [
  {
    id: "m1",
    text: "Hello 👋",
    senderId: "user1",
    senderName: "Rohit",
    type: "text",
    createdAt: Date.now() - 1000 * 60 * 10,
  },
  {
    id: "m2",
    text: "Welcome to the group 🎉",
    senderId: "me",
    type: "text",
    createdAt: Date.now() - 1000 * 60 * 8,
  },
  {
    id: "m3",
    text: "This message is pinned",
    senderId: "me",
    type: "text",
    pinned: true,
    createdAt: Date.now() - 1000 * 60 * 6,
  },
  {
    id: "m4",
    text: "❤️",
    senderId: "user2",
    senderName: "Priya",
    type: "text",
    reaction: "❤️",
    createdAt: Date.now() - 1000 * 60 * 5,
  },
  {
    id: "m5",
    senderId: "me",
    type: "voice",
    voiceUri: "dummy-audio-uri",
    duration: 12,
    createdAt: Date.now() - 1000 * 60 * 3,
  },
  {
    id: "m6",
    text: "This message was deleted",
    senderId: "user3",
    senderName: "Amit",
    type: "text",
    deletedForAll: true,
    createdAt: Date.now() - 1000 * 60 * 1,
  },
];
