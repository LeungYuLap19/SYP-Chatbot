interface RasaResponse {
  recipient_id: string;
  custom: RasaCustom;
}

interface RasaCustom {
  message: string;
  data?: RasaFlightStatusData | RasaPlaceData | RasaFlightsSearchData | RasaWeatherData;
}

interface RasaData {
  response_type: "flightStatus" | "flightSearch" | "popularPlaces" | "weather" | "restaurantSearch" | "dessertSearch" | "cafeSearch" | "barSearch" | "nightMarketSearch" | "entertainmentSearch" | "shoppingSearch";
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