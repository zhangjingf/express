// pages/myMenu/index.js
Page({
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的',
    })
    this.setData({
      checkedStatus: 'mine'
    })
  },
  goAddress: function () {
    if (!wx.getStorageSync('schoolId')) {
      wx.showToast({
        title: '请先选择学校',
        icon: 'none'
      })
    }
    wx.navigateTo({
      url: '../myAddress/index',
    })
  },
  // goService: function () {
  //   console.log('goservice')
  // },
  goAdvice: function () {
    wx.navigateTo({
      url: '../myAdvice/index',
    })
  },
  goSetting: function () {
    console.log('goset')
  }
})