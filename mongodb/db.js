import mongoose from 'mongoose'
import config from 'config-lite' // 默认会找config下面的default.js
import chalk from 'chalk' // 控制台显示颜色的插件

mongoose.connect(config.url, { useMongoClient: true})
mongoose.Primise = global.Primise

const db = mongoose.connection

db.once('open', () => {
  console.log(
    chalk.green('数据库连接成功')
  )
})

db.on('error', (error) => {
  console.log(
    chalk.red('Error in MongoDb connection: ' + error)
  )
  mongoose.disconnect()
})

db.on('close', () => {
  console.log(
    chalk.red('数据库断开，重新连接数据卡')
  )
  mongoose.connect(config.url, {server: {auto_reconnect: true}})
})

export default db