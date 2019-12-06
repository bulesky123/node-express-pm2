'use strict'

import express from 'express'
import User from '../controller/v1/user'
import Captchas from '../controller/v1/captchas'

const router = express.Router()

// 注册（添加用户）
// router.post('/user/register', User.add)

// 登录
router.post('/user/login', User.login)

router.post('/captchas', Captchas.getCaptchas)

export default router