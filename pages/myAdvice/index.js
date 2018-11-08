// pages/myAdvice/index.js
import common from '../../services/common.js'
Page({
  data: {
    advice: ''
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的建议',
    })
  },
  bindTextAreaBlur: function (e) {
    console.log(e)
    this.setData({
      advice: e.detail.value
    })
  },
  submit: function () {
    common.advice({ advise: this.data.advice, schoolId: wx.getStorageSync('schoolId')}, function (res) {
      if(res.errno == 0) {
        wx.showToast({
          title: '提交成功',
          icon: 'none'
        })
      }
    })
  }
})