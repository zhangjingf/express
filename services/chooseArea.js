//获取服务调用工具类，如jq.ajax，调用方式为 ajax(options)
const {ajax} = require('../utils/request').default
const {sendLink} = require('../host').default
class ChooseArea {
    getHostel(data, callback) {
        ajax({
            url: sendLink() + '/api/schoolHostel/list',
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

export default new ChooseArea