interface ExtraData {
  id: string;
  googleMapsUri: string;
  reviews: Review[];
}

interface Review {
  name: string;
  relativePublishTimeDescription: string;
  rating: number;
  text: LocalizedText;
  originalText: LocalizedText;
  authorAttribution: AuthorAttribution;
  publishTime: string;
}

interface LocalizedText {
  text: string;
  languageCode: string;
}

interface AuthorAttribution {
  displayName: string;
  uri: string;
  photoUri: string;
}