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

export type LogData = {
  status: boolean;
  user: UserData;
};

export interface LogUser {
  email: string;
  password: string;
}

export interface CreateUser extends LogUser {
  name: string;
  bio: string;
}
