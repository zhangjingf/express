// pages/myAdvice/index.js
Page({
  data: {
    advice: ''
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的建议',
    })
  },
  onReady: function () {

  },
  bindTextAreaBlur: function (e) {
    this.setData({
      advice: e.detail.value
    })
  },
  submit: function () {
    console.log('submit')
  }
})