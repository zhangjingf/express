// pages/chooseSchool/chooseSchool.js
Page({
  data: {
    inputValue: '',
    schoolName: '湖南理工学院',
    nearSchool: [{id: 11, name: '湖南理工'}, {id:22, name: '湖南工理'}, {id: 33, name: '湖南'}]
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '选择学校',
    })
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  onHide: function () {
  
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
    console.log(this.data.inputValue)
  },
  remove: function (e) {
    console.log(e)
  }
})