// pages/pickup/pickup.js
import pickup from "../../services/pickup";
import address from "../../services/myAddress";
Page({
  data: {
    orderInfo: [{index: 1, price: 0 }],
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
    basePkgList: null,
    totalPrice: 0
  },
  onLoad: function (options) {
    var self = this;
    var now = new Date().getHours();
    var todayArr = [];
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
            if (res.data[index].startTime.split(":")[0] > now) {
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
  },
  onShow: function () {
    const self = this;
    self.addressInfo = null;
    address.getAddressList({schoolId: wx.getStorageSync('schoolId')}, function(res) {
      if (res.errno == 0) {
        if(res.data.length > 0) {
          self.setData({
            addressInfo: res.data[0]
          })
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
    });
  },
  editor: function() {
    wx.navigateTo({
      url: '../editor/editor?id=' + this.data.addressInfo.id + '&type=receive&from=receive',
    })
  },
  goEditor: function (e) {
    wx.navigateTo({
      url: '../editor/editor?type=receive&status=new'
    })
  },
  add: function () {
    let baseData = this.data.basePkgList;
    let orderNumArr = this.data.orderInfo;
    for (let i in baseData) {
      baseData[i].checked = '';
    }
    orderNumArr.push({index: (orderNumArr[orderNumArr.length-1].index + 1), pkgList: baseData, price: 0});
    this.setData({
      orderInfo: orderNumArr,
      basePkgList: JSON.parse(JSON.stringify(baseData))
    });
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
      orderArr[i].index = Number(i) + 1
      if (!!orderArr[i].price) {
        sum += orderArr[i].price;
      }
    }
    this.setData({
      orderInfo: orderArr,
      totalPrice: sum
    });
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
            orderArr[i].pkgSize = orderArr[i].pkgList[y].pkgCode;
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
    });
    this.setData({
      visible2: false
    });
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
  expressKey: function (e) {
    const orderArr = this.data.orderInfo;
    let index = e.target.dataset.index;
    let key = e.detail.value;
    for (let i in orderArr) {
      if (orderArr[i].index == index) {
        orderArr[i].expressKey = key;
      }
    }
    this.setData({
      orderInfo: orderArr
    });
  },
  remark: function (e) {
    const orderArr = this.data.orderInfo;
    let index = e.target.dataset.index;
    let remark = e.detail.value;
    for(let i in orderArr) {
      if (orderArr[i].index == index) {
        orderArr[i].remark = remark;
      }
    }
    this.setData({
      orderInfo: orderArr
    });
  },
  checkOrder: function () {
    let orderArr = this.data.orderInfo;
    let serviceTime = this.data.checkedDate;
    if (!serviceTime) {
      wx.showToast({
        title: '请选择时间',
        icon: 'none'
      });
      return;
    }
    if (!this.data.cancel) {
      wx.showToast({
        title: '请选择取件协议',
        icon: 'none'
      });
      return;
    }
    let validArr = [];
    for (let i in orderArr) {
      if (orderArr[i].expressKey && orderArr[i].pkgSize && orderArr[i].expressId && orderArr[i].price) {
        validArr.push(true);
      } else {
        validArr.push(false);
      }
    }
    if (validArr.indexOf(false) >= 0) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      });
    } else {
      this.createOrder();
    }
  },
  createOrder: function () {
    const self = this;
    let orderArr = this.data.orderInfo;
    let orderDetail = [];
    for (let i in orderArr) {
      orderDetail.push({
        orderSeq: orderArr[i].index,
        expressKey: orderArr[i].expressKey,
        pkgSize: orderArr[i].pkgSize,
        expressOrgId: orderArr[i].expressId,
        servicePrice: orderArr[i].price,
        remark: orderArr[i].remark || ''
      });
    }
    let param = {
      userLng: wx.getStorageSync('lng'),
      userLat: wx.getStorageSync('lat'),
      receiverId: this.data.addressInfo.id,
      serviceDay: this.data.type == 'today' ? 0 : 1,
      serviceTime: this.data.checkedDate.replace(/[\u4e00-\u9fa5]/g, ''),
      orderDetails: orderDetail
    };
    pickup.createReceiverOrder(param, function(res) {
      if (res.code == 0 && res.data) {
        self.batchPay(res.data);
      }
    })
  },
  batchPay: function (val) {
    let self = this;
    pickup.batchPay({
          batchId: val.batchId.toString(),
          payAmount: val.orderPrice
        }, function (res) {
      if (res.code == 0 && res.data) {
        self.pay(res.data);
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  },
  pay: function (val) {
    const self = this;
    wx.requestPayment({
      timeStamp: val.timeStamp, //时间戳
      nonceStr: val.nonceStr, //随机字符串
      package: val.package, //统一下单接口返回的 prepay_id 参数值
      signType: 'MD5', //签名
      paySign: val.paySign,
      success: function (res) {
        console.warn(res);
        self.result(val);
      },
      fail: function (res) {
        console.warn(res);
        wx.showToast({
          title: '支付失败，请重新支付',
          icon: 'none'
        })
      }
    })
  },
  result: function (val) {
    pickup.payResult({
      paymentApplyId: val.paymentApplyId
    }, function (res) {
      if (res.code == 0) {
        wx.showToast({
          title: '支付成功',
          icon: 'none'
        })
        wx.reLaunch({
          url: '../order/index',
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  }
})