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

export type DeleteOrModifySubscriptionType = ISubscription | number;