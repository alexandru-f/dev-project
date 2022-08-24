import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {IUser, IUserState } from "../interface/IApi";
import { RootState } from '../app/store';


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
    logOut: (state) => initialState 
  },
})

export const { setUser, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user;
