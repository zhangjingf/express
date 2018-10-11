const {ajax} = require('../utils/request').default;
const {sendLink} = require('../host').default
class Common {
    getRegion(data, callback) {
        ajax({
            url: sendLink() + '/api/region/list',
            type: 'POST',
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

export default new Common