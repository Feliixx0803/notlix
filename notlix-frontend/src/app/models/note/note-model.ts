import {UserModel} from "../user/user-model";

export interface NoteModel {
  title :string;
  content :string;

  user :UserModel;
}
