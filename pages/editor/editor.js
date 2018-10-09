// pages/editor/editor.js
import common from "../../services/common";
Page({
  data: {
    visible1: false,
    areaVal: '',
    name: '',
    phone: ''
  },
  onLoad: function (options) {
  //  wx.setNavigationBarTitle({
  //    title: '',
  //  })
    common.getRegion({}, function(res) {
      if (res.errno == 0) {
        console.log(res)
      }
    })
  },
  onReady: function () {
  },
  onShow: function () {
  },
  handleClose1: function () {
    this.setData({
      visible1: false
    });
  },
  save: function () {
    console.log('save')
  },
  name: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  phone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  chooseArea: function () {
    wx.navigateTo({
      url: '../chooseArea/chooseArea',
    })
  }
})