import { useQuery } from "@tanstack/react-query"
import {
  fetchPassengers,
  fetchCountries,
  fetchHousePricing,
  fetchIris,
  fetchWeather,
  fetchPeople,
} from "../api"

// Query keys
export const queryKeys = {
  passengers: ["passengers"],
  countries: ["countries"],
  housePricing: ["housePricing"],
  iris: ["iris"],
  weather: ["weather"],
  people: ["people"],
}

// Custom hooks for each data type
export const usePassengers = () => {
  return useQuery({
    queryKey: queryKeys.passengers,
    queryFn: fetchPassengers,
  })
}

export const useCountries = () => {
  return useQuery({
    queryKey: queryKeys.countries,
    queryFn: fetchCountries,
  })
}

export const useHousePricing = () => {
  return useQuery({
    queryKey: queryKeys.housePricing,
    queryFn: fetchHousePricing,
  })
}

export const useIris = () => {
  return useQuery({
    queryKey: queryKeys.iris,
    queryFn: fetchIris,
  })
}

export const useWeather = () => {
  return useQuery({
    queryKey: queryKeys.weather,
    queryFn: fetchWeather,
  })
}

export const usePeople = () => {
  return useQuery({
    queryKey: queryKeys.people,
    queryFn: fetchPeople,
  })
}
