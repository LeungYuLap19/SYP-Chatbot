interface SearchMetadata {
  id: string;
  status: string;
  json_endpoint: string;
  created_at: string;
  processed_at: string;
  google_hotels_url: string;
  raw_html_file: string;
  prettify_html_file: string;
  total_time_taken: number;
}

interface SearchParameters {
  engine: string;
  q: string;
  gl: string;
  hl: string;
  currency: string;
  check_in_date: string;
  check_out_date: string;
  adults: number;
  children: number;
  property_token: string;
}

interface GpsCoordinates {
  latitude: number;
  longitude: number;
}

interface Rate {
  lowest: string;
  extracted_lowest: number;
  before_taxes_fees: string;
  extracted_before_taxes_fees: number;
}

interface FeaturedPrice {
  source: string;
  link: string;
  logo: string;
  rooms: string[]; // Assuming rooms is an array of strings
  num_guests: number;
  rate_per_night: Rate;
  total_rate: Rate;
}

interface Price {
  source: string;
  link: string;
  logo: string;
  num_guests: number;
  rate_per_night: Rate;
  total_rate: Rate;
}

interface NearbyPlace {
  category: string;
  name: string;
  link?: string;
  thumbnail?: string;
  transportations?: any[]; // Assuming transportations is an array
  rating?: number;
  reviews?: number;
  description?: string;
  gps_coordinates: GpsCoordinates;
}

interface Image {
  thumbnail: string;
  original_image: string;
}

interface Rating {
  stars: number;
  count: number;
}

interface ReviewBreakdown {
  name: string;
  description: string;
  total_mentioned: number;
  positive: number;
  negative: number;
  neutral: number;
}

interface HotelDetails {
  search_metadata: SearchMetadata;
  search_parameters: SearchParameters;
  type: string;
  name: string;
  description: string;
  link: string;
  property_token: string;
  address: string;
  phone: string;
  phone_link: string;
  gps_coordinates: GpsCoordinates;
  check_in_time: string;
  check_out_time: string;
  rate_per_night: Rate;
  total_rate: Rate;
  featured_prices: FeaturedPrice[];
  prices: Price[];
  typical_price_range: {
    lowest: string;
    extracted_lowest: number;
    highest: string;
    extracted_highest: number;
  };
  nearby_places: NearbyPlace[];
  images: Image[];
  overall_rating: number;
  reviews: number;
  ratings: Rating[];
  location_rating: number;
  reviews_breakdown: ReviewBreakdown[];
}
