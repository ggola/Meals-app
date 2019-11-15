import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Colors from '../constants/Colors';
import DefaultText from '../components/DefaultText';

const MealItem = props => {
    return (
        <View style={styles.mealItem}>
            <TouchableOpacity
                onPress={props.onSelectMeal}>
                <View>
                    <View style={{...styles.mealRow, ...styles.mealHeader}}>
                        <ImageBackground 
                            style={styles.bgImage}
                            source={{uri: props.image}}>
                            <View style={styles.titleContainer}>
                                <Text 
                                    style={styles.title}
                                    numberOfLines={1}>
                                    {props.title}
                                </Text>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={{...styles.mealRow, ...styles.mealDetail}}>
                        <DefaultText>{props.duration} min</DefaultText>
                        <DefaultText>{props.complexity.toUpperCase()}</DefaultText>
                        <DefaultText>{props.affordability.toUpperCase()}</DefaultText>
                    </View>   
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    mealItem: {
        marginVertical: 10,
        marginHorizontal: '2.5%',
        height: 200,
        width: '95%',
        backgroundColor: '#eee',
        borderRadius: 10,
        overflow: 'hidden'  // to make the image respect the border radius
    },
    mealRow: {
        flexDirection: 'row'
    },
    mealHeader: {
        height: '85%'
    },
    mealDetail: {
        height: '15%',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    bgImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end'
    },
    titleContainer: {
        backgroundColor: 'rgba(255,255,255,0.8)',
        paddingVertical: 5,
        paddingHorizontal: 12
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        color: Colors.primaryColor,
        textAlign: 'center'
    }
});

export default MealItem;