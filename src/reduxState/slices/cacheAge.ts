import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'reduxState/store';
import { CachedRoutes, CachedRoutesList } from 'api/cachedRoutes';
import { objectMap } from 'utils';

export type CacheAgeState = {
    [key in CachedRoutes]: {
        refreshed: boolean;
        updateTime: number;
    };
};

export const cacheAgeSlice = createSlice({
    name: 'cacheAge',
    initialState: CachedRoutesList.reduce(
        (accumulator, endpoint) => ({
            ...accumulator,
            [endpoint]: { refreshed: false, updateTime: -1 },
            //consider loading from localstorage
        }),
        {}
    ) as CacheAgeState,
    reducers: {
        setCacheAge(
            state,
            action: PayloadAction<{
                endpoint: CachedRoutes;
                updateTime: number;
            }>
        ) {
            state[action.payload.endpoint] = {
                refreshed: true,
                updateTime: action.payload.updateTime,
            };
        },
        loadCacheAges(
            state,
            action: PayloadAction<{
                [key in CachedRoutes]: {
                    updateTime: number;
                };
            }>
        ) {
            state = objectMap(action.payload, (value) => ({
                refreshed: false,
                updateTime: value.updateTime,
            }));
        },
    },
});

export const { setCacheAge, loadCacheAges } = cacheAgeSlice.actions;

export default cacheAgeSlice.reducer;

export const getCacheAge = (endpoint: CachedRoutes) => (state: RootState) =>
    state.cacheAge[endpoint];
