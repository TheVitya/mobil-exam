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
import { colors } from "./styles"
import { ROUTES } from "./constants"
import { Ionicons } from '@expo/vector-icons'
import I18nProvider from "./providers/I18nProvider"

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function MainTabs() {
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
      <Tab.Screen name={ROUTES.HOME} component={HomeScreen} options={{ title: "Home" }} />
      <Tab.Screen name={ROUTES.MENU} component={MenuScreen} options={{ title: "Menu" }} />
      <Tab.Screen name={ROUTES.PROFILE} component={ProfileScreen} options={{ title: "Profile" }} />
    </Tab.Navigator>
  )
}

function MainNavigator() {
  const { user } = useUser()

  return (
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
      {user && <Stack.Screen name={ROUTES.PASSENGERS} component={PassengersScreen} options={{ title: "Titanic Passengers" }} />}
      {user && <Stack.Screen name={ROUTES.PEOPLE} component={PeopleScreen} options={{ title: "People Directory" }} />}
      {user && <Stack.Screen name={ROUTES.WEATHER} component={WeatherScreen} options={{ title: "Weather Data" }} />}
      {user && <Stack.Screen name={ROUTES.IRIS} component={IrisScreen} options={{ title: "Iris Dataset" }} />}
      {user && <Stack.Screen name={ROUTES.HOUSE_PRICING} component={HousePricingScreen} options={{ title: "House Pricing" }} />}
      {user && <Stack.Screen name={ROUTES.COUNTRIES} component={CountriesScreen} options={{ title: "Countries" }} />}
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <I18nProvider>
      <QueryProvider>
        <UserProvider>
          <NavigationContainer>
            <MainNavigator />
          </NavigationContainer>
        </UserProvider>
      </QueryProvider>
    </I18nProvider>
  )
}
