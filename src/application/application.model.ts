import * as mongoose from 'mongoose';
export const ApplicationSchema = new mongoose.Schema({
  candidat: { type: String, required: true },
  event: { type: String, required: true },
  position: { type: String, required: true },
  skills: { type: String },
  prevExp: { type: String },
  other: { type: String },
});

interface Application extends mongoose.Document {
  candidat: String;
  event: String;
  position: String;
  skills: String;
  prevExp: String;
  other: String;
}
