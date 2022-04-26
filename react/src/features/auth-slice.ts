import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IAuthState, IDecodedJwt } from "../interface/IApi";
import { RootState } from '../app/store';
import jwt_decode from "jwt-decode";


const initialState: IAuthState = {
  user: '',
  roles: [],
  tokenInfo: {
    accessToken: '',
    refreshToken: '',
    expirationDate: 0,
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setCredentials: (
      state,
      { payload: { accessToken, refreshToken } }: PayloadAction<{ accessToken: string, refreshToken: string, }>
    ) => {
      const decodedJwt: IDecodedJwt = jwt_decode(accessToken);
      state.tokenInfo.accessToken = accessToken;
      state.tokenInfo.refreshToken = refreshToken;
      state.roles = decodedJwt.roles;
      state.tokenInfo.expirationDate = decodedJwt.exp
      state.user = decodedJwt.sub;
    },
  },
})

export const { setCredentials } = authSlice.actions

export default authSlice.reducer

// export const selectCurrentUser = (state: RootState) => state.auth.user
