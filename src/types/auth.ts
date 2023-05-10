export type AuthResponse = {
  jwt: string;
  user: User;
};

export type User = {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  phone: string;
};

export type Credentials = {
  identifier: string;
  password: string;
};

export type RegistrationData = {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
};

export type ForgotCredentials = {
  email: string;
};

export type ResetPasswordCredentials = {
  password: string;
  passwordConfirmation: string;
  code: string;
};

export type AuthError = {
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
    details: Record<string, unknown>;
  };
};
