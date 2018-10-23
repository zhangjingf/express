import order from '../../services/order';
Page({
  data: {
    orderList: [],
    startIndex: 0,
    endIndex: 4,
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
        console.log(res.data)
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
  delete: function() {
    console.log('delete')
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
      endIndex: this.data.endIndex + 4
    })
    this.list();
  },
  upper: function() {
    console.log(this.data.endIndex)
    if (this.data.endIndex > 4) {
      this.setData({
        startIndex: this.data.endIndex - 8,
        endIndex: this.data.endIndex - 4
      })
      this.list();
    }
  }
})