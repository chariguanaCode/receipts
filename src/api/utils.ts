import { ActionCreator, AnyAction } from 'redux';
import { Selector } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from 'reduxState/store';
import { isOnline } from 'reduxState/slices/apiStatus';
import CachedRoutes from './cachedRoutes';
import { useAppDispatch, useAppSelector } from 'reduxState/hooks';

export const apiRootUrl = 'http://192.168.0.157:3003';

export enum Protocol {
    Get = 'GET',
    Post = 'POST',
    Put = 'PUT',
    Delete = 'DELETE',
}

export const fetchApi = async <Args, Result>(
    endpoint: string,
    method: Protocol,
    body: Args
) => {
    const endpointURL = new URL(apiRootUrl + endpoint);
    if (method === Protocol.Get) {
        const params: Array<[string, string]> = [];
        for (const key in body) {
            params.push([key, JSON.stringify(body[key])]);
        }

        endpointURL.search = new URLSearchParams(params).toString();
    }
    return (
        await fetch(endpointURL.toString(), {
            headers: { 'Content-Type': 'application/json' },
            method,
            body:
                method !== Protocol.Get
                    ? JSON.stringify(body ?? {})
                    : undefined,
        }).then((response) => response.json())
    ).payload as Result;
};

/* 
response: {
    status: number
    message: string
    payload: Object
}
*/

export const apiCall =
    <Args, Result>(
        endpoint: string,
        method: Protocol,
        body: Args,
        cacheAction?: ActionCreator<any>
    ): ThunkAction<Promise<Result>, RootState, unknown, AnyAction> =>
    async (dispatch, getState) => {
        if (isOnline(getState())) {
            const response = await fetchApi<Args, Result>(
                endpoint,
                method,
                body
            );
            if (cacheAction) dispatch(cacheAction(response));
            return response;
        } else {
            throw new Error('Unable to complete request: Offline');
        }
    };

export const useFetch = () => {
    const dispatch = useAppDispatch();
    return <Args, Result>(
            endpoint: string,
            method: Protocol,
            cacheAction?: ActionCreator<any>
        ) =>
        (body: Args) =>
            dispatch(
                apiCall<Args, Result>(endpoint, method, body, cacheAction)
            );
};

export const apiCachedCall =
    <Result>(
        cacheKey: CachedRoutes,
        getResponse: () => Promise<Result>,
        cacheAction: ActionCreator<any>,
        force: boolean
    ): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
    async (dispatch, getState) => {
        const state = getState();
        if (isOnline(state)) {
            if (!state.cacheAge[cacheKey].refreshed || force) {
                dispatch(cacheAction(await getResponse()));
            }
        }
    };

export const useCachedFetch = <Args, Result>(
    endpoint: CachedRoutes,
    method: Protocol,
    cacheSelector: (body: Args) => Selector<RootState, Result>,
    cacheAction: ActionCreator<any>,
    body: Args,
    force: boolean
) => {
    const dispatch = useAppDispatch();
    dispatch(
        apiCachedCall<Result>(
            endpoint,
            () => fetchApi<Args, Result>(endpoint, method, body),
            cacheAction,
            force
        )
    );
    return useAppSelector(cacheSelector(body));
};

export const useCache = <Args, Result>(
    cacheSelector: (body: Args) => Selector<RootState, Result>,
    body: Args
) => useAppSelector(cacheSelector(body));
