// lib/actions/xxxAPI functions params interfaces
interface CreateAccountParams {
  email: string;
  password: string;
}

interface SignInAccountParams extends CreateAccountParams {}

interface CreateUserParams {
  uid: string;
  username: string;
  email: string;
}

interface GetUserByUIDParams { uid: string }

interface UserData extends CreateUserParams {}

interface Result<T> {
  data?: T;
  error?: ErrorMessage;
};

declare interface ErrorMessage {
  errorCode: string;
  message: string;
}