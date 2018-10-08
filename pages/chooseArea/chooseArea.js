// pages/chooseArea/chooseArea.js
Page({
  data: {
    areaList: [{
        id: 11,
        name: 'USA',
        value: '美国'
      },
      {
        id: 22,
        name: 'CHN',
        value: '中国'
      }
    ],
    position: 'right',
    color: '#008CF0',
    current: null
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '选择区域',
    })
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  handle: function (e) {
    var id = e.currentTarget.dataset.id;
    var data = this.data.areaList;
    for (let index in data) {
      if (data[index].id == id) {
        data[index].checked = !data[index].checked;
      } else {
        data[index].checked = false;
      }
      if (data[index].checked) {
        this.setData({
          current: data[index]
        })
      }
    }
    this.setData({
      areaList: data
    });
  }
})