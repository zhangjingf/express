// pages/chooseArea/chooseArea.js
import chooseArea from '../../services/chooseArea'
Page({
  data: {
    areaList: [],
    position: 'right',
    color: '#008CF0',
    current: null
  },
  onLoad: function (options) {
    this.getHostelList()
  },
  search: function (e) {
    //var val = e.detail.value;
    //this.getHostelList(val);
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
        wx.setStorage({
          key: 'hostelName',
          data: data[index].hostelName
        })
        wx.setStorage({
          key: 'hostelId',
          data: data[index].id
        })
        wx.navigateBack({
          delta: 1
        })
      }
    }
    this.setData({
      areaList: data
    });
  },
  getHostelList: function (val) {
    let hostelName = val || '';
    const self = this;
    let id = wx.getStorageSync('schoolId');
    chooseArea.getHostel({
          schoolId: id,
          hostelName: hostelName
        }, function (res) {
      if (res.errno == 0) {
        self.setData({
          areaList: res.data
        })
      }
    })
  }
})