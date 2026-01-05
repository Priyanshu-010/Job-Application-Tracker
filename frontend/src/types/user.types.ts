export type User = {
  id: string;
  username: string;
  email: string;
};

export type AuthResponse = {
  message: string;
  token: string;
  user: User;
};
