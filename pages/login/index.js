Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              //从数据库获取用户信息
              that.queryUsreInfo();
              //用户已经授权过
              wx.redirectTo({
                url: '../main/main',
              })
            }
          });
        }
      }
    })
  },
  bindGetUserInfo: function (e) {
    var res = e.detail
    if (res) {
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
      if (res.userInfo && !token) {
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
    } else {
      //用户按了拒绝按钮
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
  }
})