// pages/logistics/logistics.js
Page({
  data: {
    logisticsHistory: [{
      id: 1,
      name: '4444444'
    }],
    status: ''
  },
  onLoad: function (options) {

  },
  clear: function () {

  },
  inputNum: function (e) {
    this.setData({
      status: e.detail.value.length > 0 ? 'active' : ''
    })
  },
  scan: function () {
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })
  }
})