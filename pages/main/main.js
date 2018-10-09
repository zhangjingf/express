// pages/main/main.js
import main from "../../services/main"
const app = getApp()
Page({
  data: {
    imgUrls: [],
    indicatorDots: true,
    indicatorColor: '#FBFBFB',
    indicatorActiveColor: '#626262',
    autoplay: true,
    interval: 5000,
    duration: 1000,
    checkedStatus: '',
    topHeaderText: '请选择学校'
  },
  onLoad: function () {
    var self = this
    this.setData({
      checkedStatus: 'main'
    })
    main.wxBindImg({}, function(res) {
      if (res.errno == 0) {
        self.setData({
          imgUrls: res.data.banner
        })
      }
    })
    wx.getLocation({
      success: function (res) {
        let param = {
          lngLong: res.longitude,
          latLong: res.latitude
        }
        main.wxBindPosition(param, function (res) {
          console.log(res)
        })
      }
    })
  },
  gosend: function () {
    wx.navigateTo({
      url: '../send/index',
    })
  },
  gopickup: function () {
    wx.navigateTo({
      url: '../pickup/pickup'
    })
  },
  gologistics: function () {
    wx.navigateTo({
      url: '../logistics/logistics'
    })
  },
  goSchool: function () {
    wx.navigateTo({
      url: '../chooseSchool/chooseSchool'
    })
  }
})