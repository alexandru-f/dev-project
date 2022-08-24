import React from "react";

export interface PasswordVisibility {
  showPassword: boolean;
}

export interface PasswordAndConfirmPasswordVisibility extends PasswordVisibility {
  showConfirmPassword: boolean;
}

export enum ROLE {
  ADMIN = 'ROLE_ADMINISTRATOR',
  USER = 'ROLE_USER',
}

export interface IPrivateRoute {
  component: React.ReactElement,
  roles: Array<ROLE>
}

export type IPublicRoute = Omit<IPrivateRoute, "roles">; 
