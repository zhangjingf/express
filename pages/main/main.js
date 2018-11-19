// pages/main/main.js
import main from "../../services/main"
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
    var self = this;
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
          console.error(res)
          if (res.errno == 0 && res.data) {
            self.setData({
              topHeaderText: res.data.schoolName
            })
            wx.setStorage({
              key: 'schoolId',
              data: res.data.id,
              success: function () {
                console.warn('学校id存储成功');
              }
            });
            wx.setStorage({
              key: 'schoolName',
              data: res.data.schoolName,
              success: function() {
                console.warn('学校存储成功');
              }
            });
            wx.setStorage({
              key: 'proviceName',
              data: res.data.proviceName,
              success: function () {
                console.warn('省份存储成功');
              }
            });
            wx.setStorage({
              key: 'cityName',
              data: res.data.cityName,
              success: function() {
                console.warn('城市存储成功');
              }
            });
            wx.setStorage({
              key: 'cityId',
              data: res.data.cityId,
              success: function () {
                console.warn('城市存储成功');
              }
            });
            wx.setStorage({
              key: 'lng',
              data: param.lngLong,
              success: function () {
                console.warn('lng存储成功');
              }
            });
            wx.setStorage({
              key: 'lat',
              data: param.latLong,
              success: function() {
                console.warn('lat存储成功');
              }
            });
          } else {
            self.setData({
              topHeaderText: wx.getStorageSync('schoolName') || '请选择学校'
            })
          }
        })
      }
    })
  },
  onShow: function () {
    this.setData({
      topHeaderText: wx.getStorageSync('schoolName') || '请选择学校'
    })
  },
  gosend: function () {
    if (!wx.getStorageSync('schoolName')) {
      wx.showToast({
        title: '请先选择学校',
        icon: 'none'
      })
    }
    main.getAuth({}, function (res) {
      if (res.errno == 0) {
        wx.navigateTo({
          url: '../send/index',
        })
      } else {
        wx.showToast({
          title: res.errmsg,
          icon: 'none'
        })
      }
    })
  },
  gopickup: function () {
    if (!wx.getStorageSync('schoolName')) {
      wx.showToast({
        title: '请先选择学校',
        icon: 'none'
      })
    }
    wx.navigateTo({
      url: '../pickup/pickup'
    });
  },
  gologistics: function () {
    wx.navigateTo({
      url: '../logistics/logistics'
    });
  },
  goSchool: function () {
    wx.navigateTo({
      url: '../chooseSchool/chooseSchool'
    });
  },
  onShareAppMessage: function (res) {
    return {
      title: '让时间留给美好',
      path: 'pages/main/main'
    }
  }
})