import order from '../../services/order';
Page({
  data: {
    orderList: [],
    startIndex: 0,
    endIndex: 5,
    loadMore: true
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
      startIndex: this.data.startIndex,
      endIndex: this.data.endIndex
    }
    order.orderList(param, function (res) {
      if (res.errno == 0 && res.data) {
        self.setData({
          orderList: res.data
        })
      } else {
        self.setData({
          loadMore: false
        })
      }
    })
  },
  delete: function(e) {
    const self = this;
    let id = e.target.dataset.id || '';
    order.delete({orderId: id.toString()}, function(res) {
      if (res.errno == 0) {
        self.list();
      }
    })
  },
  goOrderDetail: function (e) {
    if (e.currentTarget.dataset.id) {
      wx.navigateTo({
        url: '../orderDetail/index?id=' + e.currentTarget.dataset.id
      })
    }
  },
  goPickup: function () {
    wx.navigateTo({
      url: '../pickup/pickup'
    })
  },
  lower: function() {
    if (!this.data.loadMore) return;
    this.setData({
      startIndex: this.data.endIndex,
      endIndex: this.data.endIndex + 5
    })
    this.list();
  },
  upper: function() {
    if (this.data.endIndex > 5) {
      this.setData({
        startIndex: this.data.endIndex - 10,
        endIndex: this.data.endIndex - 5
      })
      this.list();
    }
  },
  cancel: function (e) {
    order.cancel({orderId: e.target.dataset.id.toString()}, function (res) {
      if (res.code == 0) {
        this.list()
      }
    })
  }
})