import * as mongoose from 'mongoose';
export const PersonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: Number, required: true },
  email: { type: String, required: true },
  motivation: String,
});

export interface Person extends mongoose.Document {
  id: String;
  name: String;
  lastName: string;
  phone: number;
  email: string;
  motivation: string;
}
