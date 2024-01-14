import { User, UserRole } from '@models/user';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';
import { userThunk } from './thunks';

export interface UserState extends User {
    isLogin: boolean;
    isAuth: boolean;
}

const initialState: UserState = {
    type: UserRole.GUESS,
    updatedAt: '',
    avatar: '',
    createdAt: '',
    email: '',
    fullName: '',
    isDeleted: false,
    phone: '',
    status: '',
    id: '',
    isLogin: true,
    isAuth: false,
};

const reducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetState: () => ({ ...initialState, isAuth: false, isLogin: false }),
        autoLogin: (state) => ({ ...state, isLogin: true }),
        autoLoginSuccess: (state, { payload }: PayloadAction<User>) => ({ ...state, ...payload, isLogin: true, isAuth: true }),
    },
    extraReducers: (builder) => {
        builder.addCase(userThunk.getCurrentUser.fulfilled, (state, { payload }) => {
            const { candidate, expert, wallet, ...rest } = payload;

            return { ...state, ...rest, isLogin: true, isAuth: true };
        });

        builder.addCase(userThunk.getCurrentUser.rejected, (state) => {
            return { ...state, isLogin: false, isAuth: false };
        });
    },
});
export const userActions = {
    ...reducer.actions,
};
export const userReducer = reducer.reducer;

export const useSelectUser = () =>
    createSelector(
        (state: RootState) => state.user,
        (user) => user
    );
