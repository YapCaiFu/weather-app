import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { selectedForecastListSelector } from "../../store/forecast/selector";
import { useAppDispatch, useAppSelector } from "../../store";
import { toggleFavourite } from "../../store/user/reducer";
import { favouriteSelector } from "../../store/user/selector";
import ForecastCard from "../../components/ForecastCard";
import { Colors, MainStyle } from "../../theme";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { ForecastData } from "../../types/forecastTypes";
import { styles } from "./styles";
import { RootTabParamList } from "../../navigation/AppNavigator";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

type NavigationProps = BottomTabScreenProps<RootTabParamList, 'Bookmark'>;

const Bookmark: React.FC = () => {
  const navigation = useNavigation<NavigationProps['navigation']>();
  const selectedForecastList = useAppSelector(selectedForecastListSelector());
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

  const [forecastList, setForecastList] = useState<ForecastData[]>([]);
  const [favouriteList, setFavouriteList] = useState<string[]>([]);

  useEffect(() => {
    if (isFocused) {
      setForecastList([...selectedForecastList]);
      setFavouriteList([...selectedForecastList.map(forecast => forecast.area)]);
    }
  }, [isFocused]);

  useEffect(() => {
    navigation.setOptions({
      headerBackground: () => <View style={styles.headerContainer} />,
      headerTitle: "Bookmark",
      headerTitleStyle: styles.headerLabel
    });
  }, [navigation]);

  const onHandleFavourite = (area: string) => {
    setFavouriteList(prevList =>
      prevList.includes(area)
        ? prevList.filter(item => item !== area)
        : [...prevList, area]
    );
    dispatch(toggleFavourite(area));
  };

  const renderItem = ({ item }: { item: ForecastData }) => (
    <ForecastCard
      area={item.area}
      forecast={item.forecast}
      latitude={item.label_location?.latitude}
      longitude={item.label_location?.longitude}
      isFavourite={favouriteList.includes(item.area)}
      onToggleFavourite={() => onHandleFavourite(item.area)}
    />
  );

  if (forecastList.length === 0)
    return (<View style={styles.emptyContainer}>
      <Text style={styles.emptyLabel}>No Bookmark</Text>
    </View>)
  return (
    <View style={MainStyle.overallContainer}>
      <View style={MainStyle.subheader2Container}>
        <Text style={MainStyle.resultLabel}>{forecastList.length} Results</Text>
      </View>
      <FlatList
        contentContainerStyle={MainStyle.flatListContainer}
        data={forecastList}
        initialNumToRender={12}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={MainStyle.separator} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Bookmark;
