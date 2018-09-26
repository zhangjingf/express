Page({
  data: {
    orderList: [{
      id: 11,
      name: '张金发个',
      phone: '112312321',
      type: '1',
      time: '2018-09-26 16:31',
      address: '小时多吃点说多错多',
      bookingTime: '今天18:00-18:30',
      status: '11',
      expressType: '申通快递',
      orderNum: '1111111111111',
      money: '11'
    }]
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '订单',
    })
    this.setData({
      checkedStatus: 'order'
    })
  },
  onReady: function () {
    var self = getApp()
    console.log(self.globalData)
  },
  goDetail: function () {
    wx,wx.navigateTo({
      url: '../orderDetail/index'
    })
  },
  delete: function() {
    console.log('delete')
  }
})