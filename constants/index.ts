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

export const COOKIES_KEY_USERDATA = 'user_data';

export const DAYS_TO_EXPIRE = 7;

export const ERROR_TOAST_TITLE = 'Something went wrong';

// testing
// flight status
export const TEST_FLIGHT_NUMBER = 'CX270';
export const TEST_FLIGHT_DATE = '2025-02-20';
// flight search
export const TEST_FLIGHT_DEPARTURE = 'HKG'; // Los Angeles
export const TEST_FLIGHT_ARRIVAL = 'SYD'; // Sydney
export const TEST_FLIGHT_DEPARTURE_DATE = '2025-05-18';
// place search
export const TEST_PLACE = 'Hong Kong';
