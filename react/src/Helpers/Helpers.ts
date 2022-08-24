import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { IDecodedJwt } from '../interface/IApi';
import jwt_decode from 'jwt-decode';

export function isFetchBaseQueryError(
  error: unknown
): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'data' in error
}

export const getRefreshToken = () => {
  try {
        return JSON.parse(sessionStorage.getItem('refreshToken') || '');
  } catch (error) {
    return null;
  }
}

export const getAccessToken = () => {
  return sessionStorage.getItem('accessToken');
}

export const getUserInfoFromJwt = (jwt: string): IDecodedJwt => {
  return jwt_decode(jwt);
}

export const extractFirstLetter = (word: string) => {
  return word.slice(0, 1);
}