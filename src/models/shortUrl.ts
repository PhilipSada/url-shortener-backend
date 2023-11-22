import mongoose, { Document } from "mongoose";


export interface ShortUrl extends Document {
  shortId: string;
  destination: string;
  preferredAlias?:string;
}

const schema = new mongoose.Schema({
  shortId: {
    type: String,
    unique: true,
    required: true
  },
  preferredAlias:{type: String},
  destination: { type: String, required: true },
});

const ShortUrlModel = mongoose.model<ShortUrl>("shortUrl", schema);

export default ShortUrlModel;