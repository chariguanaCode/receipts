import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'reduxState/store';

export enum UserStatus {
    Guest,
    Authorized,
}

export type UserState =
    | {
          status: UserStatus.Authorized;
          userData: {
              login: string;
              email: string;
              userId: number;
          };
      }
    | { status: UserStatus.Guest };

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        status: UserStatus.Guest,
    } as UserState,
    reducers: {
        saveUserData(
            state,
            action: PayloadAction<{
                response: {
                    login: string;
                    email: string;
                    userId: number;
                };
            }>
        ) {
            state = {
                status: UserStatus.Authorized,
                userData: action.payload.response,
            };
        },
        logout(state) {
            state = {
                status: UserStatus.Guest,
            };
        },
    },
});

export const { saveUserData, logout } = userSlice.actions;

export default userSlice.reducer;

export const getUserStatus = () => (state: RootState) => state.user.status;
export const getUserData = () => (state: RootState) =>
    state.user.status === UserStatus.Guest ? undefined : state.user.userData;
