import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MealList from '../components/MealList';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { useSelector } from 'react-redux';

import HeaderButton from '../components/HeaderButton';

const FavoritesScreen = props => {
    
    // ******* REDUX
    const favMeals = useSelector((state) => state.meals.favoriteMeals);    

    if (favMeals.length === 0 || !favMeals) {
        return (
            <View style={styles.container}>
                <Text 
                    style={styles.text}>
                    No Favorite meals... Start adding some!
                </Text>
            </View>
        );
    }

    return (
        <MealList 
            listData={favMeals}
            navigation={props.navigation}
        />
    );
};

FavoritesScreen.navigationOptions = (navigationData) => {
    return {
        headerTitle: 'Your Favorites',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                    title='Menu' 
                    iconName='ios-menu' 
                    onPress={() => {
                        navigationData.navigation.toggleDrawer()
                    }}
                />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        textAlign: 'center'
    }
});

export default FavoritesScreen;