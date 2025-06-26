import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import QueryProvider from "./providers/QueryProvider"
import HomeScreen from "./screens/HomeScreen"
import PassengersScreen from "./screens/PassengersScreen"
import PeopleScreen from "./screens/PeopleScreen"
import WeatherScreen from "./screens/WeatherScreen"
import IrisScreen from "./screens/IrisScreen"
import HousePricingScreen from "./screens/HousePricingScreen"
import CountriesScreen from "./screens/CountriesScreen"

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <QueryProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#6366f1",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Data Explorer" }} />
          <Stack.Screen name="Passengers" component={PassengersScreen} options={{ title: "Titanic Passengers" }} />
          <Stack.Screen name="People" component={PeopleScreen} options={{ title: "People Directory" }} />
          <Stack.Screen name="Weather" component={WeatherScreen} options={{ title: "Weather Data" }} />
          <Stack.Screen name="Iris" component={IrisScreen} options={{ title: "Iris Dataset" }} />
          <Stack.Screen name="HousePricing" component={HousePricingScreen} options={{ title: "House Pricing" }} />
          <Stack.Screen name="Countries" component={CountriesScreen} options={{ title: "Countries" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryProvider>
  )
}
