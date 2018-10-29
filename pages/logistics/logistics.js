// pages/logistics/logistics.js
import Logistics from '../../services/logistics';
Page({
  data: {
    logisticsHistory: [{
      id: 1,
      name: '4444444'
    }],
    status: '',
    number: ''
  },
  onLoad: function (options) {
  },
  clear: function () {

  },
  search: function() {
    this.getExpress(this.data.number);
  },
  inputNum: function (e) {
    this.setData({
      status: e.detail.value.length > 0 ? 'active' : '',
      number: e.detail.value
    })
  },
  scan: function () {
    wx.scanCode({
      success: (res) => {
        console.log(res)
        if (res.result) {
          this.getExpress(res.result)
        }
      }
    })
  },
  getExpress: function (val) {
    Logistics.getExpress({number:val}, function(res) {
      if(res.errno == 0 && res.data) {
        wx.navigateTo({
          url: '../logisticsDetail/logisticsDetail?val=' + val,
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  }
})