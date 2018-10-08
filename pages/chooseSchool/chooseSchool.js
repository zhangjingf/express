// pages/chooseSchool/chooseSchool.js
import sendRequest from "../../services/chooseSchool"
Page({
  data: {
    inputValue: '',
    schoolName: '湖南理工学院',
    nearSchool: [{id: 11, name: '湖南理工'}, {id:22, name: '湖南工理'}, {id: 33, name: '湖南'}]
  },
  onLoad: function (options) {
    
  },
  bindKeyInput: function (e) {
    var str = e.detail.value
    this.setData({
      inputValue: str
    })
    sendRequest.getSchool({schoolName: str}, function (res) {
      if (res.errno == 0) {
        console.log(res)
      }
    })
  },
  remove: function (e) {
    console.log(e)
  }
})