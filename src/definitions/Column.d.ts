import { IData } from './Data';

export interface IColumn extends IData {
  uid: number;
  filterType: string;
  selectOpen: boolean;
}
