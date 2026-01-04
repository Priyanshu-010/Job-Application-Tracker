export type User = {
  id: string;
  username: string;
  email: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};
