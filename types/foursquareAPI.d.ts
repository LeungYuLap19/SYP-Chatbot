interface ResultItem {
  fsq_id: string;
  name: string;
  rating: number;
  categories: Category[];
  photos?: Photo[];
}

interface Photo {
  id: string;
  createAt: string;
  prefix: string;
  suffix: string;
  width: number;
  height: number;
}

interface Category {
  id: number;
  name: string;
  short_name: string;
  plural_name: string;
  icon: {
    prefix: string;
    suffix: string;
  };
}

interface PlacePhoto {
  id: string;
  created_at: string;
  prefix: string;
  suffix: string;
  width: number;
  height: number;
}

interface PlaceDetails {
  fsq_id: string;
  email: string;
  tel: string;
  website: string;
  location: PlaceLocation; 
  geocodes: Geocodes;
  hours: Hours;
  popularity: number;
  social_media: SocialMedia;
}

interface Geocodes {
  main: LatLong;
  roof: LatLong;
}

interface LatLong {
  latitude: number;
  longitude: number;
}

interface SocialMedia {
  facebook_id: string;
  instagram: string;
  twitter: string;
}

interface PlaceLocation { 
  address: string;
  country: string;
  cross_street: string;
  formatted_address: string;
  locality: string;
  postcode: string;
  region: string;
}

interface Hours {
  display: string;
  is_local_holiday: boolean;
  open_now: boolean;
  regular: OpenClose[];
}

interface OpenClose {
  open: string;
  close: string;
  day: number;
}
