// pages/chooseArea/chooseArea.js
Page({
  data: {
    areaList:[
      { name: 'USA', value: '美国' },
      { name: 'CHN', value: '中国', checked: 'true' }
    ],
    position: 'right',
    color: '#2a82e4',
    current: ''
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '选择区域',
    })
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  handleChange: function (e) {
    this.setData({
      current: e.detail.value
    });
  }
})