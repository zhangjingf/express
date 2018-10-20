// pages/pickup/pickup.js
import pickup from "../../services/pickup";
import address from "../../services/myAddress";
Page({
  data: {
    orderInfo: [{index: 1 }],
    agree: true,
    cancel: true,
    visible: false,
    showCancel: false,
    visible2: false,
    visible3: false,
    expressList: null,
    expressIndex: null,
    pkgList: null,
    todayList: null,
    tomorrowList: null,
    defaultDate: null,
    checkedDate: '',
    type: '',
    maskVisible: true,
    addressInfo: '',
    basePkgList: '',
    totalPrice: 0
  },
  onLoad: function (options) {
    var self = this
    var now = new Date().getHours()
    var todayArr = []
    var schoolId =  wx.getStorageSync('schoolId') || '';
    pickup.getSchoolPkg({
      schoolId: schoolId
    }, function (res) {
      if (res.errno == 0) {
        let orderArr = self.data.orderInfo;
        orderArr[0].pkgList = res.data;
        self.setData({
          orderInfo: orderArr,
          basePkgList: JSON.parse(JSON.stringify(res.data))
        })
      }
    })
    pickup.getSchoolExpressList({
      schoolId: schoolId
    }, function (res) {
      if (res.errno == 0) {
        self.setData({
          expressList: res.data,
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
    let baseData = this.data.basePkgList;
    let orderNumArr = this.data.orderInfo;
    for (let i in baseData) {
      baseData[i].checked = '';
    }
    orderNumArr.push({index: (orderNumArr[orderNumArr.length-1].index + 1), pkgList: baseData});
    this.setData({
      orderInfo: orderNumArr,
      basePkgList: JSON.parse(JSON.stringify(baseData))
    })
  },
  delete: function (e) {
    let index = e.target.dataset.index;
    let orderArr = this.data.orderInfo;
    let sum = 0;
    for (let i in orderArr) {
      if (orderArr[i].index == index) {
        orderArr.splice(i, 1);
      }
    }
    for (let i in orderArr) {
      if (!!orderArr[i].price) {
        sum += orderArr[i].price;
      }
    }
    this.setData({
      orderInfo: orderArr,
      totalPrice: sum
    })
  },
  chooseRange: function (e) {
    let id = e.target.dataset.id;
    let index = e.target.dataset.index;
    let orderArr = this.data.orderInfo;
    for (let i in orderArr) {
      if (orderArr[i].index == index) {
        for(let y in orderArr[i].pkgList) {
          if (orderArr[i].pkgList[y].id == id) {
            orderArr[i].pkgList[y].checked = 'checked';
            orderArr[i].pkgId = id;
            this.checkFullfill(orderArr[i]);
          } else {
            orderArr[i].pkgList[y].checked = '';
          }
        }
      }
    }
    this.setData({
      orderInfo: orderArr
    });
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
    let id = e.target.dataset.id;
    let expressArr = this.data.expressList;
    let index = this.data.expressIndex;
    let orderArr = this.data.orderInfo;
    for (let item of expressArr) {
      if (item.id == id) {
        item.checked = true;
        for (let i in orderArr) {
          if (orderArr[i].index == index) {
            orderArr[i].expressName = item.expressName;
            orderArr[i].expressId = item.id;
            this.checkFullfill(orderArr[i]);
          }
        }
        this.setData({
          orderInfo: orderArr
        });
      } else {
        item.checked = false;
      }
    }
    this.setData({
      expressList: expressArr
    })
    this.setData({
      visible2: false
    })
  },
  estimatedPrice: function (val) {
    const self = this;
    let param = {
      addressId: this.data.addressInfo.id,
      schoolId: this.data.addressInfo.schoolId,
      expressId: val.expressId,
      pkgId: val.pkgId
    };
    let orderArr = this.data.orderInfo;
    let sum = 0;
    pickup.getEstimatedPriceOne(param, function(res) {
      if (res.errno == 0) {
        for (let i in orderArr) {
          if (orderArr[i].index == val.index) {
            orderArr[i].price = res.data.price;
          }
          if (orderArr[i].price) {
            sum += orderArr[i].price;
          }
        }
        self.setData({
          orderInfo: orderArr,
          totalPrice: sum
        });
      }
    })
  },
  checkExpress: function (e) {
    let expressArr = this.data.expressList;
    for (let i in expressArr) {
      expressArr[i].checked = false;
    }
    this.setData({
      visible2: true,
      expressIndex: e.target.dataset.index,
      expressList: expressArr
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
  maskFlag2: function () {
    this.setData({
      visible2: false
    })
  },
  maskFlag3: function () {
    this.setData({
      visible3: false
    })
  },
  checkFullfill: function (val) {
    if (val.expressId && val.pkgId) {
      this.estimatedPrice(val)
    }
  },
  order: function () {},
  pay: function () {
    wx.requestPayment({
      timeStamp: '', //时间戳
      nonceStr: '', //随机字符串
      package: '', //统一下单接口返回的 prepay_id 参数值
      paySign: '', //签名
      success: function (res) {
        console.log(res)
      },
      fail: function () {
        wx.showToast({
          title: '支付失败，请重新支付'
        })
      }
    })
  }
})