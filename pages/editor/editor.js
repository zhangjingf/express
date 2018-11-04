// pages/editor/editor.js
import common from "../../services/common";
import editor from "../../services/editor";
Page({
  data: {
    areaVal: '',
    multiIndex: [0, 0, 0],
    multiArray: [],
    type: 'default',
    schoolName: '',
    area: '',
    pickerAddress: '',
    receiverName: '',
    receiverPhone: '',
    gender: 1,
    id: '',
    cityId: '',
    hostelId: '',
    schoolId: '',
    fullAddress: '',
    hostelName: '',
    isDefault: 1,
    config: ''
  },
  onLoad: function (options) {
    const self = this;
    self.setData({
      schoolName: wx.getStorageSync('schoolName'),
      area: wx.getStorageSync('proviceName') + wx.getStorageSync('cityName')
    })
    if (options.status == 'new') {
      if (options.from == 'send') {
        if (options.type === 'send') {
          wx.setNavigationBarTitle({
            title: '新建收件人'
          })
          self.setData({
            type: 'send'
          })
        }
        if (options.type === 'receive') {
          wx.setNavigationBarTitle({
            title: '新建寄件人',
          })
          self.setData({
            type: 'receive'
          })
        }
      } else {
        if (options.type === 'receive') {
          wx.setNavigationBarTitle({
            title: '新建收件人',
          })
          self.setData({
            type: 'receive'
          })
        }
        if (options.type === 'send') {
          wx.setNavigationBarTitle({
            title: '新建寄件人',
          })
          self.setData({
            type: 'receive'
          })
        }
        if (options.type === 'new') {
          wx.setNavigationBarTitle({
            title: '新建地址薄'
          })
          self.setData({
            type: 'new'
          })
        }
      }
    } else {
      if (options.from == 'send') {
        if (options.type === 'send') {
          wx.setNavigationBarTitle({
            title: '编辑收件人'
          })
          self.setData({
            type: 'send'
          })
        }
        if (options.type === 'receive') {
          wx.setNavigationBarTitle({
            title: '编辑寄件人',
          })
          self.setData({
            type: 'receive'
          })
        }
      } else {
        if (options.type === 'receive') {
          wx.setNavigationBarTitle({
            title: '编辑收件人',
          })
          self.setData({
            type: 'receive'
          })
        }
        if (options.type === 'new') {
          wx.setNavigationBarTitle({
            title: '编辑地址薄'
          })
          self.setData({
            type: 'new'
          })
        }
      }
    }
    if (options.id) {
      if (options.type == 'send') {
        editor.getSenderAdrressDetail({
          id: options.id
        }, function (res) {
          if (res.errno == 0 && res.data) {
            self.setData({
              receiverName: res.data.senderName,
              receiverPhone: res.data.senderPhone,
              detailAddress: res.data.address,
              isDefault: res.data.isDefault,
              id: res.data.id,
              userId: res.data.userId
            })
          }
        })
        return
      }
      editor.getAdrressDetail({
        id: options.id
      }, function (res) {
        if (res.errno == 0 && res.data) {
          self.setData({
            cityId: res.data.cityId,
            schoolId: res.data.schoolId,
            hostelId: res.data.hostelId,
            receiverName: res.data.receiverName,
            receiverPhone: res.data.receiverPhone,
            gender: res.data.gender,
            address: res.data.address,
            pickerAddress: res.data.fullAddress.replace(res.data.address, '').replace(res.data.hostelName, ''),
            hostelName: res.data.hostelName,
            isDefault: res.data.isDefault,
            id: res.data.id
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
      hostelName: hostelName,
      hostelId: hostelId
    })
  },
  save: function () {
    const base = this.data;
    if (base.type == 'send') {
      this.saveSenderAddress();
      return;
    }
    let arrFlag = [];
    let param = {
      id: base.id || '',
      receiverName: base.receiverName,
      receiverPhone: base.receiverPhone,
      cityId: base.cityId,
      schoolId: base.schoolId,
      hostelId: base.hostelId,
      address: base.address,
      fullAddress: base.pickerAddress + base.hostelName + base.address,
      isDefault: base.isDefault,
      gender: base.gender
    }
    Object.keys(param).forEach(function (index) {
      if (index != 'gender' && index != 'isDefault' && index != 'id') {
        arrFlag.push(Boolean(param[index]));
      }
    })
    if (arrFlag.indexOf(false) >= 0) {
      wx.showToast({
        title: '请填写全部表单项',
        icon: 'none'
      });
      return;
    }
    editor.save(param, function (res) {
      if (res.errno == 0) {
        wx.showToast({
          title: '修改成功',
          success: function () {
            wx.navigateBack({
              delta: 1
            })
          }
        })
      }
    })
  },
  name: function (e) {
    this.setData({
      receiverName: e.detail.value
    })
  },
  phone: function (e) {
    this.setData({
      receiverPhone: e.detail.value
    })
  },
  address: function (e) {
    this.setData({
      address: e.detail.value
    })
  },
  detail: function (e) {
    this.setData({
      detailAddress: e.detail.value
    })
  },
  chooseArea: function () {
    if (!this.data.schoolId) {
      wx.showToast({
        title: '请先选择校区',
        icon: 'none'
      })
    }
    wx.navigateTo({
      url: '../chooseArea/chooseArea?id=' + this.data.schoolId,
    })
  },
  bindMultiPickerChange: function (e) {
    let multiArray = this.data.multiArray;
    let indexArr = e.detail.value;
    if (multiArray[0][indexArr[0]] && multiArray[1][indexArr[1]] && multiArray[2][indexArr[2]]) {
      let address = multiArray[0][indexArr[0]].name + multiArray[1][indexArr[1]].name + multiArray[2][indexArr[2]].name;
      this.setData({
        pickerAddress: address,
        multiIndex: indexArr,
        cityId: multiArray[1][indexArr[1]].id,
        schoolId: multiArray[2][indexArr[2]].id
      });
    }
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
    common.getCityList({
      provinceId: val
    }, function (res) {
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
    common.getSchoolList({
      cityId: val
    }, function (res) {
      if (res.errno == 0) {
        multiArray[2] = res.data;
        self.setData({
          multiArray: multiArray
        })
      }
    })
  },
  sexChoose: function (e) {
    var sex = e.target.dataset.sex || '';
    this.setData({
      gender: sex == 'male' ? 0 : 1
    })
  },
  delete: function () {
    if (this.data.type == 'send') {
      this.deleteSenderAddress();
      return;
    }
    let id = this.data.id;
    editor.delete({
      id: id
    }, function (res) {
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
  },
  saveSenderAddress: function () {
    const base = this.data;
    let arrFlag = [];
    let param = {
      senderName: base.receiverName,
      senderPhone: base.receiverPhone,
      address: base.detailAddress,
      isDefault: base.isDefault,
      id: base.id || null,
      userId: base.userId || null
    }
    console.log(param)
    Object.keys(param).forEach(function (index) {
      if (index == 'senderName' || index == 'senderPhone' || index == 'address') {
        arrFlag.push(Boolean(param[index]));
      }
    })
    if (arrFlag.indexOf(false) >= 0) {
      wx.showToast({
        title: '请填写全部表单项',
        icon: 'none'
      });
      return;
    }
    editor.saveSender(param, function (res) {
      if (res.errno == 0) {
        wx.showToast({
          title: '修改成功',
          success: function () {
            wx.navigateBack({
              delta: 1
            })
          }
        })
      }
    })
  },
  deleteSenderAddress: function () {
    let id = this.data.id;
    editor.deleteSender({
      id: id
    }, function (res) {
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