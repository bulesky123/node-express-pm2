'use strict'

import BaseComponent from '../../prototype/baseComponent'
import formidable from 'formidable'
import UserModel from '../../models/v1/user'
import UserInfoModel from '../../models/v1/userinfo'
import crypto from 'crypto'
import dtime from 'time-formater'

class User extends BaseComponent {
  constructor() {
    super()
    this.login = this.login.bind(this)
  }

  async login(req, res, next) {
    const cap = req.cookies.cap
    if(!cap) {
      res.send({
        status: 0,
        type: 'ERROR_CAPTCHA',
        message: '验证码失效'
      })
      return
    }

    const form = new formidable.IncomingForm()

    form.parse(req, async (err, fields, files) => {
      const { username, password, captcha_code } = fields
      try {
        if (!username) {
          throw new Error('用户名参数错误')
        } else if (!password) {
          throw new Error('密码错误')
        } else if (!captcha_code) {
          throw new Error('验证码错误')
        }
      } catch (err) {
        res.send({
          status: 0,
          type: 'ERROR_QUERY',
          message: err.message,
        })
        return
      }

      if (cap.toString() !== captcha_code.toString()) {
        res.send({
          status: 0,
          type: 'ERROR_CAPTCHA',
          message: '验证码不正确'
        })
        return
      }

      const newpassword = this.encryption(password)

      try {
        const user = await UserModel.findOne({ username })
        // 如果用户不存在，那么直接注册一个用户
        if(!user) {
          const user_id = await this.getId('user_id') // 生成一个userId
          const registe_time = dtime().format('YYYY-MM-DD HH:mm') // 注册时间
          const newUser = { username, password: newpassword, user_id }
          const newUserInfo = {
            username,
            user_id,
            id: user_id,
            registe_time,
          }
          UserModel.create(newUser) // 生成新用户
          const createUser = new UserInfoModel(newUserInfo)
          const userInfo = await createUser.save()
          req.session.user_id = user_id
          res.send({
            status: 0,
            type: 'SUCCESS',
            data: userInfo
          })
        } else if (user.password.toString() !== newpassword.toString()) {
          res.send({
            status: 0,
            type: 'ERROR_PASSWORD',
            message: '密码错误',
          })
        } else {
          req.session.user_id = user.user_id
          const userInfo = await UserInfoModel.findOne({ user_id: user.user_id }, '-_id')
          res.send({
            status: 0,
            type: 'SUCCESS',
            data: userInfo
          })
        }
      } catch (err) {
        console.log(err)
        res.send({
          status: 0,
					type: 'SAVE_USER_FAILED',
					message: '登陆失败',
        })
      }
    })
  }

  encryption(password) {
    const newpassword = this.Md5(this.Md5(password).substr(2, 7) + this.Md5(password))
    return newpassword
  }

  Md5(password) {
    const md5 = crypto.createHash('md5')
    return md5.update(password).digest('base64')
  }
}

export default new User()