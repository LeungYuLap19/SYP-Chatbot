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

// firestore api
// items / objects
interface Chatroom {
  cid?: string;
  uid: string;
  chatroom_name: string;
  last_message_datetime: string;
  messages: Message[];
}

interface Message {
  sender: string;
  text?: string;
  custom?: RasaCustom;
  botDefault?: boolean;
  datetime: string;
}

interface PlannerDetails {
  pid?: string;
  uid: string;
  name: string;
  from_datetime: string | null;
  to_datetime: string | null;
  created_datetime: string;
  items: PlannerItem[];
}

interface PlannerItem {
  from_datetime: string | null;
  to_datetime: string | null;
}

interface FlightItem extends PlannerItem {
  flight_number: string;
}

interface AccommodationItem extends PlannerItem {
  property_token: string;
}

interface PlaceItem extends PlannerItem {
  fsq_id: string;
}

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