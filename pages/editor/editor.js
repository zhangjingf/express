// pages/editor/editor.js
import common from "../../services/common";
import editor from "../../services/editor";
Page({
  data: {
    visible1: false,
    areaVal: '',
    content: null,
    multiIndex: [0, 0, 0],
    multiArray: [],
    type: 'default',
    test: false,
    schoolName: '',
    area: '',
    pickerAddress: '',
    name: '',
    phone: '',
  },
  onLoad: function (options) {
    const self = this;
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
    } else if (options.type === 'new') {
      wx.setNavigationBarTitle({
        title: '编辑地址薄'
      })
      self.setData({
        type: 'new'
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
        self.setData({
          multiArray: [res.data]
        })
        self.getCity(res.data[0].id)
      }
    })
  },
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
    const base = this.data;
    if(base.type == 'receive') {
      let param = {
        receiverName: base.name,
        receiverPhone: base.phone,
        cityId: base.multiArray[1][base.multiIndex[1]].id,
        schoolId: base.multiArray[2][base.multiArray[2]].id,
      }
    }
    Object.keys(param).forEach(function(index) {
      // if (!param[index]) {

      // }
    })
    editor.save(param, function (res) {
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
    let multiArray = this.data.multiArray;
    let indexArr = e.detail.value;
    let address = multiArray[0][indexArr[0]].name + multiArray[1][indexArr[1]].name + multiArray[2][indexArr[2]].name;
    this.setData({
      pickerAddress: address,
      multiIndex: indexArr
    });
  },
  bindMultiPickerColumnChange: function (e) {
    let multiArray = this.data.multiArray;
    var index = e.detail.column;
    var arrIndex = e.detail.value;
    if (index == 0) {
      this.getCity(multiArray[index][arrIndex].id);
    }
    if (index == 1) {
      this.getSchool(multiArray[index][arrIndex].id);
    }
  },
  getCity: function (val) {
    const self = this;
    let multiArray = this.data.multiArray;
    common.getCityList({provinceId: val}, function (res) {
      if (res.errno == 0) {
        multiArray[1] = res.data;
        self.setData({
          multiArray: multiArray
        })
        self.getSchool(res.data[0].id)
      }
    })
  },
  getSchool: function (val) {
    const self = this;
    let multiArray = this.data.multiArray;
    common.getSchoolList({cityId: val}, function (res) {
      if (res.errno == 0) {
        multiArray[2] = res.data;
        self.setData({
          multiArray: multiArray
        })
      }
    })
  },
  sexChoose: function (e) {
    var sex = e.target.dataset.sex || ''
    var content = this.data.content
    content.gender = sex == 'male' ? 0 : 1
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