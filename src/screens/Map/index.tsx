import React, { useCallback, useEffect, useState } from 'react';
import { View, ActivityIndicator, Alert, ScrollView, RefreshControl } from 'react-native';
import WeatherApi from '../../apis/WeatherApi.tsx';
import WeatherMap from '../../components/WeatherMap.tsx';
import { useAppDispatch } from '../../store';
import { setForecastList, setForecastPeriod } from '../../store/forecast/reducer.tsx';
import { Colors } from '../../theme/index.ts';
import { ForecastData } from '../../types/forecastTypes.ts';
import { styles } from './styles.ts';

const Map: React.FC = () => {
    const [forecast, setForecast] = useState<ForecastData[]>([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useAppDispatch();

    const fetchWeatherData = useCallback(async () => {
        try {
            setLoading(true);
            const data = await WeatherApi.getTwoHourWeatherForecast();
            if (data.items && data.items.length > 0) {
                const forecastList = data.items[0].forecasts.map(forecast => {
                    const location = data.area_metadata.find((meta) => meta.name === forecast.area);
                    return ({ ...forecast, label_location: location ? location.label_location : null })
                })
                dispatch(setForecastList(forecastList))
                dispatch(setForecastPeriod(data.items[0].valid_period))
                setForecast(forecastList)
            } else {
                Alert.alert('No data available');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch weather data');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchWeatherData();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.themeGreen} />
            </View>
        );
    }

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={false} onRefresh={fetchWeatherData} />
            }>
            <WeatherMap forecastList={forecast} />
        </ScrollView>
    );
};

export default Map;
