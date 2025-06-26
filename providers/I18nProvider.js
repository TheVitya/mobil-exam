import i18n from "i18next"
import React from "react"
import { I18nextProvider, initReactI18next } from "react-i18next"

const resources = {
  en: {
    translation: {
      // Menu & Navigation
      menu: "Menu",
      profile: "Profile",
      home: "Home",
      selectLanguage: "Select Language",
      english: "English",
      hungarian: "Hungarian",
      dataExplorer: "Data Explorer",
      exploreDatasets: "Explore different datasets and visualizations",

      // HomeScreen
      titanicPassengers: "Titanic Passengers",
      titanicPassengersDesc: "Historical passenger data from the Titanic",
      peopleDirectory: "People Directory",
      peopleDirectoryDesc: "User profiles with contact information",
      weatherData: "Weather Data",
      weatherDataDesc: "Meteorological observations and forecasts",
      irisDataset: "Iris Dataset",
      irisDatasetDesc: "Botanical measurements of iris flowers",
      housePricing: "House Pricing",
      housePricingDesc: "Real estate property information",
      countries: "Countries",
      countriesDesc: "Global country information and details",

      // LoginScreen
      login: "Login",
      email: "Email",
      enterEmail: "Enter your email",
      loginButton: "Login",
      loginHint: "Use an email from the json1.txt file.",
      loginFailed: "Login Failed",
      noUserFound: "No user found with that email.",
      loadingPeople: "Loading people...",

      // ProfileScreen
      name: "Name:",
      emailLabel: "Email:",

      // CountriesScreen
      capital: "Capital:",
      region: "Region:",
      currency: "Currency:",
      phoneCode: "Phone Code:",
      domain: "Domain:",
      timezone: "Timezone",
      loadingCountries: "Loading countries...",

      // HousePricingScreen
      bedrooms: "Bedrooms",
      bathrooms: "Bathrooms",
      stories: "Stories",
      sqFt: "Sq Ft",
      features: "Features",
      mainRoad: "Main Road",
      guestRoom: "Guest Room",
      basement: "Basement",
      ac: "A/C",
      hotWater: "Hot Water",
      preferredArea: "Preferred Area",
      parking: "Parking: {{count}} spaces",
      loadingHouse: "Loading house data...",

      // IrisScreen
      iris: "Iris #{{index}}",
      sepal: "Sepal",
      length: "Length",
      width: "Width",
      petal: "Petal",
      loadingIris: "Loading iris data...",

      // PassengersScreen
      survived: "Survived",
      didNotSurvive: "Did not survive",
      class: "Class:",
      sex: "Sex:",
      age: "Age:",
      fare: "Fare:",
      embarked: "Embarked:",
      unknown: "Unknown",
      na: "N/A",
      all: "All",
      one: "1",
      two: "2",
      three: "3",
      nameLabel: "Name:",
      searchName: "Search name",
      sortBy: "Sort by:",
      cabin: "Cabin",
      nameSort: "Name",
      loadingPassengers: "Loading passengers...",

      // PeopleScreen
      contact: "Contact",
      address: "Address",
      company: "Company",

      // WeatherScreen
      day: "Day {{index}}",
      rainfall: "Rainfall",
      sunshine: "Sunshine",
      windGust: "Wind Gust",
      humidity9am: "Humidity 9am",
      humidity3pm: "Humidity 3pm",
      pressure: "Pressure",
      rainTomorrow: "Rain Tomorrow: {{value}}",
      loadingWeather: "Loading weather data...",

      // Error & Loading
      errorTitle: "Oops! Something went wrong",
      errorDefault: "An unexpected error occurred",
      tryAgain: "Try Again",
      loading: "Loading...",
    },
  },
  hu: {
    translation: {
      // Menu & Navigation
      menu: "Menü",
      profile: "Profil",
      home: "Főoldal",
      selectLanguage: "Válassz nyelvet",
      english: "Angol",
      hungarian: "Magyar",
      dataExplorer: "Adatböngésző",
      exploreDatasets: "Fedezd fel a különböző adatokat és vizualizációkat",

      // HomeScreen
      titanicPassengers: "Titanic utasok",
      titanicPassengersDesc: "Történelmi utasadatok a Titanicról",
      peopleDirectory: "Emberjegyzék",
      peopleDirectoryDesc: "Felhasználói profilok elérhetőségi adatokkal",
      weatherData: "Időjárási adatok",
      weatherDataDesc: "Meteorológiai megfigyelések és előrejelzések",
      irisDataset: "Iris adathalmaz",
      irisDatasetDesc: "Iris virágok botanikai mérései",
      housePricing: "Ingatlanárak",
      housePricingDesc: "Ingatlan információk",
      countries: "Országok",
      countriesDesc: "Globális ország információk és részletek",

      // LoginScreen
      login: "Bejelentkezés",
      email: "Email",
      enterEmail: "Add meg az emailed",
      loginButton: "Bejelentkezés",
      loginHint: "Használj egy email címet a json1.txt fájlból.",
      loginFailed: "Sikertelen bejelentkezés",
      noUserFound: "Nincs ilyen email című felhasználó.",
      loadingPeople: "Felhasználók betöltése...",

      // ProfileScreen
      name: "Név:",
      emailLabel: "Email:",

      // CountriesScreen
      capital: "Főváros:",
      region: "Régió:",
      currency: "Pénznem:",
      phoneCode: "Telefonkód:",
      domain: "Domain:",
      timezone: "Időzóna",
      loadingCountries: "Országok betöltése...",

      // HousePricingScreen
      bedrooms: "Hálószobák",
      bathrooms: "Fürdőszobák",
      stories: "Szintek",
      sqFt: "Négyzetláb",
      features: "Jellemzők",
      mainRoad: "Főút",
      guestRoom: "Vendégszoba",
      basement: "Pince",
      ac: "Légkondicionáló",
      hotWater: "Melegvíz",
      preferredArea: "Kedvelt környék",
      parking: "Parkoló: {{count}} hely",
      loadingHouse: "Ingatlanadatok betöltése...",

      // IrisScreen
      iris: "Iris #{{index}}",
      sepal: "Csészelevél",
      length: "Hossz",
      width: "Szélesség",
      petal: "Szirom",
      loadingIris: "Iris adatok betöltése...",

      // PassengersScreen
      survived: "Túlélte",
      didNotSurvive: "Nem élte túl",
      class: "Osztály:",
      sex: "Nem:",
      age: "Kor:",
      fare: "Viteldíj:",
      embarked: "Beszállás:",
      unknown: "Ismeretlen",
      na: "N/A",
      all: "Mind",
      one: "1",
      two: "2",
      three: "3",
      nameLabel: "Név:",
      searchName: "Név keresése",
      sortBy: "Rendezés:",
      cabin: "Kabinszám",
      nameSort: "Név",
      loadingPassengers: "Utasok betöltése...",

      // PeopleScreen
      contact: "Kapcsolat",
      address: "Cím",
      company: "Cég",

      // WeatherScreen
      day: "{{index}}. nap",
      rainfall: "Csapadék",
      sunshine: "Napsütés",
      windGust: "Széllökés",
      humidity9am: "Páratartalom 9-kor",
      humidity3pm: "Páratartalom 15-kor",
      pressure: "Légnyomás",
      rainTomorrow: "Holnap eső: {{value}}",
      loadingWeather: "Időjárási adatok betöltése...",

      // Error & Loading
      errorTitle: "Hoppá! Valami hiba történt",
      errorDefault: "Váratlan hiba történt",
      tryAgain: "Próbáld újra",
      loading: "Betöltés...",
    },
  },
}

if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: "en",
      fallbackLng: "en",
      interpolation: { escapeValue: false },
    })
}

export default function I18nProvider({ children }) {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
} 