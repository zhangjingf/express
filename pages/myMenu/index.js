// pages/myMenu/index.js
Page({
  data: {

  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的',
    })
    this.setData({
      checkedStatus: 'mine'
    })
  },
  goAddress: function () {
    wx.navigateTo({
      url: '../myAddress/index',
    })
  },
  goService: function () {
    console.log('goservice')
  },
  goAdvice: function () {
    wx.navigateTo({
      url: '../myAdvice/index',
    })
  },
  goSetting: function () {
    console.log('goset')
  }
})