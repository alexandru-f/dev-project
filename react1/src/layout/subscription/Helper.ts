import {IValidationObject, IFormState, ICurrencies} from '../../interface/IModalContent'


export const currencies:ICurrencies[] =[{label:"$",value:"USD"},{label:"€",value:"EUR"},{value:"JPY",label:"¥"},{value:"GBP",label:"£"}];
export const licensesStatus=[{label:"Active",value:1},{label:"Inactive",value:0}];

export let initialFormValues: IFormState = {
  subscriptionName: '',
  monthlyPrice: '',
  currency: "USD",
  status: 1,
  payingDueDate: null,
  responsibleUsers: []
};

export let initialErrorValues: IValidationObject = {
  subscriptionName: '',
  monthlyPrice: '',
  payingDueDate: ''
};

export const validatePrice = (price: string) => {
  price = price.trim();
  if (!price) return "This field is required";
  return "";
}
