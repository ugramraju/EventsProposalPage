const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const proposalsSchema = new Schema({
  eventName: {
    type: String,
    required: true
  },
  placeOfEvent: {
    type: String,
    required: true
  },
  proposalType: {
    type: String,
    required: true
  },
  eventType: {
    type: String,
    required: true
  },
  budget: {
    type: Number,
    required: true
  },
  fromDate: {
    type: String,
    required: true
  },
  toDate: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  images: {
    type: [String],
    required: true
  },
  foodPreferences: {
    type: String,
    required: true
  },
  events: {
    type: String,
    required: true
  },
  createdBy: {
    _id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    name: {
      type: String,
      ref: "User",
      
    },
    email: {
      type: String,
      ref: "User",
     
    },
    contact: {
      type: String,
      ref: "User",
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Proposals", proposalsSchema);
