// pages/orderDetail/index.js
import order from '../../services/order';
import pickup from '../../services/pickup';
Page({
  data: {
    detail: null,
    options: null,
    today: ''
  },
  onLoad: function (options) {
    const self = this;
    if (options.id) {
      self.detail(options.id);
    }
    let month = new Date().getMonth() + 1;
    let date = new Date().getDate();
    this.setData({
      today: month + '-' + date
    })
  },
  detail: function (val) {
    const self = this;
    order.orderDetail({
      orderId: val.toString()
    }, function (res) {
      if (res.errno == 0 && res.data) {
        self.setData({
          detail: res.data
        })
      }
    })
  },
  call: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.detail.riderPhone
    })
  },
  singlePay: function () {
    let self = this;
    pickup.singlePay({
      orderId: self.data.detail.orderId.toString(),
      payAmount: self.data.detail.payPrice
    }, function (res) {
      if (res.code == 0 && res.data) {
        self.pay(res.data);
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  },
  pay: function (val) {
    const self = this;
    wx.requestPayment({
      timeStamp: val.timeStamp, //时间戳
      nonceStr: val.nonceStr, //随机字符串
      package: val.package, //统一下单接口返回的 prepay_id 参数值
      signType: 'MD5', //签名
      paySign: val.paySign,
      success: function (res) {
        self.result(val);
      },
      fail: function (res) {
        wx.showToast({
          title: '支付失败，请重新支付',
          icon: 'none'
        })
      }
    })
  },
  result: function (val) {
    pickup.payResult({
      paymentApplyId: val.paymentApplyId
    }, function (res) {
      if (res.code == 0) {
        wx.showToast({
          title: '支付成功',
          icon: 'none'
        })
        wx.reLaunch({
          url: '../order/index',
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  },
  finish: function () {
    const self = this;
    order.finished({
      orderId: self.data.detail.orderId
    }, function (res) {
      if (res.code == 0) {
        self.detail(self.data.detail.orderId);
      }
    })
  },
  setCopy: function (e) {
    wx.setClipboardData({
      data: e.target.dataset.num,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
          icon: 'none'
        })
      }
    })
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
              self.detail(e.target.dataset.id);
            }
          })
        }
      }
    })
  },
  goWl: function (e) {
    wx.navigateTo({
      url: '../logisticsDetail/logisticsDetail?val=' + e.target.dataset.id,
    })
  }
})