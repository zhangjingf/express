//获取服务调用工具类，如jq.ajax，调用方式为 ajax(options)
const {ajax} = require('../utils/request').default
// 服务地址配置文件引入
const { sendLink} = require('../host').default
class Order {
    orderList(data, callback) {
        ajax({
            url: sendLink() + '/api/userOrder/searchOrderByUserId',
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
    orderDetail(data, callback) {
        ajax({
            url: sendLink() + '/api/userOrder/searchOrderByOrderId',
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

export default new Order