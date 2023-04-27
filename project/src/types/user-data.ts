export type UserData = {
  id: number;
  email: string;
  token: string;
  avatarUrl: string;
  name: string;
};

export type UserInfo = Omit<UserData, 'token'>;
