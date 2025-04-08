import GeocodingData from '@/jsonTest/geocoding.json';

export const navLinks: NavigationTabProps[] = [
  {
    label: 'Chatroom',
    route: '/chatroom',
    imgUrl: '/nav/comment.svg',
  },
  {
    label: 'Chat History',
    route: '/history',
    imgUrl: '/nav/time-past.svg',
  },
  {
    label: 'Planner',
    route: '/planner',
    imgUrl: '/nav/planner.png',
  },
  {
    label: 'Sign out',
    route: '/sign-in',
    imgUrl: '/nav/exit.svg',
  },
];

export const socialMedia: SocialMediaProps[] = [
  {
    name: 'facebook_id',
    url: 'https://www.facebook.com/',
    imgUrl: '/dialog/facebook.svg',
  },
  {
    name: 'twitter',
    url: 'https://twitter.com/',
    imgUrl: '/dialog/twitter.svg',
  },
  {
    name: 'instagram',
    url: 'https://www.instagram.com/',
    imgUrl: '/dialog/instagram.svg',
  },
];

export const weekDays: string[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const hotelSearchParams = {
  people: '/dialog/user.svg',
  duration: '/dialog/calendar-clock.svg',
  location: '/dialog/marker.svg',
}

export const placeSearchFields: string[] = [
  'fsq_id', 'name', 'rating', 'categories', 'photos', 
  'email',
  'geocodes', 
  'hours', 
  'location', 
  'popularity', 
  'social_media', 
  'tel', 
  'website'
];

export const placeSearchCategories: PlaceSearchCategory[] = [
  {
    category: 'popularPlaces',
    ids: [
      10001, 10002, 10004, 10024, 10027, 10068,
      13003, 13065, 13028, 13040, 13062, 13032,
      14005, 14004, 16000, 17000,

      16020, 16031, 16041,
      16034, 16035, 16036, 16037, 16039, 16017, 16008,
      16004, 16019, 16027, 16028,
      16002, 16003
    ],
    label: 'Popular Places'
  },
  {
    category: 'restaurantSearch',
    ids: [
      13065
    ],
    label: 'Restaurants'
  },

  {
    category: 'dessertSearch',
    ids: [
      13040
    ],
    label: 'Dessert Shops'
  },
  {
    category: 'cafeSearch',
    ids: [
      13032
    ],
    label: 'Cafes'
  },
  {
    category: 'barSearch',
    ids: [
      13003
    ],
    label: 'Bars'
  },

  {
    category: 'nightMarketSearch',
    ids: [
      13062
    ],
    label: 'Night Markets'
  },
  {
    category: 'entertainmentSearch',
    ids: [
      10002, 10001, 10056,
      10024,
      10027
    ],
    label: 'Entertainments'
  },
  {
    category: 'shoppingSearch',
    ids: [
      17039, 17114, 17115,
      17003,
      17018,
      17144
    ],
    label: 'Shopping Spots'
  },
]

export const currencyList: CurrencyProps[] = [
  {
    name: 'USD',
    symbol: '$'
  },
  {
    name: 'EUR',
    symbol: '€'
  },
  {
    name: 'GBP',
    symbol: '£'
  },
  {
    name: 'JPY',
    symbol: '¥'
  },
  {
    name: 'KRW',
    symbol: '₩'
  },
  {
    name: 'CNY',
    symbol: '¥'
  },
  {
    name: 'HKD',
    symbol: 'HK$'
  },
  {
    name: 'TWD',
    symbol: 'NT$'
  },
  {
    name: 'SGD',
    symbol: 'S$'
  }
]

export const travelModes: TravelModeProps[] = [
  {
    mode: 'best',
    icon: '/planner/best.svg',
    value: 6
  },
  {
    mode: 'driving',
    icon: '/planner/driving.svg',
    value: 0
  },
  {
    mode: 'transit',
    icon: '/planner/transit.svg',
    value: 3
  },
  {
    mode: 'walking',
    icon: '/planner/walking.svg',
    value: 2
  },
  {
    mode: 'cycling',
    icon: '/planner/cycling.svg',
    value: 1
  },
];

export const weekdays: string[] = [
  'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
];

export const COOKIES_KEY_USERDATA = 'user_data';

export const COOKIES_KEY_CURRENCY = 'currency';

export const DAYS_TO_EXPIRE = 7;

export const ERROR_TOAST_TITLE = 'Something went wrong';

// testing
// flight status
export const TEST_FLIGHT_NUMBER = 'CX348';
export const TEST_FLIGHT_DATE = '2025-02-11';
// flight search
export const TEST_FLIGHT_DEPARTURE = 'ICN'; 
export const TEST_FLIGHT_ARRIVAL = 'AMS'; 
export const TEST_FLIGHT_DEPARTURE_DATE = '2025-04-30';
// auto completion 
export const TEST_AUTOCOMPLETION = 'hongkong';
// place search
export const TEST_SEARCH_LIMIT = 5;
// export const TEST_NE: GeoLocation = GeocodingData.results[0].geometry.bounds.northeast;
// export const TEST_SW: GeoLocation = GeocodingData.results[0].geometry.bounds.southwest;