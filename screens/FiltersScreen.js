import React, { useState, useEffect, useCallback } from 'react';
import {
    Text,
    View,
    Switch,
    Platform,
    StyleSheet
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';
import { setFilters } from '../store/actions/meals';

const FilterSwitch = props => {
    return (
        <View style={styles.filterContainer}>
            <Text style={styles.filterText}>{props.label}</Text>
            <Switch 
                trackColor={
                    {true: Colors.primaryColor}
                }
                thumbColor={Platform.OS === 'android' ? Colors.primaryColor : ''}
                value={props.state}
                onValueChange={props.onChange}
            />
        </View>
    );
};

const FiltersScreen = props => {

    const { navigation } = props;

    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);

    const dispatch = useDispatch();

    const saveFilters = useCallback(() => {
        const appliedFilters = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegan: isVegan,
            vegetarian: isVegetarian
        };
        dispatch(setFilters(appliedFilters));
        
    }, [isGlutenFree, isLactoseFree, isVegetarian, isVegan, dispatch]);

    useEffect(() => {
        navigation.setParams({
            save: saveFilters
        });
    }, [saveFilters]);

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters / Restrictions</Text>
            <FilterSwitch 
                label='Gluten-free'
                state={isGlutenFree}
                onChange={(newValue) => setIsGlutenFree(newValue)}
            />
            <FilterSwitch 
                label='Lactose-free'
                state={isLactoseFree}
                onChange={(newValue) => setIsLactoseFree(newValue)}
            />
            <FilterSwitch 
                label='Vegan'
                state={isVegan}
                onChange={(newValue) => setIsVegan(newValue)}
            />
            <FilterSwitch 
                label='Vegetarian'
                state={isVegetarian}
                onChange={(newValue) => setIsVegetarian(newValue)}
            />
        </View>
    );
};

FiltersScreen.navigationOptions = (navigationData) => {
    return {
        headerTitle: 'Filter Meals',
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
        ),
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                    title='Save' 
                    iconName='ios-save' 
                    onPress={() => {
                        // I need access to the 4 filter states! 
                        // How to get access in the navigation to the varibles defined in the functional component so we can pass them via navigation to the screen?
                        // here we retrieve a pointer to the function stored in 'save'. To execute it, add () or bind onPress to executing the function by removing () => {}
                        navigationData.navigation.getParam('save')();
                        navigationData.navigation.navigate('MealsFav');
                    }}
                />
            </HeaderButtons>
        ),
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        margin: 20,
        marginTop: 40,
        textAlign: 'center'
    },
    filterContainer: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 15
    },
    filterText: {
        fontSize: 18
    }
});

export default FiltersScreen;