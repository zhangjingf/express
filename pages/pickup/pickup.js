// pages/pickup/pickup.js
import pickup from"../../services/pickup"
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
    checkedDate: ''
  },
  onLoad: function (options) {
    var self = this
    var now = new Date().getHours()
    var todayArr = []
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
    pickup.getSchoolPkg({schoolId: 4}, function(res) {
      if (res.errno == 0) {
        self.setData({
          pkgList: res.data
        })
      }
    })
    pickup.getSchoolExpressList({schoolId:4}, function(res) {
      if (res.errno == 0) {
        self.setData({
          expressList: res.data
        })
      }
    })
    pickup.getSchoolDate({schoolId: 4}, function(res) {
      if(res.errno == 0) {
        if (res.data.length > 0) {
          for (let index in res.data) {
            if(res.data[index].startTime.split(":")[0] < now && res.data[index].endTime.split(":")[0] > now) {
              todayArr.push(res.data[index])
            }
          }
          self.setData({
            tomorrowList: res.data,
            todayList: todayArr
          })
        }
      }
    })
  },
  onReady: function () {},
  goAddress: function () {

  },
  add: function () {
    this.setData({
      orderNum: [1, 2]
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
    var id = e.target.dateset.id;
    console.log(id)
  },
  chooseDate: function () {
    this.setData({
      visible3: true
    })
  }
})