import {UserModel} from "../user/user-model";

export interface RoleModel {
  name :string;

  users :UserModel[];
}
