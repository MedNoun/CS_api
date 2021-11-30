import * as mongoose from 'mongoose';
export const ApplicationSchema = new mongoose.Schema({
  candidat: { type: String, required: true },
  event: { type: String, required: true },
  position: { type: String, required: true },
  skills: { type: String, default: 'None' },
  prevExp: { type: String, default: 'None' },
  other: { type: String, default: 'None' },
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: '5m' },
  },
});

export interface Application extends mongoose.Document {
  candidat: String;
  event: String;
  position: String;
  skills: String;
  prevExp: String;
  other: String;
  expireAt: Date;
}
/*
positions: 
Project manager proj
Program manager prog
Contacts manager cont
Sponsoring manager spon
Logistics manager log
Organisation manager org
Media manager med
General Secretary gs
*/
