// pages/editor/editor.js
import common from "../../services/common";
import editor from "../../services/editor";
Page({
  data: {
    visible1: false,
    areaVal: '',
    content: {sex: 0},
    multiIndex: [0, 0, 0],
    multiArray: [],
    type: 'default',
    test: false,
    schoolName: '',
    area: ''
  },
  onLoad: function (options) {
    const self = this;
    console.log(options);
    self.setData({
      schoolName: wx.getStorageSync('schoolName'),
      area: wx.getStorageSync('proviceName') + wx.getStorageSync('cityName')
    })
    if (options.type === 'receive') {
      wx.setNavigationBarTitle({
        title: '编辑收件人',
      })
      self.setData({
        type: 'receive'
      })
    } else if (options.type === 'send') {
      wx.setNavigationBarTitle({
        title: '编辑寄件人'
      })
      self.setData({
        type: 'send'
      })
    }
    if (options.id) {
      editor.getAdrressDetail({
        id: options.id
      }, function (res) {
        if (res.errno == 0 && res.data) {
          self.setData({
            content: res.data
          })
        }
      })
    }
    common.getRegion({}, function (res) {
      if (res.errno == 0) {
        console.log(res)
        self.setData({
          multiArray: [res.data]
        })
      }
    })
  },
  onReady: function () {},
  onShow: function () {
    var hostelName = wx.getStorageSync('hostelName') || '';
    var hostelId = wx.getStorageSync('hostelId') || '';
    this.setData({
      areaVal: hostelName,
      hostelId: hostelId
    })
  },
  handleClose1: function () {
    this.setData({
      visible1: false
    });
  },
  save: function () {
    editor.save(this.data.content, function (res) {
      if (res.errno == 0) {
        wx.showToast({
          title: '修改成功'
        })
        wx.navigateBack({
          delta: 1
        })
      }
    })
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
  detail: function (e) {
    this.setData({
      address: e.detail.value
    })
  },
  chooseArea: function () {
    wx.navigateTo({
      url: '../chooseArea/chooseArea',
    })
  },
  address: function () {
    console.log('address')
  },
  bindMultiPickerChange: function (e) {
    console.log(e)
  },
  bindMultiPickerColumnChange: function (e) {
    console.log(e)
  },
  getCity: function (val) {
    common.getCityList({provinceId: val}, function (res) {
      if (res.errno == 0) {
        console.log(res)
      }
    })
  },
  getSchool: function (val) {
    common.getSchoolList({cityId: val}, function (res) {
      if (res.errno == 0) {
        console.log(res)
      }
    })
  },
  sexChoose: function (e) {
    var sex = e.target.dataset.sex || ''
    var content = this.data.content
    content.sex = sex == 'male' ? 0 : 1
    this.setData({
      content: content
    })
  },
  delete: function () {
    let id = this.data.content.id
    editor.delete({id: id}, function (res) {
      if (res.errno == 0) {
        wx.showToast({
          title: '删除成功'
        })
        wx.navigateBack({
          delta: 1
        })
      } else {
        wx.showToast({
          title: res.errmsg
        })
      }
    })
  }
})