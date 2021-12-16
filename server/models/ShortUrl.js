const mongoose = require("mongoose");
const { nanoid } = require("nanoid");

const ShortUrlSchema = new mongoose.Schema({
  fullUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
    default: () => nanoid(10),
  },
});

module.exports = mongoose.model("ShortUrl", ShortUrlSchema);
