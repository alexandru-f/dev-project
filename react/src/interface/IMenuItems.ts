import { ROLE } from "./IAuth";

export default interface IMenuInterface {
  name: string;
  path: string;
  roles: ROLE[];
}