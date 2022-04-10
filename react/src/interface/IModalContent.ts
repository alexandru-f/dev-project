import { ISubscription } from "./IApi";

export interface IModalContentProps {
  open: boolean;
  handleClose: () => void; 
  classes: any;
  recordToEdit: IFormState | null;
}

export type Currency = 'EUR' | 'USD' | 'JPY' | 'GBP';

export interface IFormState {
  id: number | null;
  subscriptionName: string;
  currency: Currency;
  monthlyPrice: string;
  status: number;
  payingDueDate: Date | null;
  responsibleUsers?: [];
}

export interface ICurrencies {
  label: string;
  value: string;
}

export interface IValidationObject {
  subscriptionName: string;
  monthlyPrice: string;
  payingDueDate: string;
}

export interface IObjectLiteral {
  [key: string]: any;
}