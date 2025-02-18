interface RasaResponse {
  recipient_id: string;
  custom: RasaCustom;
}

interface RasaCustom {
  message: string;
  data?: RasaFlightStatusData | RasaPopularPlaceData | RasaFlightsSearchData;
}

interface RasaData {
  response_type: "flightStatus" | "flightSearch" | "popularPlaces";
}

interface RasaFlightStatusData extends RasaData {
  flight_number: string;
  date: string;
}

interface RasaPopularPlaceData extends RasaData {
  location: string;
}

interface RasaFlightsSearchData extends RasaData {
  departure: string;
  arrival: string;
  date: string;
}