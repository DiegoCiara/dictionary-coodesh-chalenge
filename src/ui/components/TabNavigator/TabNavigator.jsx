import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import WordsDetailScreen from "../../../screens/WordsDetailScreen";
import HistoryScreen from "../../../screens/HistoryScreen";

const Tab = createBottomTabNavigator();
const isIOS = Platform.OS === 'ios'


function TabNavigator() {

  const Screens = [
    {
      name: 'Home',
      screen: 'Home',
      component: WordsDetailScreen,
    },
  ]
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          display: 'none', // Isso esconde a barra de navegação inferior
        },
      }}>
      {/* Outras abas conforme necessário */}
      {Screens.map((e) => (
        <Tab.Screen name={e.screen}

          options={{
            title: e.name,
            headerStyle: {
              backgroundColor: '#0e0e0e',
              borderBottomWidth: 0, // Remove a linha de borda para iOS e Android
              shadowOpacity: 0, // Remove sombra para iOS
              elevation: 0,
            },
            headerTintColor: isIOS ? null : 'white',
            // headerTintColor: 'white',
            headerShown: e.name === "Home" ? false : true,
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#fff',
            },
          }}
          component={e.component}
        />
      ))}
    </Tab.Navigator>
  );
}


export default TabNavigator