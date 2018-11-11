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
    this.setData({
      orderList: [],
      startIndex: 0,
      endIndex: 5
    })
    this.list()
  },
  onReady: function () {
    var self = getApp()
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
      self.setData({
        isLock: false
      })
      if (type == 'delete') {
        self.setData({
          orderList: []
        })
      }
      if (res.errno == 0 && res.data.length > 0) {
        let dataList = self.data.orderList
        self.setData({
          orderList: type == 'delete' ? res.data : dataList.concat(res.data),
          loadMore: res.data.length < 5 ? false : true,
          toView: 'order' + res.data[0].orderId
        })
      } else if(res.data.length == 0) {
        self.setData({
          loadMore: false
        })
      }
    })
  },
  delete: function(e) {
    const self = this;
    let id = e.target.dataset.id || '';
    wx.showModal({
      title: '确定删除订单吗？',
      content: '订单删除后将无法恢复',
      cancelText: '不删除',
      confirmText: '确定删除',
      confirmColor: '#008CF0',
      success: function (res) {
        if (res.confirm) {
          order.delete({ orderId: id.toString() }, function (res) {
            if (res.errno == 0) {
              self.setData({
                startIndex: 0,
                endIndex: 5
              })
              self.list('delete');
            }
          })
        }
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
      startIndex: this.data.endIndex + 1,
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
    wx.showModal({
      title: ' ',
      content: '确定取消订单吗？',
      cancelText: '不取消',
      confirmText: '确定取消',
      confirmColor: '#008CF0',
      success: function(res) {
        if (res.confirm) {
          order.cancel({ orderId: e.target.dataset.id.toString() }, function (res) {
            if (res.code == 0) {
              self.setData({
                startIndex: 0,
                endIndex: 5
              })
              self.list('delete')
            }
          })
        }
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