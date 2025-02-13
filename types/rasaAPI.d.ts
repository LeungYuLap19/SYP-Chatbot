interface RasaResponse {
  recipient_id: string;
  custom: RasaCustom;
}

interface RasaCustom {
  message: string;
  // data: RasaFlightStatusData | ... | ... ;
  data?: RasaFlightStatusData;
}

interface RasaData {
  // response_type: "flightStatus" | "flightSearch" | "popularPlace";
  response_type: "flightStatus";
}

interface RasaFlightStatusData extends RasaData {
  flight_number: string;
  date: string;
}