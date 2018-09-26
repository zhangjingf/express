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
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  }
})