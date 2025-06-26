import i18n from "i18next"
import React from "react"
import { I18nextProvider, initReactI18next } from "react-i18next"
import { MMKV } from "react-native-mmkv"
import { MMKV_KEYS } from "../constants"

const storage = new MMKV()

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
      colorScheme: "Color Scheme",
      light: "Light",
      dark: "Dark",
      system: "System",
      navigation: "Navigation",
      aboutOurSchool: "About Our School",

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

      // AboutSchoolScreen
      schoolDescription: "Welcome to our school! We are committed to providing quality education and fostering a supportive learning environment. Our facilities include modern classrooms, well-equipped laboratories, a comprehensive library, and excellent sports facilities. We believe in nurturing both academic excellence and personal growth.",
      schoolGallery: "Take a tour of our school facilities:",
      modernFacilities: "Modern facilities",
      modernFacilitiesDesc: "Our school has modern facilities, including a computer lab, science lab.",
      learningEnvironment: "Learning environment",
      learningEnvironmentDesc: "Our school has a learning environment that is conducive to learning.",
      givingBack: "Giving back to the community",
      givingBackDesc: "Our school is committed to giving back to the community.",
      supportingCommunity: "Supporting the community",
      supportingCommunityDesc: "Our school is committed to supporting the community.",
      modernAmphitheater: "Modern amphitheater",
      modernAmphitheaterDesc: "Our school has a modern amphitheater for events and performances.",
      studentCollaboration: "Student Collaboration",
      studentCollaborationDesc: "Students working together on projects",
      hackathons: "Hackathons",
      hackathonsDesc: "Hackathons are a great way to learn new skills and build your portfolio",

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
      creator: "Creator:",
      logout: "Logout",

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
      furnished: "Furnished",
      unfurnished: "Unfurnished",
      "semi-furnished": "Semi-Furnished",

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
      male: "Male",
      female: "Female",

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
      colorScheme: "Szín téma",
      light: "Világos",
      dark: "Sötét",
      system: "Rendszer",
      navigation: "Navigáció",
      aboutOurSchool: "Az Iskolánkról",

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

      // AboutSchoolScreen
      schoolDescription: "Üdvözöljük iskolánkban! Elkötelezettek vagyunk a minőségi oktatás biztosítása és támogató tanulási környezet kialakítása mellett. Létesítményeink között szerepelnek modern tantermek, jól felszerelt laboratóriumok, átfogó könyvtár és kiváló sportlétesítmények. Hiszünk abban, hogy mind az akadémiai kiválóságot, mind a személyes fejlődést támogatni kell.",
      schoolGallery: "Tegyen egy túrát iskolai létesítményeinkben:",
      modernFacilities: "Modern létesítmények",
      modernFacilitiesDesc: "Iskolánk modern létesítményekkel rendelkezik, beleértve számítógépes laboratóriumot, tudományos laboratóriumot.",
      learningEnvironment: "Tanulási környezet",
      learningEnvironmentDesc: "Iskolánk tanulásra ösztönző környezettel rendelkezik.",
      givingBack: "Közösség támogatása",
      givingBackDesc: "Iskolánk elkötelezett a közösség támogatása mellett.",
      supportingCommunity: "Közösség támogatása",
      supportingCommunityDesc: "Iskolánk elkötelezett a közösség támogatása mellett.",
      modernAmphitheater: "Modern amfiteáter",
      modernAmphitheaterDesc: "Iskolánk modern amfiteáterrel rendelkezik eseményekhez és előadásokhoz.",
      studentCollaboration: "Diák együttműködés",
      studentCollaborationDesc: "Diákok együtt dolgoznak projekteken",
      hackathons: "Hackathonok",
      hackathonsDesc: "A hackathonok nagyszerű módja új készségek elsajátítására és portfólió építésére",

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
      creator: "Készítő:",
      logout: "Kijelentkezés",

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
      furnished: "Felszerelt",
      unfurnished: "Nem felszerelt",
      "semi-furnished": "Félig felszerelt",

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
      male: "Férfi",
      female: "Nő",

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
      lng: storage.getString(MMKV_KEYS.LANGUAGE) ?? "en",
      fallbackLng: "en",
      interpolation: { escapeValue: false },
    })
}

export default function I18nProvider({ children }) {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
} 