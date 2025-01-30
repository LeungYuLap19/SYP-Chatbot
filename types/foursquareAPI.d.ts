interface ResultItem {
  fsq_id: string;
  name: string;
  rating: number;
  categories: Category[];
  photo?: string;
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
  description: string;
  tips: Tip[];
  hours: Hours;
  hours_popular: OpenClose[];
  features: Features;
  location: Location;
  tel: string;
  email: string;
  website: string;
  social_media: SocialMedia;
  geocodes: Geocodes;
  photos: PlacePhoto[];
  price: number;
  popularity: number;
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

interface Location {
  address: string;
  country: string;
  cross_street: string;
  formatted_address: string;
  locality: string;
  postcode: string;
  region: string;
}

interface Features {
  payment: PaymentFeatures;
  food_and_drink: FoodNDrinkFeatures;
  services: ServicesFeatures;
  amenities: AmenitiesFeatures;
  attributes: AttributesFeatures;
}

interface AttributesFeatures {
  business_meeting: string;
  clean: string;
  crowded: string;
  dates_popular: string;
  dressy: string;
  families_popular: string;
  gluten_free_diet: string;
  good_for_dogs: string;
  groups_popular: string;
  healthy_diet: string;
  late_night: string;
  noisy: string;
  quick_bite: string;
  romantic: string;
  service_quality: string;
  singles_popular: string;
  special_occasion: string;
  trendy: string;
  value_for_money: string;
  vegan_diet: string;
  vegetarian_diet: string;
}

interface AmenitiesFeatures {
  restroom: boolean;
  smoking: boolean;
  jukebox: boolean;
  music: boolean;
  live_music: boolean;
  private_room: boolean;
  outdoor_seating: boolean;
  tvs: boolean;
  atm: boolean;
  coat_check: boolean;
  wheelchair_accessible: boolean;
  parking: {
    parking: boolean;
    street_parking: boolean;
    valet_parking: boolean;
    public_lot: boolean;
    private_lot: boolean;
  };
  sit_down_dining: boolean;
  wifi: string;
}

interface ServicesFeatures {
  delivery: boolean;
  takeout: boolean;
  drive_through: boolean;
  dine_in: {
    reservations: boolean;
    online_reservations: boolean;
    groups_only_reservations: boolean;
    essential_reservations: boolean;
  };
}

interface FoodNDrinkFeatures {
  alcohol: {
    bar_service: boolean;
    beer: boolean;
    byo: boolean;
    cocktails: boolean;
    full_bar: boolean;
    wine: boolean;
  },
  meals: {
    bar_snacks: boolean;
    breakfast: boolean;
    brunch: boolean;
    lunch: boolean;
    happy_hour: boolean;
    dessert: boolean;
    dinner: boolean;
    tasting_menu: boolean;
  }
}

interface PaymentFeatures {
  credit_cards: {
    accepts_credit_cards: boolean;
    amex: boolean;
    discover: boolean;
    visa: boolean;
    diners_club: boolean;
    master_card: boolean;
    union_pay: boolean;
  },
  digital_wallet: {
    accepts_nfc: boolean;
  }
}

interface Hours {
  display: string;
  is_local_holiday: boolean;
  open_now: boolean;
  regular: OpenClose[];
}

interface OpenClose {
  close: string;
  day: number;
  open: string;
}

interface Tip {
  created_at: string;
  text: string;
}