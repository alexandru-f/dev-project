export interface IModalContentProps {
  open: boolean,
  handleClose: () => void, 
  classes: any,
  // handleChildFormSubmit: () => void
}

type Currency = 'EUR' | 'USD' | 'JPY' | 'GBP';
export interface IFormState {
  subscriptionName: string,
  currency: Currency,
  monthlyPrice: string,
  status: number,
  payingDueDate: Date | null,
  responsibleUsers?: []
}

export interface IValidationObject {
  subscriptionName: string,
  monthlyPrice: string,
  payingDueDate: string
}

export interface ObjectLiteral {
  [key: string]: any;
}