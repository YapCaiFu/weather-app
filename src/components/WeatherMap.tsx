import React from 'react';
import { StyleSheet, Image, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useAppSelector } from '../store/index.tsx';
import { ForecastData } from '../types/forecastTypes.ts';
import { favouriteSelector, locationSelector } from '../store/user/selector.tsx';
import { icBookmarkMap } from '../assets/icons/index.tsx';
import { Metrics } from '../theme/index.ts';

interface WeatherMapProps {
  forecastList: ForecastData[];
}

const WeatherMap: React.FC<WeatherMapProps> = ({
  forecastList
}) => {
  const favourite = useAppSelector(favouriteSelector);
  const location = useAppSelector(locationSelector);

  const region = {
    latitude: location?.latitude !== undefined ? location?.latitude : 1.3521,
    longitude: location?.longitude !== undefined ? location?.longitude : 103.8198,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  return (
    <MapView testID="map-view" style={styles.map} initialRegion={region}>
      {forecastList.map((forecast, index) => {
        if (forecast.label_location) {
          const isFavourite = favourite.includes(forecast.area);
          return (
            <Marker
              testID={`marker-${index}`}
              pinColor={'pink'}
              key={index}
              coordinate={{
                latitude: forecast.label_location.latitude,
                longitude: forecast.label_location.longitude,
              }}
              title={forecast.area}
              description={forecast.forecast}
            >
              {isFavourite && <Image testID={`bookmark-icon-${index}`} source={icBookmarkMap} />}
            </Marker>
          );
        }
        return null;
      })}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
    height: Metrics.SCREEN_HEIGHT,
    width: Metrics.SCREEN_WIDTH,
  }
});

export default WeatherMap;
