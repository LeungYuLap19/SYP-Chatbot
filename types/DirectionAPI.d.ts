interface SearchMetadata {
  id: string;
  status: string;
  json_endpoint: string;
  created_at: string;
  processed_at: string;
  google_maps_directions_url: string;
  raw_html_file: string;
  prettify_html_file: string;
  total_time_taken: number;
}

interface SearchParameters {
  engine: string;
  hl: string;
  start_coords: string;
  end_addr: string;
}

interface GPSCoordinates {
  latitude: number;
  longitude: number;
}

interface PlaceInfo {
  address: string;
  data_id: string;
  gps_coordinates: GPSCoordinates;
}

interface DirectionExtension {
  travel_mode: string;
  via?: string;
  distance: number;
  duration: number;
  formatted_distance: string;
  formatted_duration: string;
  extensions?: string[];
  icon: string;
  cost?: number;
  currency?: string;
  trips?: Trip[];
}

interface Trip {
  travel_mode: string;
  title: string;
  distance?: number;
  duration: number;
  formatted_distance?: string;
  formatted_duration: string;
  details?: TripDetail[];
  start_stop?: StopInfo;
  end_stop?: StopInfo;
  stops?: StopInfo[];
  icon?: string;
  service_run_by?: ServiceRunBy;
}

interface TripDetail {
  title: string;
  action: string;
  distance: number;
  duration: number;
  formatted_distance: string;
  formatted_duration: string;
  geo_photo?: string;
  gps_coordinates?: GPSCoordinates;
  icon: string;
  extensions?: string[];
}

interface StopInfo {
  name: string;
  stop_id: string;
  time: string;
  data_id: string;
}

interface ServiceRunBy {
  name: string;
  link: string;
  route_information: string;
}

interface Duration {
  travel_mode: string;
  duration: number;
  formatted_duration: string;
}

interface DirectionResponse {
  search_metadata: SearchMetadata;
  search_parameters: SearchParameters;
  places_info: PlaceInfo[];
  directions: DirectionExtension[];
  durations: Duration[];
  error: string;
}
