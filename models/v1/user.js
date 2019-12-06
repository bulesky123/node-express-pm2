'use strict'

import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = new Schema({
  user_id: Number,
  username: String,
  password: String,
})

const user = mongoose.model('user', UserSchema)

export default user