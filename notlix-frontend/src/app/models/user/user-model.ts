import {RoleModel} from "../role/role-model";
import {TaskModel} from "../task/task-model";
import {NoteModel} from "../note/note-model";

export interface UserModel {
  email :string;
  telephone :string;
  name :string;
  pwd :string;

  role :RoleModel;
  tasks :TaskModel[];
  notes :NoteModel[];
}
