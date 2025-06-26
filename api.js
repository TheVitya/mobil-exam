import ky from "ky"

export const JSON_FILES = {
  PASSENGERS: "https://people.vts.su.ac.rs/~probi/MobilProg/vizsga/Adatok/converted-file.json",
  COUNTRIES: "https://people.vts.su.ac.rs/~probi/MobilProg/vizsga/Adatok/countries.json",
  HOUSE_PRICING: "https://people.vts.su.ac.rs/~probi/MobilProg/vizsga/Adatok/house-price-parquet.json",
  IRIS: "https://people.vts.su.ac.rs/~probi/MobilProg/vizsga/Adatok/iris-parquet.json",
  WEATHER: "https://people.vts.su.ac.rs/~probi/MobilProg/vizsga/Adatok/weather-parquet.json",
  PEOPLE: "https://people.vts.su.ac.rs/~probi/MobilProg/vizsga/Adatok/json1.txt",
}

const api = ky.create({
  timeout: 10000,
  retry: 2,
})

const transformData = (data) => {
  const jsonArray = data
    .trim()
    .split("\n")
    .filter((line) => line.trim())
    .map((line) => JSON.parse(line))

  return jsonArray
}

export const fetchPassengers = async () => {
  try {
    const data = transformData(await (await api.get(JSON_FILES.PASSENGERS)).text())
    return data
  } catch (error) {
    console.error("Error fetching passengers:", error)
    throw error
  }
}

export const fetchCountries = async () => {
  try {
    const data = await api.get(JSON_FILES.COUNTRIES).json()
    return data
  } catch (error) {
    console.error("Error fetching countries:", error)
    throw error
  }
}

export const fetchHousePricing = async () => {
  try {
    const data = transformData(await (await api.get(JSON_FILES.HOUSE_PRICING)).text())
    return data
  } catch (error) {
    console.error("Error fetching house pricing:", error)
    throw error
  }
}

export const fetchIris = async () => {
  try {
    const data = transformData(await (await api.get(JSON_FILES.IRIS)).text())
    return data
  } catch (error) {
    console.error("Error fetching iris data:", error)
    throw error
  }
}

export const fetchWeather = async () => {
  try {
    const data = transformData(await (await api.get(JSON_FILES.WEATHER)).text())
    return data
  } catch (error) {
    console.error("Error fetching weather data:", error)
    throw error
  }
}

export const fetchPeople = async () => {
  try {
    const data = await api.get(JSON_FILES.PEOPLE).json()
    return data
  } catch (error) {
    console.error("Error fetching people data:", error)
    throw error
  }
}
