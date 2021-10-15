import * as mongoose from 'mongoose';

export const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  deadLine: { type: Date, required: true },
  date: { type: Date },
});

export interface Event extends mongoose.Document {
  name: String;
  deadLine: Date;
  date: Date;
}
