const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const issueSchema = new Schema({
  issue_title: {
    type: String,
    required: true
  },
  issue_text: {
    type: String,
    required: true
  },
  created_by: {
    type: String,
    required: true
  },
  assigned_to: {
    type: String
  },
  status_text: {
    type: String
  },
  open: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

// var Issues = mongoose.model('Issue', issueSchema)
module.exports = issueSchema;