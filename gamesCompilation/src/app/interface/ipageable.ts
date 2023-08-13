import { IUserRecord } from './iuser-record';

export interface Ipageable {
  content: IUserRecord[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
}
