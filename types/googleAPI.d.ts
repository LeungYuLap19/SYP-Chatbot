interface Geocoding {
  address_components: AddressComponents[];
  formatted_address: string;
  geometry: Geometry;
  place_id: string;
  types: string[];
}

interface AddressComponents {
  long_name: string;
  short_name: string;
  types: string[];
}

interface Geometry {
  bounds: {
    northeast: Northeast;
    southwest: Southwest;
  };
  location: Geo;
  location_type: string;
  viewport: {
    northeast: Northeast;
    southwest: Southwest;
  };
}

interface Geo {
  lat?: number;
  lng?: number;
}

interface Northeast extends Geo {}
interface Southwest extends Geo {}

// interface ExtraData {
//   id: string;
//   googleMapsUri: string;
//   reviews: Review[];
// }

// interface Review {
//   name: string;
//   relativePublishTimeDescription: string;
//   rating: number;
//   text: LocalizedText;
//   originalText: LocalizedText;
//   authorAttribution: AuthorAttribution;
//   publishTime: string;
// }

// interface LocalizedText {
//   text: string;
//   languageCode: string;
// }

// interface AuthorAttribution {
//   displayName: string;
//   uri: string;
//   photoUri: string;
// }