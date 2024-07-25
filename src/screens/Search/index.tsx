import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, FlatList, Image, Pressable, RefreshControl, Text, TextInput, View } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { RootTabParamList } from "../../navigation/AppNavigator";
import { icClose, icDown, icRefresh, icUp } from "../../assets/icons";
import { forecastListSelector, forecastPeriodSelector } from "../../store/forecast/selector";
import { useAppDispatch, useAppSelector } from "../../store";
import Geolocation from '@react-native-community/geolocation';
import { setLocation, toggleFavourite } from "../../store/user/reducer";
import { favouriteSelector, locationSelector } from "../../store/user/selector";
import { calcCrow, formatValidPeriod } from "../../utils/utils";
import ForecastCard from "../../components/ForecastCard";
import { styles } from "./styles";
import { Colors, MainStyle } from "../../theme";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

type NavigationProps = BottomTabScreenProps<RootTabParamList, 'Search'>;
type SortType = 'Default' | 'Distance' | 'Alphabet'

const Search: React.FC = () => {
  const navigation = useNavigation<NavigationProps['navigation']>();
  const forecastList = useAppSelector(forecastListSelector);
  const forecastPeriod = useAppSelector(forecastPeriodSelector);
  const location = useAppSelector(locationSelector);
  const favourite = useAppSelector(favouriteSelector);
  const [favouriteList, setFavouriteList] = useState(favourite);
  const [searchKeyWord, setSearchKeyWord] = useState('');
  const [sortType, setSortType] = useState<SortType>('Default');
  const [order, setOrder] = useState<boolean | null>(null);
  const dispatch = useAppDispatch();
  const [grantedLocation, setGrantedLocation] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setFavouriteList([...favourite])
    }
  }, [isFocused])

  const getPosition = useCallback(async () => {
    Geolocation.getCurrentPosition(
      position => {
        setGrantedLocation(true);
        dispatch(setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude }));
      },
      error => {
        Alert.alert(error.message)
        setGrantedLocation(false);
        dispatch(setLocation({}));
      },
      { enableHighAccuracy: false, },
    );
  }, [dispatch]);

  useEffect(() => {
    getPosition();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerBackground: () => <View style={styles.headerContainer} />,
      headerTitle: () => (
        <TextInput
          value={searchKeyWord}
          placeholder="Search by Area..."
          placeholderTextColor={Colors.White}
          style={styles.searchLabel}
          onChangeText={setSearchKeyWord}
        />
      ),
      headerTitleAlign: 'left',
      headerRight: () => (
        searchKeyWord.trim() !== '' && (
          <Pressable style={{ marginRight: 10 }} onPress={() => setSearchKeyWord('')}>
            <Image source={icClose} width={10} height={10} />
          </Pressable>
        )
      ),
    });
  }, [navigation, searchKeyWord]);

  const onHandleFavourite = useCallback((area: string) => {
    setFavouriteList(prevList =>
      prevList.includes(area)
        ? prevList.filter(item => item !== area)
        : [...prevList, area]
    );
    dispatch(toggleFavourite(area));
  }, [dispatch]);

  const filteredForecastList = useMemo(() => {
    const lowercasedKeyword = searchKeyWord.trim().toLowerCase();
    let filteredList = forecastList.filter(forecast =>
      forecast.area.trim().toLowerCase().includes(lowercasedKeyword)
    );
    if (sortType === 'Alphabet') {
      filteredList.sort((a, b) => {
        const comparison = a.area.localeCompare(b.area);
        return order ? comparison : -comparison;
      });
    } else if (sortType === 'Distance') {
      filteredList.sort((c, d) => {
        const comparison = calcCrow(c.label_location?.latitude, c.label_location?.longitude, location?.latitude, location?.longitude)
          - calcCrow(d.label_location?.latitude, d.label_location?.longitude, location?.latitude, location?.longitude);
        return order ? comparison : -comparison;
      });
    }

    return filteredList;
  }, [searchKeyWord, forecastList, sortType, order, location]);

  const handleSortPress = useCallback(async (type: SortType) => {
    if (type === 'Distance' && !grantedLocation) {
      Alert.alert('Please grant location permission');
    } else {
      if (sortType === type) {
        setOrder(!order);
      } else {
        setOrder(true);
      }
      setSortType(type);
    }
  }, [grantedLocation, sortType, order]);

  const renderContent = useCallback(() => (
    <FlatList
      contentContainerStyle={MainStyle.flatListContainer}
      data={filteredForecastList}
      initialNumToRender={12}
      renderItem={({ item }) => (
        <ForecastCard
          area={item.area}
          forecast={item.forecast}
          latitude={item.label_location?.latitude}
          longitude={item.label_location?.longitude}
          isFavourite={favouriteList.includes(item.area)}
          onToggleFavourite={() => onHandleFavourite(item.area)}
        />
      )}
      ItemSeparatorComponent={() => <View style={MainStyle.separator} />}
      showsVerticalScrollIndicator={false}
    />
  ), [filteredForecastList, favouriteList, onHandleFavourite]);

  const renderSubheader = useCallback(() => (
    <View style={styles.subheaderContainer}>
      <View style={styles.subheaderLeftContainer}>
        {['Default', 'Distance', 'Alphabet'].map(type => (
          <Pressable
            key={type}
            onPress={() => handleSortPress(type as SortType)}
            style={styles.buttonContainer}
          >
            <Text style={[
              styles.buttonLabel,
              sortType === type && styles.buttonActiveLabel
            ]}>{type}</Text>
            {sortType === type && type !== 'Default' && order !== null && (
              <Image source={order ? icDown : icUp} />
            )}
          </Pressable>
        ))}
      </View>
      <View style={styles.subheaderRightContainer}>
        <Pressable onPress={() => getPosition()} style={styles.buttonContainer}>
          <Image source={icRefresh} />
          <Text style={styles.buttonLabel}>Current Location</Text>
        </Pressable>
      </View>
    </View>
  ), [order, sortType, getPosition, handleSortPress]);

  return (
    <View style={MainStyle.overallContainer}>
      {renderSubheader()}
      <View style={styles.subheader2Container}>
        <Text style={MainStyle.resultLabel}>{forecastPeriod.start && forecastPeriod.end && formatValidPeriod(forecastPeriod)}</Text>
        <Text style={MainStyle.resultLabel}>{filteredForecastList.length} Results</Text>
      </View>
      {renderContent()}
    </View>
  );
};

export default Search;
