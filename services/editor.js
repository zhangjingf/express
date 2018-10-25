const {ajax} = require('../utils/request').default;
const {sendLink} = require('../host').default
class Eidtor {
    getAdrressDetail(data, callback) {
        ajax({
            url: sendLink() + '/api/address/detail',
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
    save(data, callback) {
        ajax({
            url: sendLink() + '/api/address/save',
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
    delete(data, callback) {
        ajax({
            url: sendLink() + '/api/address/delete',
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
    getSenderAdrressDetail(data, callback) {
        ajax({
            url: sendLink() + '/api/senderAddress/detail',
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
    saveSender(data, callback) {
        ajax({
            url: sendLink() + '/api/senderAddress/save',
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
    deleteSender(data, callback) {
        ajax({
            url: sendLink() + '/api/senderAddress/delete',
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

export default new Eidtor