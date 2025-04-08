interface WeatherForecast {
  location: {
    name: string;
  };
  current: CurrentWeather;
  forecast: {
    forecastday: ForecastDay[];
  };
}

interface CurrentWeather {
  temp_c: number;
  is_day: number;
  condition: Condition;
}

interface Condition {
  text: string;
  icon: string;
}

interface ForecastDay {
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    condition: Condition;
  };
  hour: Hour[];
}

interface Hour {
  time: string;
  condition: Condition;
  temp_c: number;
}

declare interface FormattedDaysForecast {
  weekday: string;
  condition: Condition;
  maxtemp_c: number;
  mintemp_c: number;
  hottestHours: {
    hour: number;
    temp_c: number;
  }[];
}