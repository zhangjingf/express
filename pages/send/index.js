// pages/send/index.js
Page({
  data: {
    isChecked: null,
    color: '#008CF0',
    wordNum: '0',
    message: null,
    index: 0,
    switchColor: "#CCCCCC"
  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  bindInput: function (e) {
    this.setData({
      message: e.detail.value,
      wordNum: e.detail.value.length
    })
  },
  bindTypeChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },
  goMyAddress: function (e) {
    wx.navigateTo({
      url: '../myAddress/index',
    })
  }
})