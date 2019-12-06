'use strict'

import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userInfoSchema = new Schema({
	avatar: {type: String, default: 'default.jpg'},
	registe_time: String,
	id: Number,
	user_id: Number,
	mobile: {type: String, default: ''},
	username: String,
})

userInfoSchema.index({ id: 1 })

const userInfo = mongoose.model('userInfo', userInfoSchema)

export default userInfo