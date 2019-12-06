## 项目需求：练习完整项目开发，加上线部署，开发电话助手，增加一个实时对话通信功能。
### 一、服务端api涉及
1. 登录接口--login/index
2. 图形验证码--/captcha
3. 短信验证码--login/sendcode
4. 查询是否开通--call/checkOpen
5. 接听记录--call/listInfo
6. 删除记录--call/del
7. 加入黑名单（拒接）--blacklist/check
8. 电话详情--call/detail
9. 获取用户信息--getUserInfo
10. 获取语音示例列表--voice/voiceList
11. 选择语音示例--voice/setVoice
12. 获取拨打的手机号--number/getNumber
13. 自定义回复--answertpl/gettpl
14. 自定义回复保存--answertpl/save
15. 获取拒接列表--blacklist/getlist
16. 删除拒接号码--blacklist/dellist
17. 添加拒接号码--blacklist/insertlist


微信项目接口：
- code换取用户信息--wechat/getOpenId
- 微信JsSDK授权--wechat/getJsSdk

### 二、使用技术栈 

服务端：node+mongoose+express+pm2+websocket

前端：vue+vuex+es6+vue-server-renderer+vue-router+webpack+axios+websocket+less
### 三、表设计

### 四、api设计
#### 接口列表：

##### 1、获取城市列表

##### 请求URL:  
```
http://******
```

##### 示例：
 [******](****)

##### 请求方式: 
```
GET
```

##### 参数类型：query

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|type      |Y       |string  |guess：定位城市，  hot：热门城市， group：所有城市 |

##### 返回示例：

```javascript
{

}
```

##### 五、项目结构