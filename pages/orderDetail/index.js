// pages/orderDetail/index.js
import order from '../../services/order';
Page({
  data: {
    detail: null
  },
  onLoad: function (options) {
    const self = this;
    if(options.id) {
      order.orderDetail({orderId: options.id}, function(res) {
        if (res.code == 0 && res.data) {
          self.setData({
            detail: res.data
          })
        }
      })
    }
  },
  call: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.detail.receiverPhone
    })
  }
})