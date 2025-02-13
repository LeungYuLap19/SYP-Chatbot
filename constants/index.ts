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
    label: 'Profile',
    route: '/profile',
    imgUrl: '/nav/user.svg',
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

export const COOKIES_KEY_USERDATA = 'user_data';

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
