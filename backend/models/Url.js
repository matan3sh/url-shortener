const mongoose = require("mongoose");
const shortid = require("shortid");
require("mongoose-type-url");

const urlSchema = mongoose.Schema(
  {
    baseUrl: {
      type: mongoose.SchemaTypes.Url,
      required: [true, "Please enter base url"],
    },
    urlId: {
      type: String,
      default: shortid.generate,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Url", urlSchema);
