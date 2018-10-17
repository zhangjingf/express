// pages/myAddress/index.js
import address from "../../services/myAddress";
Page({
  data: {
    addressList: null,
    color: 'blue'
  },
  onLoad: function (options) {
    //this.getAddList();
  },
  onShow: function () {
    this.getAddList();
  },
  check: function (e) {
    var id = e.currentTarget.dataset.id;
    var data = this.data.addressList;
    for (let index in data) {
       if (data[index].id == id) {
        data[index].checked = !data[index].checked;
      }
    }
    this.setData({
      addressList: data
    });
  },
  goEdit: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../editor/editor?id=' + id + '&type=new',
    })
  },
  getAddList: function () {
    var self = this;
    address.getAddressList({}, function(res) {
      if (res.errno == 0) {
        if (res.data.length > 0) {
          res.data[0].checked = true;
        }
        self.setData({
          addressList: res.data
        })
      }
    })
  }
})