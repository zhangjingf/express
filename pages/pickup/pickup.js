// pages/pickup/pickup.js
import pickup from "../../services/pickup";
import address from "../../services/myAddress";
Page({
  data: {
    orderNum: [1],
    agree: true,
    cancel: true,
    visible: false,
    showCancel: false,
    visible2: false,
    visible3: false,
    expressList: null,
    checkedExpressName: '',
    checkedExpressId: null,
    pkgList: null,
    checkedPkgId: null,
    todayList: null,
    tomorrowList: null,
    defaultDate: null,
    checkedDate: '',
    type: '',
    maskVisible: true,
    addressInfo: ''
  },
  onLoad: function (options) {
    var self = this
    var now = new Date().getHours()
    var todayArr = []
    var schoolId =  wx.getStorageSync('schoolId') || '';
    // wx.showModal({
    //   title: '取件公告',
    //   content: '3124343',
    //   confirmText: '我知道了',
    //   confirmColor: '#008CF0',
    //   showCancel: false,
    //   success: function () {
    //     console.log('ok')
    //   }
    // })
    pickup.getSchoolPkg({
      schoolId: schoolId
    }, function (res) {
      if (res.errno == 0) {
        self.setData({
          pkgList: res.data
        })
      }
    })
    pickup.getSchoolExpressList({
      schoolId: schoolId
    }, function (res) {
      if (res.errno == 0) {
        self.setData({
          expressList: res.data
        })
      }
    })
    pickup.getSchoolDate({
      schoolId: schoolId
    }, function (res) {
      if (res.errno == 0) {
        if (res.data.length > 0) {
          for (let index in res.data) {
            if (res.data[index].startTime.split(":")[0] < now && res.data[index].endTime.split(":")[0] > now) {
              todayArr.push(res.data[index])
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
  },
  goAddress: function () {
    wx.navigateTo({
      url: '../myAddress/index?type=receive',
    })
  },
  add: function () {
    let orderNumArr = this.data.orderNum;
    orderNumArr.push(orderNumArr[orderNumArr.length -1] +1);
    this.setData({
      orderNum: orderNumArr
    })
  },
  chooseRange: function (e) {
    let id = e.target.dataset.id;
    let pkgArr = this.data.pkgList;
    for (let item of pkgArr) {
      if (item.id == id) {
        item.checked = 'checked'
        this.setData({
          checkedPkgId: id
        })
      } else {
        item.checked = ''
      }
    }
    this.setData({
      pkgList: pkgArr
    })
  },
  cancel: function () {
    this.setData({
      cancel: !this.data.cancel
    })
  },
  handleVisible: function () {
    this.setData({
      visible: !this.data.visible
    })
  },
  chooseExpress: function (e) {
    var id = e.target.dataset.id
    var expressArr = this.data.expressList
    for (let item of expressArr) {
      if (item.id == id) {
        item.checked = true
        this.setData({
          checkedExpressName: item.expressName,
          checkedExpressId: id
        })
      } else {
        item.checked = false
      }
    }
    this.setData({
      expressList: expressArr
    })
    this.setData({
      visible2: false
    })
  },
  checkExpress: function () {
    this.setData({
      visible2: true
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
  toggleDay: function (e) {
    var type = e.target.dataset.type;
    this.setData({
      type: type,
      defaultDate: type == 'today' ? this.data.todayList : this.data.tomorrowList
    })
  },
  estimatedPrice: function () {},
  maskFlag2: function () {
    this.setData({
      visible2: false
    })
  },
  maskFlag3: function () {
    this.setData({
      visible3: false
    })
  }
})