const mongoose = require('mongoose')

const Schema = mongoose.Schema

const querySchema = new Schema({
  exname: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  qno: {
    type: Number,
    required: true
  },
  taroll: {
    type: Number,
    required: true
  },
  comments: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Query', querySchema)