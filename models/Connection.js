const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

let frameSchema = new Schema({
  connectionName: {
    type: String
  },
  dataSource: {
    type: String
  },
  accountName: {
    type: String
  },
  userName: {
    type: String
  },
  password: {
    type: String
  },
  warehouseName: {
    type: String
  },
  role:{
    type: String
  },
  userId:{
    type: Schema.Types.ObjectId,
    ref: User
  }
}, {
  collection: 'frames'
})

module.exports = mongoose.model('Frame', frameSchema)