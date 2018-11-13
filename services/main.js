//获取服务调用工具类，如jq.ajax，调用方式为 ajax(options)
const { ajax } = require('../utils/request').default
// 服务地址配置文件引入
const { sendLink } = require('../host').default
class Main {
  wxBindPosition(data, callback){
    ajax({
      url: sendLink() + '/api/school/positionSchool',
      type: 'GET',
      data: data,
      success: function (ret) {
        typeof callback == 'function' && callback.call(this, ret)
      },
      error: function (ret) {
        typeof callback == 'function' && callback.call(this, ret)
      }
    })
  }
  wxBindImg(data, callback) {
    ajax({
      url: sendLink() + '/api/index/index',
      type: 'GET',
      data: data,
      success: function (ret) {
        typeof callback == 'function' && callback.call(this, ret)
      },
      error: function (ret) {
        typeof callback == 'function' && callback.call(this, ret)
      }
    })
  }
  getAuth(data, callback) {
    ajax({
      url: sendLink() + '/api/appAuth/isAuthSendOrder',
      type: 'GET',
      data: data,
      success: function (ret) {
        typeof callback == 'function' && callback.call(this, ret)
      },
      error: function (ret) {
        typeof callback == 'function' && callback.call(this, ret)
      }
    })
  }
}

export default new Main