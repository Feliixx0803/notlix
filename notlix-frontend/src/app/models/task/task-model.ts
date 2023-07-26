import {UserModel} from "../user/user-model";

export interface TaskModel {
  name :string;

  user :UserModel;
}
