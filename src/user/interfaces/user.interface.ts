import * as mongoose from 'mongoose';

export interface UserInterface extends mongoose.Document {
  firstName: string;
  lastName: string;
  role: string;
}
