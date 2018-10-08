//app.js
import login from "./services/login"
App({
  onLaunch: function () {
    var logs = wx.getStorageSync('logs') || []
    var token = wx.getStorageSync('token') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        this.globalData.code = res.code
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
              var param = {
                code: this.globalData.code,
                userInfo: {
                  userInfo: {
                    country: res.userInfo.country,
                    gender: res.userInfo.gender,
                    province: res.userInfo.province,
                    city: res.userInfo.city,
                    avatarUrl: res.userInfo.avatarUrl,
                    nickName: res.userInfo.nickName,
                    language: res.userInfo.language
                  },
                  signature: res.signature,
                  errMsg: res.errMsg,
                  encryptedData: res.encryptedData,
                  iv: res.iv,
                  rawData: JSON.stringify(JSON.parse(res.rawData))
                }
              }
              if (res.userInfo) {
                login.wxBindLogin(param, function (res) {
                  if (res.errno == 0 && !token) {
                    wx.setStorage({
                      key: "token",
                      data: res.data.token
                    })
                    wx.setStorage({
                      key: 'userId',
                      data: res.data.userId
                    })
                  }
                })
              }
            }
          })
        } else {
          wx.redirectTo({
            url: '../login/index',
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    code: null
  }
})