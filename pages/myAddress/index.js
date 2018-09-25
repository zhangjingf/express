// pages/myAddress/index.js
Page({
  data: {
    addressInfo: [{
      name: 'zahn',
      phone: 111111111,
      address: 'wfewfefrefre',
      checked: true
    }],
    color: 'blue'
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的地址簿',
    })
  },
  onReady: function () {

  },
  check: function () {
    console.log('check')
  }
})