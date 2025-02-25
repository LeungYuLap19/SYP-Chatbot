import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod";
import qs from "query-string";
import { toast } from "@/hooks/use-toast";
import dayjs from 'dayjs';
import { placeSearchCategories } from "@/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function showToast({ title, description }: ShowToastParams) {
  toast({
    title: title,
    description: description,
  });
}

export const handleKeyDown = ({event, func}: HandleKeyDownParams) => {
  if (event.key === 'Enter') {
    func();
  }
};

// form schemas
export const authFormSchema = (type: 'sign-in' | 'sign-up') => z.object({
  username: type === 'sign-in' ? z.string().optional() : z.string().min(5).max(20),
  email: z.string().email(),
  password: z.string().min(8),
});

export function formUrlQuery({ params, query, extraRoute }: formUrlQueryParams) {
  const currentUrl = qs.parse(params);

  const newQueryParams = { ...currentUrl, ...query };

  return qs.stringifyUrl(
    {
      url: window.location.pathname + (extraRoute || ''),
      query: newQueryParams,
    },
    { skipNull: true }
  );
}

export function categorizeChatrooms(chatrooms: Chatroom[]): Record<'today' | 'yesterday' | 'previous7days', Chatroom[]> {
  const today = dayjs().startOf('day');
  const yesterday = today.subtract(1, 'day');
  const sevenDaysAgo = today.subtract(7, 'day');

  // Initialize the categories
  type CategoryKey = 'today' | 'yesterday' | 'previous7days';
  const categories: Record<CategoryKey, Chatroom[]> = {
    today: [],
    yesterday: [],
    previous7days: []
  };

  // Loop through each chatroom and categorize
  chatrooms.forEach(chatroom => {
    const lastMessageTime = dayjs(chatroom.last_message_datetime);

    if (lastMessageTime.isAfter(today)) {
      // Chatroom's last message is from today
      categories.today.push(chatroom);
    } else if (lastMessageTime.isAfter(yesterday)) {
      // Chatroom's last message is from yesterday
      categories.yesterday.push(chatroom);
    } else if (lastMessageTime.isAfter(sevenDaysAgo)) {
      // Chatroom's last message is from the last 7 days
      categories.previous7days.push(chatroom);
    }
  });

  // Sort each category by datetime (latest first)
  Object.keys(categories).forEach((category) => {
    const key = category as CategoryKey; // Explicitly cast the string to CategoryKey
    categories[key] = categories[key].sort((a, b) =>
      dayjs(b.last_message_datetime).diff(dayjs(a.last_message_datetime))
    );
    
    // Sort messages within each chatroom
    categories[key].forEach((chatroom) => {
      chatroom.messages = chatroom.messages.sort((a, b) =>
        dayjs(b.datetime).diff(dayjs(a.datetime))
      );
    });
  });

  return categories;
}

export function formatDate(localDate: string) {
  const date = new Date(localDate);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();

  const suffix = (day: number) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  }
  return `${day}${suffix(day)} ${month} ${year}`;
}

export function formatTime(localDate: string) {
  const date = new Date(localDate); 
  const hours = String(date.getHours()).padStart(2, '0'); 
  const minutes = String(date.getMinutes()).padStart(2, '0'); 
  return `${hours}:${minutes}`;
}

export function getDuration(localDate1: string, localDate2: string) {
  // Parse the date strings while preserving the time zone information
  const date1 = new Date(localDate1);
  const date2 = new Date(localDate2);

  // Convert both times to UTC before calculating the difference
  const utc1 = date1.getTime();
  const utc2 = date2.getTime();

  // Calculate the difference in milliseconds
  const diff = utc2 - utc1;

  // Convert to hours and minutes
  const hours = Math.floor(Math.abs(diff) / 1000 / 60 / 60);
  const minutes = Math.floor(Math.abs(diff) / 1000 / 60 % 60);

  return `${hours}h ${minutes}m`;
}

export function getDurationWithMinutes(duration: number) {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours}h ${minutes}m`;
}

export function sortFlightSearch(flightSearchResult: FlightResponse): FlightResponse {
  const combinedFlights: FlightOption[] = (flightSearchResult.best_flights || []).concat(flightSearchResult.other_flights);
  
  const nonStopFlights: FlightOption[] = combinedFlights.filter(flight => !flight.layovers).sort((a, b) => a.price - b.price);
  const stopFlights: FlightOption[] = combinedFlights.filter(flight => flight.layovers).sort((a, b) => a.price - b.price);

  const sortedFlights: FlightOption[] = [...nonStopFlights, ...stopFlights];
  return {
    ...flightSearchResult,
    sortedFlights: sortedFlights
  };
}

export function get12HoursForecast(forecastday: ForecastDay[]): Hour[] {
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const currentDay = currentDate.getDate();

  const allHours = forecastday.flatMap(day => day.hour);

  const next12Hours = allHours.filter(hour => {
    const hourDate = new Date(hour.time);
    const hourDay = hourDate.getDate();
    const hourHour = hourDate.getHours();

    // Check if the hour is within the next 12 hours
    return (
      (hourDay === currentDay && hourHour >= currentHour) ||
      (hourDay === currentDay + 1 && hourHour < currentHour)
    );
  }).slice(0, 12);

  // Format the time to 12-hour format
  const formattedNext12Hours = next12Hours.map((hour, index) => {
    if (index == 0) {
      return {
        ...hour,
        time: 'Now'
      }
    }
    const hourDate = new Date(hour.time);
    let hours = hourDate.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    const strTime = `${hours}${ampm}`;
    return {
      ...hour,
      time: strTime,
    };
  });

  return formattedNext12Hours;
}

export function getIdsOrLabelByCategory(
  categoryName: 
  "popularPlaces" | "restaurantSearch" | "dessertSearch" | "cafeSearch" | "barSearch" | "nightMarketSearch" | "entertainmentSearch" | "shoppingSearch",
  Ids: boolean
): number[] | string | null {
  const category = placeSearchCategories.find(cat => cat.category === categoryName);
  if (Ids) {
    return category ? category.ids ?? [] : [];  
  } else {
    return category?.label ?? null; 
  }
}