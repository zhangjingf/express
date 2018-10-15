const {ajax} = require('../utils/request').default;
const {sendLink} = require('../host').default
class Eidtor {
    getAdrressDetail(data, callback) {
        ajax({
            url: sendLink() + '/api/address/detail',
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
    save(data, callback) {
        ajax({
            url: sendLink() + '/api/address/save',
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
    delete(data, callback) {
        ajax({
            url: sendLink() + '/api/address/save',
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

export default new Eidtor