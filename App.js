import { StatusBar } from 'react-native'
import { useFonts } from 'expo-font'
//components
import ScreenAuthFlow from './screens/auth/ScreenAuthFlow'
//Redux
import { Provider } from 'react-redux'
import store from './redux/store'
//navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
//define stack
const Stack = createNativeStackNavigator();

const getFonts = () => {
  return Font.loadAsync({
    'primary-regular' : require('./assets/fonts/brandon-regular.otf'),
    'primary-medium' : require('./assets/fonts/brandon-medium.otf'),
    'primary-bold' : require('./assets/fonts/brandon-bold.otf'),
    'hero' : require('./assets/fonts/engravers-gothic.ttf')
  })
}


export default function App() {

  const [fontsLoaded] = useFonts({
    'primary-regular' : require('./assets/fonts/brandon-regular.otf'),
    'primary-medium' : require('./assets/fonts/brandon-medium.otf'),
    'primary-bold' : require('./assets/fonts/brandon-bold.otf'),
    'hero' : require('./assets/fonts/engravers-gothic.ttf')
  })

  if (!fontsLoaded){
    return null
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
      <StatusBar barStyle="light-content" />
        <Stack.Navigator>
          <Stack.Screen
            name="AuthFlow"
            component={ScreenAuthFlow}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

