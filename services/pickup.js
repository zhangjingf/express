//获取服务调用工具类，如jq.ajax，调用方式为 ajax(options)
const {ajax} = require('../utils/request').default
// 服务地址配置文件引入
const {sendLink} = require('../host').default
class Pickup {
    getSchoolPkg(data, callback) {
        ajax({
            url: sendLink() + '/api/schoolPkg/list',
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
    getSchoolExpressList(data, callback) {
        ajax({
            url: sendLink() + '/api/schoolExpress/list',
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
    getSchoolDate(data, callback) {
        ajax({
            url: sendLink() + '/api/schoolDate/list',
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
    getEstimatedPriceOne(data, callback) {
        ajax({
            url: sendLink() + '/api/estimated/estimatedPriceOne',
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
    createReceiverOrder(data, callback) {
        ajax({
            url: sendLink() + '/api/userOrder/createReceiverOrder',
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
    batchPay(data, callback) {
        ajax({
            url: sendLink() + '/api/pay/batchPay',
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

    singlePay(data, callback) {
        ajax({
            url: sendLink() + '/api/pay/singlePay',
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

    payResult(data, callback) {
        ajax({
            url: sendLink() + '/api/pay/payResultQuery',
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
    servicePrice(data, callback) {
        ajax({
            url: sendLink() + '/api/estimated/servicePrice',
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

    goodsType(data, callback) {
        ajax({
            url: sendLink() + '/api/goods/getGoodsType',
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
    senderOrder(data, callback) {
        ajax({
            url: sendLink() + '/api/userOrder/createSenderOrder',
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

export default new Pickup