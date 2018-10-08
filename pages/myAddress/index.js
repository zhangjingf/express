// pages/myAddress/index.js
Page({
  data: {
    addressInfo: [{
      id: 11,
      name: 'zahn',
      phone: 111111111,
      address: 'wfewfefrefre',
      checked: false
    }],
    color: 'blue'
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的地址簿',
    })
  },
  onReady: function () {

  },
  check: function (e) {
    var id = e.currentTarget.dataset.id;
    var data = this.data.addressInfo;
    for (let index in data) {
       if (data[index].id == id) {
        data[index].checked = !data[index].checked;
      }
    }
    this.setData({
      addressInfo: data
    });
  },
  goEdit: function () {
    wx.navigateTo({
      url: '../editor/editor',
    })
  }
})