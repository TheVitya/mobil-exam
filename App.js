import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
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
import { colors } from "./styles"

export const ROUTES = {
  LOGIN: "Login",
  HOME: "Home",
  PASSENGERS: "Passengers",
  PEOPLE: "People",
  WEATHER: "Weather",
  IRIS: "Iris",
  HOUSE_PRICING: "HousePricing",
  COUNTRIES: "Countries",
}

const Stack = createNativeStackNavigator()

export default function App() {
  function MainNavigator() {
    const { user } = useUser()
    return (
      <Stack.Navigator
        initialRouteName={user ? ROUTES.HOME : ROUTES.LOGIN}
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
        {user && <Stack.Screen name={ROUTES.HOME} component={HomeScreen} options={{ title: "Data Explorer", headerShown: false }} />}
        {user && <Stack.Screen name={ROUTES.PASSENGERS} component={PassengersScreen} options={{ title: "Titanic Passengers" }} />}
        {user && <Stack.Screen name={ROUTES.PEOPLE} component={PeopleScreen} options={{ title: "People Directory" }} />}
        {user && <Stack.Screen name={ROUTES.WEATHER} component={WeatherScreen} options={{ title: "Weather Data" }} />}
        {user && <Stack.Screen name={ROUTES.IRIS} component={IrisScreen} options={{ title: "Iris Dataset" }} />}
        {user && <Stack.Screen name={ROUTES.HOUSE_PRICING} component={HousePricingScreen} options={{ title: "House Pricing" }} />}
        {user && <Stack.Screen name={ROUTES.COUNTRIES} component={CountriesScreen} options={{ title: "Countries" }} />}
      </Stack.Navigator>
    )
  }
  return (
    <QueryProvider>
      <UserProvider>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </UserProvider>
    </QueryProvider>
  )
}
