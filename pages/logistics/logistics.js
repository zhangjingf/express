// pages/logistics/logistics.js
import Logistics from '../../services/logistics';
Page({
  data: {
    logisticsHistory: [],
    status: '',
    number: ''
  },
  onLoad: function (options) {
    this.hisotry()
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
    wx.navigateTo({
      url: '../logisticsDetail/logisticsDetail?val=' + val,
    })
    // Logistics.getExpress({number:val}, function(res) {
    //   if(res.errno == 0 && res.data) {
        
    //   } else {
    //     wx.showToast({
    //       title: res.msg,
    //       icon: 'none'
    //     })
    //   }
    // })
  },
  hisotry: function () {
    const self = this;
    Logistics.history({}, function(res) {
      if (res.errno == 0) {
        self.setData({
          logisticsHistory: res.data
        })
      }
    })
  },
  clear: function () {
    this.setData({
      logisticsHistory: []
    })
  }
})