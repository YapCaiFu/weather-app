import axios from 'axios';
import { WeatherResponse } from '../types/weatherTypes';

const BASE_URL = 'https://api.data.gov.sg/v1/environment';

const getTwoHourWeatherForecast = async (): Promise<WeatherResponse> => {
  try {
    const response = await axios.get<WeatherResponse>(`${BASE_URL}/2-hour-weather-forecast`);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export default {
  getTwoHourWeatherForecast,
};
