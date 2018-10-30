import sendRequest from "../../services/chooseSchool";
import main from "../../services/main";
Page({
  data: {
    inputValue: '',
    schoolName: '',
    nearSchool: []
  },
  onLoad: function (options) {
    this.setData({
      schoolName: wx.getStorageSync('schoolName')
    })
  },
  bindKeyInput: function (e) {
    const self = this;
    var str = e.detail.value
    this.setData({
      inputValue: str
    })
    sendRequest.getSchool({schoolName: str}, function (res) {
      if (res.errno == 0) {
        self.setData({
          nearSchool: res.data
        })
      }
    })
  },
  remove: function (e) {
    console.log(e)
  },
  reLocation: function () {
    const self = this;
    wx.getLocation({
      success: function (res) {
        let param = {
          lngLong: res.longitude,
          latLong: res.latitude
        }
        main.wxBindPosition(param, function (res) {
          if (res.errno == 0) {
            self.setData({
              schoolName: res.data.schoolName
            })
            wx.setStorage({
              key: 'schoolId',
              data: res.data.id
            })
          }
        })
      }
    })
  },
  choose: function(e) {
    let id = e.target.dataset.id || '';
    if (id) {
      for (let index in this.data.nearSchool) {
        if (this.data.nearSchool[index].id == id) {
          wx.setStorage({
            key: 'schoolId',
            data: id
          })
          wx.setStorage({
            key: 'schoolName',
            data: this.data.nearSchool[index].name
          })
        }
      }
    }
    wx.navigateBack({
        delta: 1
    })
  }
})