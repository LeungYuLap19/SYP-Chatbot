// components props interfaces
interface AuthFormProps {
  type: 'sign-in' | 'sign-up'
}

interface NavigationTabProps {
  label: string;
  route: string;
  index?: number;
  imgUrl: string;
}

interface CustomButtonProps {
  loading: boolean;
  type: 'submit' | 'button';
  label: string;
  onClick?: () => void;
}

interface DepArrProps {
  localTime: string;
  fromIATA: string;
  fromCity: string;
  fromAirport: string;
  toIATA: string;
  toCity: string;
  toAirport: string;
  className?: string;
}

interface FromToProps {
  fromIATA: string;
  fromAirport?: string;
  fromLocalTime: string;
  fromCountryCode?: string;
  toIATA: string;
  toAirport?: string;
  toLocalTime: string;
  toCountryCode?: string;
  fromUTCTime: string;
  toUTCTime: string;
}

interface SearchResultTitleProps {
  index: number;
  totalDuration: number;
  airlineLogo: string;
  price: number;
  showDetails: number;
  setShowDetails: React.Dispatch<React.SetStateAction<number>>;
}