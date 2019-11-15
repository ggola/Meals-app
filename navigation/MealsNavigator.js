import React from 'react';
import { Text, Platform } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealScreen from '../screens/CategoryMealScreen';
import MealDetailsScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';


// ***************** STACK NAVIGATOR ****************** //
const defaultStackNavOptions = {
    //********* Other options
    //mode: 'modal',  // modal transtion
    //initialRouteName: 'MealDetail'
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
};

const MealsNavigator = createStackNavigator({
    Categories: {
        screen: CategoriesScreen
    },
    CategoryMeals: {
        screen: CategoryMealScreen
    },
    MealDetail: {
        screen: MealDetailsScreen
    }
}, {
    defaultNavigationOptions: defaultStackNavOptions
});

// ***************** TABS NAVIGATOR ****************** //
const FavNavigator =  createStackNavigator({
    Favorites: FavoritesScreen,
    MealDetail: MealDetailsScreen
}, {
    defaultNavigationOptions: defaultStackNavOptions
});

const tabScreenConfig = {
    // Tab label is as default the key (so here: Meals, Favorites)
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                // tabInfo contains the tintColor info!!
                return (
                    <Ionicons 
                        name='ios-restaurant'
                        size={25}
                        color={tabInfo.tintColor}/>
                );
            },
            tabBarColor: Colors.primaryColor,
            tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Meals</Text> : 'Meals'
        }
    },
    Favorites: {
        screen: FavNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return ( 
                    <Ionicons 
                        name='ios-star'
                        size={25}
                        color={tabInfo.tintColor}/>
                );
            },
            tabBarColor: Colors.accentColor,
            // To use custom fonts for android must set it here, cause the createMaterialBottomTabNavigator does not have the fontFamily option
            tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Favorites</Text> : 'Favorites'
        }
    }
};

const MealsTabNavigator = Platform.OS === 'android' ? 
// ANDROID TABS LOOK
createMaterialBottomTabNavigator(tabScreenConfig, 
    {
        activeColor: 'white',
        shifting: true,  // Labels shift (android)
        // barStyle: adds primaryColor to the tab bar also when shifting is false
        barStyle: {
            backgroundColor: Colors.primaryColor
        }
    }) 
// IOS TABS LOOK
: createBottomTabNavigator(tabScreenConfig, 
    {
        tabBarOptions: {
            labelStyle: {
                fontFamily: 'open-sans-bold'
            },
            activeTintColor: Colors.accentColor
    }
});


// ***************** DRAWER NAVIGATOR ****************** //
// Create Filters stack also to get the header on the filters screen
const FiltersNavigator = createStackNavigator({
    Filters: FiltersScreen
}, {
    defaultNavigationOptions: defaultStackNavOptions
});

const MainNavigator = createDrawerNavigator({
    MealsFav: {
        screen: MealsTabNavigator,
        navigationOptions: {
            drawerLabel: 'Meals'
        }
    },
    // Whatever comes after the first is the list in the drawer, now only Filters is there.
    Filters: {
        screen: FiltersNavigator,
        navigationOptions: {
            drawerLabel: 'Filters'
        }
    }
}, {
    // Styling
    contentOptions: {
        activeTintColor: Colors.accentColor,
        labelStyle: {
            fontFamily: 'open-sans-bold',
            fontSize: 15
        }
    }
});


// EXPORT: return Main Navigator -> first item: MealsFav
export default createAppContainer(MainNavigator);