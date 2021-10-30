import { Protocol, useFetch, useCachedFetch, useCache } from 'api/utils';
import { getServers, saveServerData } from 'reduxState/slices/servers';
import {
    getUserData,
    getUserStatus,
    logout,
    saveUserData,
} from 'reduxState/slices/user';

export const useUser = () => {
    const fetchRedux = useFetch();

    return {
        // POST
        login: fetchRedux<
            {
                login: string;
                password: string;
            },
            {}
        >('/user/login', Protocol.Post),

        register: fetchRedux<
            {
                login: string;
                password: string;
            },
            {}
        >('/user', Protocol.Post),

        // DELETE
        logout: fetchRedux<void, {}>('/user', Protocol.Delete, logout),

        joinServer: fetchRedux<
            {
                serverId: string;
            },
            {}
        >('/user/join', Protocol.Post),

        // PUT
        update: fetchRedux<
            {
                login?: string;
                password?: string;
                email?: string;
            },
            {}
        >('/user', Protocol.Put),

        // GET (cached)
        useData: (force: boolean = false) =>
            useCachedFetch<
                void,
                | {
                      login: string;
                      email: string;
                      userId: number;
                  }
                | undefined
            >(
                '/user',
                Protocol.Get,
                getUserData,
                saveUserData,
                undefined,
                force
            ),

        useServers: (force: boolean = false) =>
            useCachedFetch<
                void,
                {
                    servers: Array<{
                        serverId: number;
                        permissionLevel: number;
                        serverName: string;
                        creationTime: string;
                        creatorId: number;
                    }>;
                }
            >(
                '/user/servers',
                Protocol.Get,
                getServers,
                saveServerData,
                undefined,
                force
            ),

        // cache only
        useStatus: () => useCache(getUserStatus, undefined),
    };
};

export default useUser;
