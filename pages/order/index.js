import order from '../../services/order';
Page({
  data: {
    orderList: [],
    startIndex: 0,
    endIndex: 5,
    loadMore: true,
    isLock: false,
    toView: ''
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
  list: function(type) {
    const self = this;
    wx.showLoading({
      title: '加载中'
    })
    if (self.data.isLock) return;
    self.setData({
      isLock: true
    })
    let param = {
      startIndex: this.data.startIndex,
      endIndex: this.data.endIndex
    }
    order.orderList(param, function (res) {
      wx.hideLoading();
      if (res.errno == 0 && res.data) {
        let dataList = self.data.orderList
        self.setData({
          orderList: type == 'delete' ? res.data : dataList.concat(res.data),
          loadMore: res.data.length < 5 ? false : true,
          isLock: false,
          toView: 'order' + res.data[0].orderId
        })
      }
    })
  },
  delete: function(e) {
    const self = this;
    let id = e.target.dataset.id || '';
    order.delete({orderId: id.toString()}, function(res) {
      if (res.errno == 0) {
        self.setData({
          startIndex: 0,
          endIndex: 5
        })
        self.list('delete');
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
    if (!this.data.loadMore || this.data.direction) return;
    this.setData({
      startIndex: this.data.endIndex,
      endIndex: this.data.endIndex + 5
    })
    this.list();
  },
  upper: function() {
    if (this.data.endIndex > 5 && this.data.direction) {
      this.setData({
        startIndex: this.data.endIndex - 10,
        endIndex: this.data.endIndex - 5
      })
      this.list();
    }
  },
  cancel: function (e) {
    const self = this;
    order.cancel({orderId: e.target.dataset.id.toString()}, function (res) {
      if (res.code == 0) {
        self.setData({
          startIndex: 0,
          endIndex: 5
        })
        self.list('delete')
      }
    })
  },
  scroll: function (e) {
    this.setData({
      direction: e.detail.deltaY > 0 ? true : false
    })
  },
  onReachBottom: function () {
    if (!this.data.loadMore) return;
    this.setData({
      startIndex: this.data.endIndex,
      endIndex: this.data.endIndex + 5
    })
    this.list();
  }
})