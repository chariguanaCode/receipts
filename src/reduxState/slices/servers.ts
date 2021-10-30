import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'reduxState/store';

export interface ServerState {
    servers: Array<{
        serverId: number;
        permissionLevel: number;
        serverName: string;
        creationTime: string;
        creatorId: number;
    }>;
}

export const serverSlice = createSlice({
    name: 'server',
    initialState: {
        servers: [],
    } as ServerState,
    reducers: {
        saveServerData(
            state,
            action: PayloadAction<{
                response: Array<{
                    serverId: number;
                    permissionLevel: number;
                    serverName: string;
                    creationTime: string;
                    creatorId: number;
                }>;
            }>
        ) {
            state.servers = action.payload.response;
        },
    },
});

export const { saveServerData } = serverSlice.actions;

export default serverSlice.reducer;

export const getServers = () => (state: RootState) => state.servers;
