import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ShortLinkSchema = new Schema({
  shortUrl: {
    type: String,
    required: true,
  },
  originalUrl: {
    type: String,
    required: true,
  },
});

const ShortLink = mongoose.model('ShortLink', ShortLinkSchema);
export default ShortLink;