import sendRequest from "../../services/chooseSchool";
import main from "../../services/main";
Page({
  data: {
    inputValue: '',
    schoolName: '湖南理工学院',
    nearSchool: [{id: 11, name: '湖南理工'}, {id:22, name: '湖南工理'}, {id: 33, name: '湖南'}]
  },
  onLoad: function (options) {
    console.log(options)
  },
  bindKeyInput: function (e) {
    var str = e.detail.value
    this.setData({
      inputValue: str
    })
    sendRequest.getSchool({schoolName: str}, function (res) {
      if (res.errno == 0) {
        console.log(res)
      }
    })
  },
  remove: function (e) {
    console.log(e)
  },
  reLocation: function () {
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
  }
})