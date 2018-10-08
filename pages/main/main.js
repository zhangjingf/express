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
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
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
  getUserInfo: function (e) {
    console.log(e)
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