// pages/logisticsDetail/logisticsDetail.js
import Logistics from '../../services/logistics';
Page({
  data: {
    recordList: null
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '物流详情',
    })
    if(options.val) {
      this.getExpress(options.val);
    }
  },
  getExpress: function (val) {
    const self = this;
    Logistics.getExpress({
      number: val
    }, function (res) {
      if (res.errno == 0 && res.data) {
        self.setData({
          recordList: res.data
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