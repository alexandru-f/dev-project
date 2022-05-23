import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IAuthState, IDecodedJwt, IJWTToken } from "../interface/IApi";
import { RootState } from '../app/store';
import jwt_decode from "jwt-decode";
import {  getUserInfoFromJwt } from '../Helpers/Helpers';


const initialState: IAuthState = {
  isAuthenticated: false,
  user: {
    sub: '',
    roles: [],
    exp: 0
  },

};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setCredentials: (
      state,
      {payload: jwtToken}: 
        PayloadAction<IJWTToken>
    ) => {  
      const userInfo = getUserInfoFromJwt(jwtToken.accessToken);
      state.isAuthenticated = true;
      state.user.sub = userInfo.sub;
      state.user.roles = userInfo.roles;
      state.user.exp = userInfo.exp;
    },
    logOut: (state) => {
      sessionStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  },
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
