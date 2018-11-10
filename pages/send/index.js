// pages/send/index.js
import pickup from "../../services/pickup";
import address from "../../services/myAddress";
Page({
  data: {
    cancel: true,
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
    },
    servicePrice: 0,
    tipPrice: 0,
    totalPrice: 0
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
        self.setData({
          servicePrice: res.data.servicePrice
        })
      }
    })
  },
  onShow: function () {
    const self = this;
    self.addressInfo = null;
    self.senderAddressInfo = null;
    address.getAddressList({ schoolId: wx.getStorageSync('schoolId')}, function(res) {
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
    address.gerSenderAddress({ schoolId: wx.getStorageSync('schoolId')}, function(res) {
      if (res.errno == 0) {
        if (res.data.length > 0) {
          self.setData({
            senderAddressInfo: res.data[0]
          })
          for (let index in res.data) {
            if (res.data[index].isDefault == 1) {
              self.setData({
                senderAddressInfo: res.data[index]
              })
            }
          }
        }
      }
    })
    this.getEstimatedPrice();
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
    let type = e.target.dataset.type || '';
    wx.navigateTo({
      url: '../myAddress/index?from=send&type=' + type,
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
  cancel: function () {
    this.setData({
      cancel: !this.data.cancel
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
      url: '../editor/editor?from=send&status=new&type='+ e.target.dataset.type
    })
  },
  fees: function (e) {
    this.setData({
      tipPrice: e.detail.value
    })
    this.getEstimatedPrice()
  },
  getEstimatedPrice: function () {
    const self = this;
    pickup.getEstimatedPriceOne({orderType: 2, tipPrice: this.data.tipPrice}, function(res) {
      if (res.errno == 0) {
        self.setData({
          totalPrice: res.data.price
        })
      }
    })
  },
  submit: function () {
    if (!this.data.checkedDate) {
      wx.showToast({
        title: '请选择时间',
        icon: 'none'
      })
      return;
    }
    if (!this.data.pkgType) {
      wx.showToast({
        title: '请选择物品类型',
        icon: 'none'
      })
      return;
    }
    if (!this.data.addressInfo) {
      wx.showToast({
        title: '请选择寄件人',
        icon: 'none'
      })
      return;
    }
    if (!this.data.senderAddressInfo) {
      wx.showToast({
        title: '请选择收件人',
        icon: 'none'
      })
      return;
    }
    if (!this.data.cancel) {
      wx.showToast({
        title: '请选择寄件协议',
        icon: 'none'
      });
      return;
    }
    this.order()
  },
  order: function () {
    let params = {
      userLng: wx.getStorageSync('lng'),
      userLat: wx.getStorageSync('lat'),
      isTody: this.data.type == 'today' ? 0 : 1,
      hopeTime: this.data.checkedDate.replace(/[\u4e00-\u9fa5]/g, ''),
      goodsType: this.data.pkgType,
      tipPrice: this.data.tipPrice, //小费
      servicePrice: this.data.servicePrice, //服务金额
      estimatePrice: this.data.totalPrice, //预估价格
      totalPrice: this.data.totalPrice, //totalPrice
      receiverId: this.data.senderAddressInfo.id,
      senderId: this.data.addressInfo.id,
      remark: this.data.message
    }
    pickup.senderOrder(params, function(res) {
      if (res.code == 0) {
        wx.showToast({
          title: '下单成功',
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
  },
  editorreceive: function() {
    wx.navigateTo({
      url: '../editor/editor?id=' + this.data.addressInfo.id + '&type=receive&from=send&delete=no',
    })
  },
  editorsender: function () {
    wx.navigateTo({
      url: '../editor/editor?id=' + this.data.senderAddressInfo.id + '&type=send&from=send&delete=no',
    })
  }
})