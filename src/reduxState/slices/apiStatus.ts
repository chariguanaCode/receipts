import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'reduxState/store';

export interface ApiStatus {
    online: boolean;
}

export const apiStatusSlice = createSlice({
    name: 'apiStatus',
    initialState: {
        online: true, // change to default false once websockets are added
    } as ApiStatus,
    reducers: {
        setOnline(state) {
            state.online = true;
        },
        setOffline(state) {
            state.online = false;
        },
    },
});

export const { setOnline, setOffline } = apiStatusSlice.actions;

export default apiStatusSlice.reducer;

export const isOnline = (state: RootState) => state.apiStatus.online;
