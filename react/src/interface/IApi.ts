
export interface ISubscriptionType {
  id: number;
  name: string;
  path: string;
}


export interface ISignInData {
  email: string;
  password: string;
}

export interface ISignUpData extends ISignInData{
  confirmPassword: string;
}


export interface IUserState{
 user: IUser | null;
}

export interface IUser {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  roles: Array<string>;
}

export interface IDecodedJwt {
  sub: string;
  roles: Array<string>;
  exp: number;
}

export interface IJWTToken {
  accessToken: string;
}

export interface ISubscription {
  id: number;
  subscriptionName: string;
  path: string;
  currency: string;
  price: number;
  status: boolean;
  payingDueDate: Date;
  createdAt: Date;
  updatedAt: Date | null
}

export interface ISubscriptionState {
  loading: string;
  data: ISubscription[];
}

export interface ISubNamesState {
  loading: string;
  data: ISubscriptionType[];
  errorMessage: null;
}

export interface ICompanyRegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  password: string;
  confirmPassword: string;
}

export type DeleteOrModifySubscriptionType = ISubscription | number;
