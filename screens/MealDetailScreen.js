import React, { useEffect, useCallback } from 'react';
import {
    Text,
    View,
    ScrollView,
    Image,
    StyleSheet
} from 'react-native';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../store/actions/meals'; 

import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';

const ListItem = props => {
    return (
        <View style={styles.listItem}>
            <DefaultText>{props.children}</DefaultText>
        </View>
    );
}

const MealDetailsScreen = props => {

    const mealId = props.navigation.getParam('mealId');
    
    const meals = useSelector((state) => state.meals.meals);
    const currentMeal = meals.find(
        meal => meal.id === mealId
    );

    // Check if current item is in favMeals
    const isMealInFav = useSelector((state) => state.meals.favoriteMeals.some(meal => meal.id === currentMeal.id));

    // ******** REDUX: DISPATCH ACTION
    const dispatch = useDispatch();
    const toggleFavoriteHandler = useCallback((isInFav) => {
        dispatch(toggleFavorite(currentMeal.id));
        props.navigation.setParams({
            isInFav: !isInFav
        });
    }, [dispatch, mealId]);

    useEffect(() => {
        props.navigation.setParams({
            toggleFavorite: toggleFavoriteHandler
        });
    }, [toggleFavoriteHandler]);

    // Pass info if meal is in fav
    useEffect(() => {
        props.navigation.setParams({
            isInFav: isMealInFav
        });
    }, [isMealInFav]);
    
    return (
        <ScrollView style={{flex: 1}}>
            <Image 
                style={styles.image} 
                source={{uri: currentMeal.imageUrl}}/>
            <View style={styles.details}>
                <DefaultText>{currentMeal.duration} min</DefaultText>
                <DefaultText>{currentMeal.complexity.toUpperCase()}</DefaultText>
                <DefaultText>{currentMeal.affordability.toUpperCase()}</DefaultText>
            </View>
            <Text style={styles.title}>Ingredients</Text> 
            {currentMeal.ingredients.map(ingredient => 
                <ListItem key={ingredient}>{ingredient}</ListItem>
            )}
            <Text style={styles.title}>Steps</Text> 
            {currentMeal.steps.map(step => 
                <ListItem key={step}>{step}</ListItem>
            )}
        </ScrollView>
    );
};

MealDetailsScreen.navigationOptions = (navigationData) => {

    const currentMealTitle = navigationData.navigation.getParam('mealTitle');
    const toggleFunction = navigationData.navigation.getParam('toggleFavorite');
    const isInFav = navigationData.navigation.getParam('isInFav');

    return {
        //headerTitle: currentMeal.title,
        headerTitle: currentMealTitle,
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                    title='Favorite' 
                    iconName={isInFav ? 'ios-star' : 'ios-star-outline'} 
                    onPress={() => {
                        toggleFunction(isInFav);
                    }}
                />
            </HeaderButtons>
        )
    }
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200
    },
    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    title: {
        fontFamily: 'open-sans-bold',
        textAlign: 'center',
        fontSize: 22,
        margin: 10
    },
    listItem: {
        marginHorizontal: 20,
        marginVertical: 5,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10
    }
});

export default MealDetailsScreen;