import login from "../../services/login";
const app = getApp();
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    const self = this;
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              self.login(res);
            }
          });
        }
      }
    })
  },
  bindGetUserInfo: function (e) {
    const self = this;
    var res = e.detail;
    if (res) {
      self.login(res);
    } else {
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
  login: function (res) {
    app.globalData.userInfo = res.userInfo;
    var param = {
      code: app.globalData.code,
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
        if (res.errno == 0) {
          wx.setStorage({
            key: "token",
            data: res.data.token
          })
          wx.setStorage({
            key: 'userId',
            data: res.data.userId
          })
          wx.redirectTo({
            url: '../main/main',
          })
        }
      })
    }
  }
})