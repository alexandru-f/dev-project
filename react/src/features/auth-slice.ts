import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {IDecodedJwt, IJWTToken, IUser, IUserState } from "../interface/IApi";
import { RootState } from '../app/store';
import jwt_decode from "jwt-decode";
import {  getUserInfoFromJwt } from '../Helpers/Helpers';


const initialState: IUserState= {
  user: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setUser: (
      state,
      {payload: user}: 
        PayloadAction<IUser>
    ) => {  
     state.user = user;
    },
    logOut: (state) => {console.log('in logout'); return initialState;} 
  },
})

export const { setUser, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user;
