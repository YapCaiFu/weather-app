import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ForecastData, ForecastPeriod } from '../../types/forecastTypes';

interface ForeCastState {
    forecastList: ForecastData[];
    forecastPeriod: ForecastPeriod;
}

const initialState: ForeCastState = {
    forecastList: [],
    forecastPeriod: {}
};

export const forecastSlice = createSlice({
    name: 'forecast',
    initialState,
    reducers: {
        setForecastList: (state, action: PayloadAction<ForecastData[]>) => {
            state.forecastList = action.payload
        },
        setForecastPeriod: (state, action: PayloadAction<ForecastPeriod>) => {
            state.forecastPeriod = action.payload
        },
    },
});

export const { setForecastList, setForecastPeriod } = forecastSlice.actions;

export default forecastSlice.reducer;
