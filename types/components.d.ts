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

interface SocialMediaProps {
  name: string;
  url: string;
  imgUrl: string;
}

interface CustomButtonProps {
  loading?: boolean;
  type: 'submit' | 'button';
  label: string;
  onClick?: () => void;
  className?: string;
  iconUrl?: string;
  imageClassName?: string;
  title?: string;
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
  address?: string;
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
  airline?: string;
  airlineLogo: string;
  price: number;
  showDetails: number;
  setShowDetails: React.Dispatch<React.SetStateAction<number>>;
}

interface PlaceOverviewProps {
  resultItem: ResultItem;
  selectedPlace: string | null;
  setSelectedPlace: React.Dispatch<React.SetStateAction<string | null>>;
}

interface CurrencyProps {
  name: string;
  symbol: string; 
}