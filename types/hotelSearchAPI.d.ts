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
}

interface SearchInformation {
  total_results: number;
}

interface Brand {
  id: number;
  name: string;
  children?: Brand[];
}

interface GPSLocation {
  latitude: number;
  longitude: number;
}

interface RatePerNight {
  lowest: string;
  extracted_lowest: number;
  before_taxes_fees: string;
  extracted_before_taxes_fees: number;
}

interface Price {
  source: string;
  logo: string;
  rate_per_night: RatePerNight;
}

interface Transportation {
  type: string;
  duration: string;
}

interface NearbyPlace {
  name: string;
  transportations: Transportation[];
}

interface ReviewBreakdown {
  name: string;
  description: string;
  total_mentioned: number;
  positive: number;
  negative: number;
  neutral: number;
}

interface Image {
  thumbnail: string;
  original_image: string;
}

interface Rating {
  stars: number;
  count: number;
}

interface HotelProperty {
  type: string;
  name: string;
  description: string;
  logo?: string;
  sponsored: boolean;
  gps_coordinates: GPSLocation;
  check_in_time: string;
  check_out_time: string;
  rate_per_night: RatePerNight;
  prices: Price[];
  nearby_places: NearbyPlace[];
  hotel_class: string;
  extracted_hotel_class: number;
  images: Image[];
  overall_rating: number;
  reviews: number;
  location_rating: number;
  reviews_breakdown: ReviewBreakdown[];
  amenities: string[];
  property_token: string;
  serpapi_property_details_link: string;
  link?: string;
  total_rate?: RatePerNight;
  deal?: string;
  deal_description?: string;
  ratings?: Rating[];
}

interface SerpApiPagination {
  current_from: number;
  current_to: number;
  next_page_token: string;
  next: string;
}

interface HotelSearchResponse {
  search_metadata: SearchMetadata;
  search_parameters: SearchParameters;
  search_information: SearchInformation;
  brands: Brand[];
  properties: HotelProperty[];
  serpapi_pagination: SerpApiPagination;
}
