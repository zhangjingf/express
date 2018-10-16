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
          if (res.errno == 0) {
            self.setData({
              topHeaderText: res.data.schoolName
            })
            wx.setStorage({
              key: 'schoolId',
              data: res.data.id,
              success: function () {
                console.warn('学校id存储成功')
              }
            })
            wx.setStorage({
              key: 'schoolName',
              data: res.data.schoolName,
              success: function() {
                console.warn('学校存储成功')
              }
            })
            wx.setStorage({
              key: 'proviceName',
              data: res.data.proviceName,
              success: function () {
                console.warn('省份存储成功')
              }
            })
            wx.setStorage({
              key: 'cityName',
              data: res.data.cityName,
              success: function() {
                console.warn('城市存储成功')
              }
            })
          }
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