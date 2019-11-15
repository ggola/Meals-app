import React from 'react';
import {
    FlatList,
    StyleSheet
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { CATEGORIES } from '../data/dummy-data';

import CategoryGridTile from '../components/CategoryGridTile';

import HeaderButton from '../components/HeaderButton';

const CategoriesScreen = props => {

    const renderGridItem = (itemData) => {
        return (
            <CategoryGridTile 
                title={itemData.item.title} 
                color={itemData.item.color}
                onSelect={() => {props.navigation.navigate({
                    routeName: 'CategoryMeals',
                    params: {
                        categoryId: itemData.item.id
                    }
                })}}
            />
        );
    };

    return (
        <FlatList 
            keyExtractor={(item, index) => item.id}
            numColumns={2}
            data={CATEGORIES}
            renderItem={renderGridItem}
        />
    );
};

CategoriesScreen.navigationOptions = (navigationData) => {
    return {
        headerTitle: 'Meal Categories',
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
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'open-sans-bold',
        fontSize: 22
    },
    gridItem: {
        flex: 1,
        margin: 15,
        height: 150
    }
});

export default CategoriesScreen;