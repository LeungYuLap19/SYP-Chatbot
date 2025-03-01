interface RasaResponse {
  recipient_id: string;
  custom: RasaCustom;
}

interface RasaCustom {
  message: string;
  data?: RasaFlightStatusData | RasaPlaceData | RasaFlightsSearchData | RasaWeatherData | RasaHotelSearchData;
}

interface RasaData {
  response_type: "flightStatus" | "flightSearch" | "hotelSearch" | "popularPlaces" | "weather" | "restaurantSearch" | "dessertSearch" | "cafeSearch" | "barSearch" | "nightMarketSearch" | "entertainmentSearch" | "shoppingSearch";
}

interface RasaFlightStatusData extends RasaData {
  flight_number: string;
  date: string;
}

interface RasaPlaceData extends RasaData {
  location: string;
}

interface RasaFlightsSearchData extends RasaData {
  departure: string;
  arrival: string;
  date: string;
}

interface RasaWeatherData extends RasaData {
  location: string;
}

interface RasaHotelSearchData extends RasaData {
  location: string;
  check_in: string;
  check_out: string;
}