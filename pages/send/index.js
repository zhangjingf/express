// pages/send/index.js
import pickup from "../../services/pickup";
import address from "../../services/myAddress";
Page({
  data: {
    isChecked: null,
    color: '#008CF0',
    wordNum: '0',
    message: null,
    index: 0,
    switchColor: "#CCCCCC",
    todayList: null,
    tomorrowList: null,
    showCancel: false,
    visible3: false,
    defaultDate: null,
    checkedDate: '',
    type: '',
    maskVisible: true,
    typeList: {
      0: '其他',
      1: '衣物',
      2: '食品',
      3: '数码产品',
      4: '文件',
      5: '日用品'
    }
  },
  onLoad: function () {
    var self = this;
    var now = new Date().getHours();
    var todayArr = [];
    var schoolId = wx.getStorageSync('schoolId') || '';
    pickup.getSchoolDate({
      schoolId: schoolId
    }, function (res) {
      if (res.errno == 0) {
        if (res.data.length > 0) {
          for (let index in res.data) {
            if (res.data[index].startTime.split(":")[0] < now && res.data[index].endTime.split(":")[0] > now) {
              todayArr.push(res.data[index]);
            }
          }
          self.setData({
            tomorrowList: res.data,
            todayList: todayArr
          })
          self.setData({
            defaultDate: todayArr.length > 0 ? todayArr : res.data,
            type: todayArr.length > 0 ? 'today' : 'tomorrow'
          })
        }
      }
    })
    pickup.goodsType({}, function(res) {
      if (res.errno == 0 && res.data) {
        self.setData({
          typeList: res.data
        })
      }
    })
    pickup.servicePrice({schoolId: schoolId}, function(res) {
      if (res.errno == 0) {

      }
    })
  },
  onShow: function () {
    const self = this;
    address.getAddressList({}, function(res) {
      if (res.errno == 0) {
        if(res.data.length > 0) {
          for (let index in res.data) {
            if (res.data[index].isDefault == 1) {
              self.setData({
                addressInfo: res.data[index]
              })
            }
          }
        }
      }
    })
    address.gerSenderAddress({}, function(res) {
      if (res.errno == 0) {
        if (res.data.length > 0) {
          for (let index in res.data) {
            if (res.data[index].isDefault == 1) {
              self.setData({
                senderAddressInfo: res.data[index]
              })
              console.log(self.data.senderAddressInfo)
            }
          }
        }
      }
    })
  },
  bindInput: function (e) {
    this.setData({
      message: e.detail.value,
      wordNum: e.detail.value.length
    })
  },
  bindTypeChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },
  goMyAddress: function (e) {
    wx.navigateTo({
      url: '../myAddress/index',
    })
  },
  bookingDate: function (e) {
    var id = e.target.dataset.id;
    var dateArr = this.data.defaultDate;
    var choosedDate = '';
    for (let item of dateArr) {
      if (item.id == id) {
        item.checked = true;
        choosedDate = item.startTime + '-' + item.endTime;
      } else {
        item.checked = false;
      }
    }
    this.setData({
      checkedDate: this.data.type == 'today' ? ('今天' + choosedDate) : ('明天' + choosedDate)
    })
    this.setData({
      defaultDate: dateArr
    })
    this.setData({
      visible3: false
    })
  },
  chooseDate: function () {
    this.setData({
      visible3: true
    })
  },
  maskFlag3: function () {
    this.setData({
      visible3: false
    })
  },
  chooseType: function () {
    this.setData({
      visible4: true
    })
  },
  toggleDay: function (e) {
    var type = e.target.dataset.type;
    this.setData({
      type: type,
      defaultDate: type == 'today' ? this.data.todayList : this.data.tomorrowList
    })
  },
  maskFlag4: function () {
    this.setData({
      visible4: false
    })
  },
  chooseTp: function (e) {
    let id = e.target.dataset.id || '';
    let name = ''
    for (let item of this.data.typeList) {
      if (item.goodsType == id) {
        name = item.goodsName
      }
    }
    this.setData({
      pkgType: id,
      visible4: false,
      pkgTypeName: name
    });
  },
  goEditor: function (e) {
    wx.navigateTo({
      url: '../editor/editor?from=send&type='+ e.target.dataset.type
    })
  }
})