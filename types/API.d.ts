// lib/actions/xxxAPI functions params interfaces
// auth api
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

// cookies api
interface StoreToCookiesParams<T> {
  key: string;
  data: T;
  daysToExpire: number; 
}

interface GetFromCookiesParams { key: string }

interface RemoveFromCookiesParams extends GetFromCookiesParams {}

// global api
interface Result<T> {
  data?: T;
  error?: ErrorMessage;
};

declare interface ErrorMessage {
  errorCode: string;
  message: string;
}