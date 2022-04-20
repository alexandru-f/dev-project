export interface ISubscriptionType {
  id: number;
  name: string;
  path: string;
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

export interface CompanyRegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  password: string;
  confirmPassword: string;
}

export type DeleteOrModifySubscriptionType = ISubscription | number;