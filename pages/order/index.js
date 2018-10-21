import order from '../../services/order';
Page({
  data: {
    orderList: []
  },
  onLoad: function (options) {
    this.setData({
      checkedStatus: 'order'
    })
  },
  onShow: function () {
    this.list()
  },
  onReady: function () {
    var self = getApp()
    console.log(self.globalData)
  },
  goDetail: function () {
    wx.navigateTo({
      url: '../orderDetail/index'
    })
  },
  list: function() {
    const self = this;
    let param = {
      startIndex: 0,
      endIndex: 10
    }
    order.orderList(param, function (res) {
      if (res.code == 0 && res.data) {
        self.setData({
          orderList: res.data
        })
      }
    })
  },
  delete: function() {
    console.log('delete')
  },
  goOrderDetail: function (e) {
    if (e.currentTarget.dataset.id) {
      wx.navigateTo({
        url: '../orderDetail/index?id=' + e.currentTarget.dataset.id
      })
    }
  }
})