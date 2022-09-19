import { ISubscription } from "./IApi";

export interface EnhancedTableToolbarProps {
  numSelected: number;
}

export interface IHeadCell {
  id: string;
  label: string;
  disableSorting?: boolean
}

/* Add here Data Interfaces*/
export type ITableData = ISubscription;

export interface FetchedData {
  data: ITableData[];
  isLoading: boolean;
  isSuccess: boolean;
}

export type DeleteOrModifySubscriptionType = ITableData | number;


export interface IEnhancedTable {
  classes: any;
  headCells: IHeadCell[];
  dataObject: FetchedData;
  listComponent: (data: any) => JSX.Element;
}