import React, { useState } from 'react';
import { 
  Text, 
  View,
  StyleSheet
} from 'react-native';

// Import the REDUX Store
import {
  createStore,
  combineReducers,
  applyMiddleware    // REMOVE IN PRODUCTION
} from 'redux';
import mealsReducer from './store/reducers/meals';
import { Provider } from 'react-redux';

// TO DEBUG with react native debugger and redux - REMOVE IN PRODUCTION
import { composeWithDevTools } from 'redux-devtools-extension';

import MealsNavigator from './navigation/MealsNavigator';

import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import { useScreens } from 'react-native-screens';
useScreens();

// ************* REDUX *************
const rootReducer = combineReducers({
  meals: mealsReducer
});
// create REDUX STORE (composeWithDevTools() -> REMOVE IN PRODUCTION)
const store = createStore(rootReducer, composeWithDevTools()); 

// Load new fonts
const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return <AppLoading 
              startAsync={fetchFonts} 
              onFinish={() => setDataLoaded(true)}
              onError={(err) => console.log(err)}/>
  }

  return (
    <Provider store={store}>
      <MealsNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontFamily: 'open-sans-bold',
    fontSize: 22
  }
});
