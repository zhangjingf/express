// pages/editor/editor.js
Page({
  data: {
    visible1: false,
    areaVal: '所在区域',
    name: '',
    phone: ''
  },
  onLoad: function (options) {
   wx.setNavigationBarTitle({
     title: '编辑收件人',
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