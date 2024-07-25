

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { icBookmark, icBookmarkActive, icMap, icMapActive, icSearch, icSearchActive } from '../assets/icons';
import Bookmark from '../screens/Bookmark';
import Search from '../screens/Search';
import Map from '../screens/Map';

export type RootTabParamList = {
    Map: undefined;
    Search: undefined;
    Bookmark: undefined;
};

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
    <Tab.Navigator initialRouteName="Map" screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#4b6336',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            switch (route.name) {
                case 'Map':
                    iconName = focused ? icMapActive : icMap;
                    break;
                case 'Bookmark':
                    iconName = focused ? icBookmarkActive : icBookmark;
                    break;
                case 'Search':
                    iconName = focused ? icSearchActive : icSearch;
                    break;
                default:
                    iconName = icBookmark;
                    break;
            }

            return <Image source={iconName} />;
        },
    })}>
        <Tab.Screen name="Map" options={{ headerShown: false, }} component={Map} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Bookmark" component={Bookmark} />
    </Tab.Navigator>
);

const AppNavigator = () => {
    return (
        <NavigationContainer>
            {TabNavigator()}
        </NavigationContainer>
    )
}

export default AppNavigator;