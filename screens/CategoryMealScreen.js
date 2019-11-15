import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { CATEGORIES } from '../data/dummy-data';
import { useSelector } from 'react-redux';

import MealList from '../components/MealList';

const CategoryMealScreen = props => {

    const catId = props.navigation.getParam('categoryId');

    //****** REDUX
    const availableMeals = useSelector((state) => state.meals.filteredMeals);

    const displayedMeals = availableMeals.filter(
        meal => meal.categoryIds.indexOf(catId) >= 0
    );

    if (displayedMeals.length === 0 || !displayedMeals) {
        return (
            <View style={styles.container}>
                <Text 
                    style={styles.text}>
                    No meals here... Check your filters
                </Text>
            </View>
        );
    }

    return (
        <MealList 
            listData={displayedMeals}
            navigation={props.navigation}
        />
    );
};


CategoryMealScreen.navigationOptions = (navigationData) => {
    const catId = navigationData.navigation.getParam('categoryId');
    const selectedCategory = CATEGORIES.find(cat => cat.id === catId);
    return {
        headerTitle: selectedCategory.title
    }
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

export default CategoryMealScreen;