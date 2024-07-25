import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';

export const favouriteSelector = (state: RootState) => state.user.favourite;

export const locationSelector = (state: RootState) => state.user.location;
