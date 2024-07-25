import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CurrentLocation } from '../../types/locationTypes';

interface UserState {
    favourite: string[];
    location: CurrentLocation;
}

const initialState: UserState = {
    favourite: [],
    location: {},
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLocation: (state, action: PayloadAction<CurrentLocation>) => {
            state.location = action.payload;
        },
        toggleFavourite: (state, action: PayloadAction<string>) => {
            const area = action.payload;
            if (state.favourite.includes(area)) {
                state.favourite = state.favourite.filter(item => item !== area);
            } else {
                state.favourite.push(area);
            }
        },
    },
});

export const { setLocation, toggleFavourite } = userSlice.actions;

export default userSlice.reducer;
