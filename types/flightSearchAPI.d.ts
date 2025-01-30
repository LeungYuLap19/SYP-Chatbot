interface FlightResponse {
  best_flights?: FlightOption[]; // Optional, as it's not always returned
  other_flights: FlightOption[]; // Always present if no separation occurs
  price_insights?: PriceInsights;
  airports: AirportGroup[];
}

// Flight option (used in best_flights and other_flights)
interface FlightOption {
  flights: FlightDetails[];
  layovers: Layover[];
  total_duration: number; // Total minutes of all flights and layovers
  carbon_emissions?: CarbonEmissions;
  price: number; // Ticket price in the selected currency
  type: string; // Type of the flight (e.g., "One-way", "Round trip")
  airline_logo?: string; // Logo URL for mixed airlines
  extensions?: string[]; // Features of the entire flight
  departure_token?: string; // Token for retrieving return flights
  booking_token?: string; // Token for retrieving booking options
}

// Flight details (used inside flights array)
interface FlightDetails {
  departure_airport: AirportDetails;
  arrival_airport: AirportDetails;
  duration: number; // Flight duration in minutes
  airplane: string; // Airplane model
  airline: string; // Airline name
  airline_logo?: string; // Airline logo URL
  travel_class: string; // Travel class (e.g., Economy, Business)
  flight_number: string; // Flight number
  extensions?: string[]; // Flight-specific features
  ticket_also_sold_by?: string[]; // Other sellers
  legroom?: string; // Legroom (e.g., "32 inches")
  overnight?: boolean; // True if the flight is overnight
  often_delayed_by_over_30_min?: boolean; // True if often delayed by 30+ minutes
}

// Layover details
interface Layover {
  duration: number; // Layover duration in minutes
  name: string; // Airport name
  id: string; // Airport code
  overnight?: boolean; // True if the layover is overnight
}

// Carbon emissions details
interface CarbonEmissions {
  this_flight: number; // Carbon emissions of this flight in grams
  typical_for_this_route: number; // Typical emissions for this route in grams
  difference_percent: number; // Difference in emissions as a percentage
}

// Price insights
interface PriceInsights {
  lowest_price: number; // Lowest price among returned flights
  price_level: string; // Price level of the lowest price (e.g., "Low", "High")
  typical_price_range: [number, number] | number[]; // Accept array but prefer tuples
  price_history: [number, number][] | number[][]; // Accept array of tuples or nested arrays
}

// Airport group (departure and arrival airports)
interface AirportGroup {
  departure: AirportLocation[];
  arrival: AirportLocation[];
}

// Details of an airport location
interface AirportLocation {
  airport: AirportDetails;
  city: string; // City name
  country: string; // Country name
  country_code: string; // Country code
  image?: string; // Image URL of the city
  thumbnail?: string; // Thumbnail image URL of the city
}

// Basic airport details
interface AirportDetails {
  name: string; // Airport name
  id: string; // Airport code
  time?: string; // Optional: Time (used in flights)
}
