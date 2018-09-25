// pages/editor/editor.js
Page({
  data: {
    visible1: false
  },
  onLoad: function (options) {
    wx.setBackgroundColor({
      backgroundColor: '#e5e5e5'
    })
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  handleClose1: function () {
    this.setData({
      visible1: false
    });
  },
})