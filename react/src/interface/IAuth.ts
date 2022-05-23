import React from "react";

export interface PasswordVisibility {
  showPassword: boolean;
}

export interface PasswordAndConfirmPasswordVisibility extends PasswordVisibility {
  showConfirmPassword: boolean;
}
export enum Role {
  ADMIN = 'ROLE_ADMINISTRATOR',
  USER = 'ROLE_USER',
}
export interface IPrivateRouteProps {
  component: React.ComponentType,
  path?: string;
  roles: Array<Role>
}