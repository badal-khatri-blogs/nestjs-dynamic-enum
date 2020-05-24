import * as mongoose from 'mongoose';

export interface RoleInterface extends mongoose.Document {
  id: string;
  name: string;
}
