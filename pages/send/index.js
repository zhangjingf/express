// pages/send/index.js
Page({
  data: {
    isChecked: null,
    color: '#2a82e4',
    wordNum: '0',
    message: null,
    index: 0,
    thingTypeList: ['美国', '中国', '巴西', '日本'],
    multiArray: [['无脊柱动物', '脊柱动物'], ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物']],
    multiIndex: [0, 0],
    switchColor: "#e7e7e7"
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '寄快递',
    })
  },
  onReady: function () {

  },
  bindInput: function (e) {
    this.setData({
      message: e.detail.value,
      wordNum: e.detail.value.length
    })
  },
  bindTypeChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },
  goMyAddress: function (e) {
    wx.navigateTo({
      url: '../myAddress/index',
    })
  }
})