import * as mongoose from 'mongoose';

export const PDFSchema = new mongoose.Schema({
  html: { type: String, required: true },
  authKey: { type: String, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
});

export interface PDF {
  id: string;
  html: string;
  width: number;
  height: number;
}
