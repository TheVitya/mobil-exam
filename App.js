import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import QueryProvider from "./providers/QueryProvider"
import UserProvider, { useUser } from "./providers/UserProvider"
import CountriesScreen from "./screens/CountriesScreen"
import HomeScreen from "./screens/HomeScreen"
import HousePricingScreen from "./screens/HousePricingScreen"
import IrisScreen from "./screens/IrisScreen"
import PassengersScreen from "./screens/PassengersScreen"
import PeopleScreen from "./screens/PeopleScreen"
import WeatherScreen from "./screens/WeatherScreen"
import LoginScreen from "./screens/LoginScreen"
import MenuScreen from "./screens/MenuScreen"
import ProfileScreen from "./screens/ProfileScreen"
import AboutSchoolScreen from "./screens/AboutSchoolScreen"
import { ROUTES } from "./constants"
import { Ionicons } from '@expo/vector-icons'
import I18nProvider from "./providers/I18nProvider"
import { useTranslation } from "react-i18next"
import { ThemeProvider, useTheme } from './providers/ThemeProvider'
import { StatusBar } from "expo-status-bar"

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function MainTabs() {
  const { t } = useTranslation()
  const { colors } = useTheme()
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textColorSecondary,
        tabBarStyle: { backgroundColor: colors.cardColor },
        tabBarIcon: ({ color, size }) => {
          let iconName
          if (route.name === ROUTES.HOME) iconName = 'home'
          else if (route.name === ROUTES.MENU) iconName = 'menu'
          else if (route.name === ROUTES.PROFILE) iconName = 'person'
          return <Ionicons name={iconName} size={size} color={color} />
        },
      })}
    >
      <Tab.Screen name={ROUTES.HOME} component={HomeScreen} options={{ title: t("home") }} />
      <Tab.Screen name={ROUTES.MENU} component={MenuScreen} options={{ title: t("menu") }} />
      <Tab.Screen name={ROUTES.PROFILE} component={ProfileScreen} options={{ title: t("profile") }} />
    </Tab.Navigator>
  )
}

function MainNavigator() {
  const { user } = useUser()
  const { t } = useTranslation()
  const { colors, theme} = useTheme()

  return (
    <>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
      <Stack.Navigator
        initialRouteName={user ? ROUTES.MAIN_TABS : ROUTES.LOGIN}
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.textColorTertiary,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        {!user && <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} options={{ title: "Login", headerShown: false }} />}
        {user && <Stack.Screen name={ROUTES.MAIN_TABS} component={MainTabs} options={{ headerShown: false }} />}
        {user && <Stack.Screen name={ROUTES.PASSENGERS} component={PassengersScreen} options={{ title: t("titanicPassengers") }} />}
        {user && <Stack.Screen name={ROUTES.PEOPLE} component={PeopleScreen} options={{ title: t("peopleDirectory") }} />}
        {user && <Stack.Screen name={ROUTES.WEATHER} component={WeatherScreen} options={{ title: t("weatherData") }} />}
        {user && <Stack.Screen name={ROUTES.IRIS} component={IrisScreen} options={{ title: t("irisDataset") }} />}
        {user && <Stack.Screen name={ROUTES.HOUSE_PRICING} component={HousePricingScreen} options={{ title: t("housePricing") }} />}
        {user && <Stack.Screen name={ROUTES.COUNTRIES} component={CountriesScreen} options={{ title: t("countries") }} />}
        {user && <Stack.Screen name={ROUTES.ABOUT_SCHOOL} component={AboutSchoolScreen} options={{ title: t("aboutOurSchool") || "About Our School" }} />}
      </Stack.Navigator>
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <QueryProvider>
          <UserProvider>
            <NavigationContainer>
              <MainNavigator />
            </NavigationContainer>
          </UserProvider>
        </QueryProvider>
      </I18nProvider>
    </ThemeProvider>
  )
}
