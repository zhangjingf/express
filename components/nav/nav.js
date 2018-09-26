// components/nav/nav.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    checkedStatus: {
      type: String,
      value: '',
      observer: function(newVal, oldVal) {
        console.log(newVal)
      }
    }
  },
  data: {

  },
  methods: {
    goMain: function () {
      wx.navigateTo({
        url: '../main/main',
      })
    },
    goOrder: function () {
      wx.navigateTo({
        url: '../order/index',
      })
    },
    goMymenu: function () {
      wx.navigateTo({
        url: '../myMenu/index',
      })
    }
  }
})
