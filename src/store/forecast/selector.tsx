import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';
import { favouriteSelector } from '../user/selector';

export const forecastListSelector = (state: RootState) => state.forecast.forecastList;

export const forecastPeriodSelector = (state: RootState) => state.forecast.forecastPeriod;

export const selectedForecastListSelector = () => createSelector(forecastListSelector,favouriteSelector, (forecastList,favourite) => {
    return forecastList.filter(forecast => favourite.includes(forecast.area));
});

