// pages/pickup/pickup.js
Page({
  data: {
    orderNum: [1],
    agree: true
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '取件'
    })
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  onHide: function () {
  
  },
  goAddress: function () {

  },
  add: function () {
    this.setData({
      orderNum: [1,2] 
    })
  }
})