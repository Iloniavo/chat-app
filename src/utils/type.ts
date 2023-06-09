export type UserData = {
  id: number;
  email: string;
  name: string;
  googleId: string | null;
  bio: string | null;
  status: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  token: string;
};

export interface LogUser {
  email: string;
  password: string;
}

export interface CreateUser extends LogUser {
  name: string;
  bio: string;
}

export interface UserMember {
  id: number;
  name: string;
  bio: string;
  email: string;
}

export enum ChannelType {
  PUBLIC_CHANNEL = "public",
  PRIVATE_CHANNEL = "private",
}

export type Channels = {
  id: number;
  name: string;
  type: ChannelType;
  createdAt: string;
  updatedAt: string;
  owner: ChannelOwner;
  ownerId: number;
};

export type ChannelOwner = {
  id: number;
  email: string;
  name: string;
};

export interface Message extends SendMessage {
  id: number;
  updatedAt: string;
  createdAt: string;
  senderId: number;
  sender: {
    id: number;
    name: string;
    email: string;
  };
}

export interface SendMessage {
  channelId: number;
  content: string;
}
