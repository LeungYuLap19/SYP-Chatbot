interface FlightStatus {
  greatCircleDistance: GreatCircleDistance;
  departure: FlightEvent;
  arrival: FlightEvent;
  lastUpdatedUtc: string;
  number: string;
  callSign: string;
  status: string;
  codeshareStatus: string;
  isCargo: boolean;
  aircraft: Aircraft;
  airline: Airline;
  location: FlightLocation;
}

interface GreatCircleDistance {
  meter: number;
  km: number;
  mile: number;
  nm: number;
  feet: number;
}

interface FlightEvent {
  airport: Airport;
  scheduledTime: TimeDetails;
  revisedTime: TimeDetails;
  predictedTime: TimeDetails;
  runwayTime: TimeDetails;
  terminal: string;
  checkInDesk: string;
  gate: string;
  baggageBelt: string;
  runway: string;
  quality: string[];
}

interface Airport {
  icao: string;
  iata: string;
  localCode: string;
  name: string;
  shortName: string;
  municipalityName: string;
  location: GeoLocation;
  countryCode: string;
  timeZone: string;
}

interface GeoLocation {
  lat: number;
  lon: number;
}

interface TimeDetails {
  utc: string;
  local: string;
}

interface Aircraft {
  reg: string;
  modeS: string;
  model: string;
  image: AircraftImage;
}

interface AircraftImage {
  url: string;
  webUrl: string;
  author: string;
  title: string;
  description: string;
  license: string;
  htmlAttributions: string[];
}

interface Airline {
  name: string;
  iata: string;
  icao: string;
}

interface FlightLocation {
  pressureAltitude: DistanceDetails;
  altitude: DistanceDetails;
  pressure: PressureDetails;
  groundSpeed: SpeedDetails;
  trueTrack: TrackDetails;
  reportedAtUtc: string;
  lat: number;
  lon: number;
}

interface DistanceDetails {
  meter: number;
  km: number;
  mile: number;
  nm: number;
  feet: number;
}

interface PressureDetails {
  hPa: number;
  inHg: number;
  mmHg: number;
}

interface SpeedDetails {
  kt: number;
  kmPerHour: number;
  miPerHour: number;
  meterPerSecond: number;
}

interface TrackDetails {
  deg: number;
  rad: number;
}
