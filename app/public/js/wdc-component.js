/**
 * wdc-commponent
 */
var wdc = {};

/**
 * cookie 操作
 */
//设置cookie  
wdc.setCookie = function(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires + ";domain=.vko.cn;path=/";
};
//设置会话级别cookie  
wdc.setCookie_s = function(cname, cvalue) {
    var expires = "";
    document.cookie = cname + "=" + cvalue + "; " + expires + ";domain=.vko.cn;path=/";
};
//删除cookie  
wdc.delCookie = function(name) {
    console.log(name);
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookieByName(name);
    if (cval != null && cval != '') {
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + "; domain=.vko.cn; path=/";
    }
};
//获取指定名称的cookie的值  
wdc.getCookie = function(objname) {
    var arrstr = document.cookie.split("; ");
    for (var i = 0; i < arrstr.length; i++) {
        var temp = arrstr[i].split("=");
        if (temp[0] == objname) {
            return unescape(temp[1]);
        }
    }
    return "";
};
//获取指定名称的cookie的值——专门处理汉字  
wdc.getCookie_gbk = function(objname) {
    var arrstr = document.cookie.split("; ");
    for (var i = 0; i < arrstr.length; i++) {
        var temp = arrstr[i].split("=");
        if (temp[0] == objname) {
            temp[1] = temp[1].substring(1, temp[1].length - 1); //去掉""  
            return decodeURIComponent(temp[1]); //解码(后台一定要编码)  
        }
    }
    return "";
};

/**
 * 网络请求
 */
//ajax get
wdc.get = function(url, data, ok, error) {
    if(URLMAPS && URLMAPS.genURL){
        url = URLMAPS.genURL(url);
    }
    $.ajax({
        beforeSend: function(xhr) {
            xhr.setRequestHeader('x-csrf-token', wdc.getCookie('csrfToken'));
        },
        url: url,
        data: data,
        dataType: 'json',
        success: ok,
        error: error
    });
};
//ajax post
wdc.post = function(url, data, ok, error) {
    url = URLMAPS.genURL(url);
    $.ajax({
        beforeSend: function(xhr) {
            xhr.setRequestHeader('x-csrf-token', wdc.getCookie('csrfToken'));
        },
        url: url,
        data: data,
        type: 'post',
        dataType: 'json',
        success: ok,
        error: error
    });
};

//PUT请求
wdc.put = function(url, data, ok, error) {
    url = URLMAPS.genURL(url);
    $.ajax({
        beforeSend: function(xhr) {
            xhr.setRequestHeader('x-csrf-token', wdc.getCookie('csrfToken'));
        },
        url: url,
        data: data,
        type: 'put',
        dataType: 'json',
        success: ok,
        error: error
    });
};

//PUT请求
wdc.patch = function(url, data, ok, error) {
    $.ajax({
        beforeSend: function(xhr) {
            xhr.setRequestHeader('x-csrf-token', wdc.getCookie('csrfToken'));
        },
        url: url,
        data: data,
        type: 'patch',
        dataType: 'json',
        success: ok,
        error: error
    });
};


/**
 * 定时器
 */
wdc.interval = function(func, space, times, endfunc) {
    var totalTimes = times;
    var intervalFunc = function() {
        if (typeof times === "undefined" || times-- > 0) {
            setTimeout(intervalFunc, space);
            try {
                func.call(null, totalTimes - times);
            } catch (e) {
                times = 0;
                throw e.toString();
            }
        }
        if (times == 0) {
            endfunc.call(null);
        }
    };
    setTimeout(intervalFunc, space);
};

/**
 * 字符串格式匹配
 */
//匹配空字符串
wdc.isEmpty = function(_str) {
    var str = _str.trim();
    if (str.length == 0) return true;
    return false;
};
//匹配数字
wdc.isNubmer = function(str) {
    var result = ('' + str).match(/^[0-9]*$/);
    if (result == null) return false;
    return true;
};
//匹配邮政编码
wdc.isZipcode = function(str) {
    var result = ('' + str).match(/^[0-9]{6}$/);
    if (result == null) return false;
    return true;
};
//匹配手机号码
wdc.isMobile = function(str) {
    var result = ('' + str).match(/^1[0-9]{10}$/);
    if (result == null) return false;
    return true;
};
//匹配金额
wdc.isAmount = function(str) {
    // ([1-9]+\d*) 整数
    // (([1-9]+\d*)\.\d{1,2}) 带两位小数
    // (0\.[1-9]\d*) 0.带两位小数
    // (0\.0[1-9])  0.0 带两位小数
    var result = ('' + str).match(/^(([1-9]+\d*)|(([1-9]+\d*)\.\d{1,2})|(0\.[1-9]\d*)|(0\.0[1-9]))$/);
    if (result == null) return false;
    return true;
};



/**
 * 
 * 内置方法扩展
 * 
 *****************************************************/
//字符串去空格  
String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, '');
};
String.prototype.trimAll = function() {
    return this.replace(/\s+/g, '');
};
String.prototype.lTrim = function() {
    return this.replace(/(^\s*)/g, '');
};
String.prototype.rTrim = function() {
    return this.replace(/(\s*$)/g, '');
};
//返回字符串的实际长度, 一个汉字算2个长度
String.prototype.strlen = function() {
    return this.replace(/[^\x00-\xff]/g, "**").length;
};



/**
 * 
 * 全局组件
 * 
 *****************************************************/
/**
 * 文字提示组件方法
 * 
 * var options={
 *  'type': _options.type || 0,
 *  'text': _options.text || '提示',
 *  'time': _options.time || 3000,
 * }
 */
wdc.tooltips = function(_options) {
    var options = {
        obj: _options.obj, //触发对象
        text: _options.text || '提示文字'
    }

    obj_top = options.obj.offset().top;
    obj_left = options.obj.offset().left;
    obj_height = options.obj.outerHeight();
    obj_width = options.obj.outerWidth();

    //html内容
    var html = '';
    html += '<div class="wdc-tooltips">';
    html += '<div class="wdc-tooltips-content">';
    html += '<p>' + options.text + '</p>';
    html += '</div>';
    html += '</div>';
    var isHide = false;

    //目标
    options.obj.on('mouseenter', function() {
        isHide = false;
        tooltipsShow();
    }).on('mouseleave', function() {
        isHide = true;
        setTimeout(tooltipsHide, 500);
    });


    //显示tooltips
    function tooltipsShow() {
        if ($('.wdc-tooltips').length > 0) return;
        $('body').append(html);
        tips_width = $('.wdc-tooltips').outerWidth();
        $('.wdc-tooltips').css({
            'left': (obj_left - tips_width / 2 + obj_width - 5),
            'top': (obj_top + obj_height + 5),
            'opacity': 0,
            'y': -20
        }).transition({ 'opacity': 1, 'y': 0 });

        //弹出窗
        $('.wdc-tooltips').off();
        $('.wdc-tooltips').on('mouseenter', function() {
            isHide = false;
        }).on('mouseleave', function() {
            isHide = true;
            setTimeout(tooltipsHide, 500);
        });
    }
    //隐藏tooltips
    function tooltipsHide() {
        if (isHide) $('.wdc-tooltips').transition({ 'opacity': 0 }, function() {
            $(this).remove();
        });
    }
};

/**
 * 全局提示组件方法
 * 
 * var options={
 *  'type': _options.type || 0,
 *  'text': _options.text || '提示',
 *  'time': _options.time || 3000,
 * }
 */
wdc.message = function(type, text, timeout) {
    clearTimeout(window.wdcMessageTimeout);
    $('.wdc-message').remove();
    if (type === -1) return;

    var options = {
        'type': type || 0, //类型0-成功(默认) -1-关闭 1-错误 2-仅提示 3-正在响应 
        'text': text || '提示', //提示文字
        'time': timeout || 3000 //时间间隔
    };
    //添加组件容器
    var container = '<div class="wdc-message"></div>';
    $('body').append(container);
    //添加组件内容
    var html = '';
    html += '<div class="wdc-message-layer">';
    switch (options.type) {
        case 0:
            html += '<div class="wdc-message-content wdc-message-success">';
            break;
        case 1:
            html += '<div class="wdc-message-content wdc-message-error">';
            break;
        case 2:
            html += '<div class="wdc-message-content wdc-message-notice">';
            break;
            // case 3:
            //  html+='<div class="wdc-message-content wdc-message-onresponse">';
            //  break;
        default:
            html += '<div class="wdc-message-content wdc-message-success">';
            break;
    }
    html += '<i></i>';
    html += '<span>' + options.text + '</span>';
    html += '</div>';
    html += '</div>';
    $('.wdc-message').html(html);
    //添加组件动画
    $('.wdc-message-layer').css({ y: -100 }).transition({ y: 0 }, 'ease', function() {
        window.wdcMessageTimeout = setTimeout(function() {
            $('.wdc-message-layer').transition({ opacity: 0 }, 1000, function() {
                $('.wdc-message').remove();
            });
        }, options.time);
    });
};

/**
 * 对话框
 */
wdc.modal = function(_options) {
    $('.wdc-modal').remove();
    var options = {
        'title': _options.title || '提示标题',
        'text': _options.text || '提示文字',
        'submit_text': _options.submit_text || '成功',
        'cancel_text': _options.cancel_text || '失败',
        'submit_func': _options.submit_func || null,
        'cancel_func': _options.cancel_func || null,
        'close_func': _options.close_func || null
    }

    //添加组件容器
    var container = '<div class="wdc-modal"></div>';
    $('body').append(container);
    //添加组件内容
    var html = '';
    html += '<div class="wdc-modal-shadow"></div>';
    html += '<div class="wdc-modal-content">';
    html += '<div class="wdc-modal-header">';
    html += '<div class="wdc-modal-close"></div>';
    html += '</div>';
    html += '<p class="wdc-modal-title">' + options.title + '</p>';
    html += '<p class="wdc-modal-text">' + options.text + '</p>';
    html += '<div class="wdc-modal-footer" style="text-align:right;">';
    html += '<button style="margin:20px 20px 0 0;" type="button" class="wdc-modal-cancel wdc-button wdc-button-default wdc-button-small">' + options.cancel_text + '</button>';
    html += '<button style="margin:20px 20px 0 0;" type="button" class="wdc-modal-submit wdc-button wdc-button-primary wdc-button-small">' + options.submit_text + '</button>';
    html += '</div>';
    html += '<div class="wdc-modal-close"></div>';
    html += '</div>';
    $('.wdc-modal').html(html);
    $('.wdc-modal').fadeIn();

    //关闭对话框
    $('.wdc-modal-close').one('click', function() {
        $('.wdc-modal').fadeOut();
        if (options.close_func) options.close_func();
    });
    //确认对话框
    $('.wdc-modal-submit').one('click', function() {
        $('.wdc-modal').fadeOut();
        if (options.submit_func) options.submit_func();
    });
    //取消对话框
    $('.wdc-modal-cancel').one('click', function() {
        $('.wdc-modal').fadeOut();
        if (options.cancel_func) options.cancel_func();
    });
};

/**
 * 消息提示对话框
 */
wdc.msgmodal = function(_options) {
    $('.wdc-msgmodal').remove();
    var options = {
        'title': _options.title || '提示标题',
        'text': _options.text || '提示文字',
        'time': _options.time || '提示时间',
        'cb': _options.cb || null
    }

    //添加组件容器
    var container = '<div class="wdc-msgmodal"></div>';
    $('body').append(container);
    //添加组件内容
    var html = '';
    html += '<div class="wdc-msgmodal-shadow"></div>';
    html += '<div class="wdc-msgmodal-wrapper">';
    html += '<a class="wdc-msgmodal-close">×</a>';
    html += '<div class="wdc-msgmodal-content">';
    html += '<p class="wdc-msgmodal-text wdc-msgmodal-title">' + options.title + '</p>';
    html += '<p class="wdc-msgmodal-text">' + options.text + '</p>';
    html += '<p class="wdc-msgmodal-text wdc-msgmodal-time"><span class="wdc-msgmodal-timenum">' + options.time + '</span>秒后自动关闭</p>';
    html += '</div>';
    html += '</div>';
    $('.wdc-msgmodal').html(html);
    $('.wdc-msgmodal').fadeIn();

    $wdcMsgmodalTimenum = $('.wdc-msgmodal-timenum');

    function intervalFunc() {
        options.time--;
        if (options.time > 0) {
            msgmodalTimer = setTimeout(intervalFunc, 1000);
            $wdcMsgmodalTimenum.text(options.time);
        } else {
            windowClose();
        }
    };
    window.msgmodalTimer = setTimeout(intervalFunc, 1000);

    $('.wdc-msgmodal-close').off();
    $('.wdc-msgmodal-close').on('click', function() {
        windowClose();
    });

    //关闭对话框
    function windowClose() {
        $('.wdc-msgmodal').fadeOut();
        if (msgmodalTimer) {
            clearTimeout(msgmodalTimer);
            msgmodalTimer = null;
        }
        if (options.cb) options.cb();
    }
};

     /**
     * 格式化金额
     * @param {Number} val              金额数
     * @param {String} currencySyboml   金额符号
     * @param {String} integerSyboml    金额整数部分割符
     * @param {String} decimalSyboml    金额小数部分割符
     * @param {Number} decimalLens      金额保留位数
     * @return {String} result          格式好的金额
     */
  var formatMoney = function(val, currencySyboml, integerSyboml, decimalSyboml, decimalLens) {
    var round = Math.round;
    var pow = Math.pow;
    var abs = Math.abs;
    currencySyboml = currencySyboml || '&yen;';
    integerSyboml = integerSyboml || ',';
    decimalSyboml = decimalSyboml || '.';
    decimalLens = decimalLens || 2;

    var zeroMaps = [
      '', '0', '00', '000', '0000', '00000', '000000', '0000000', '00000000',
    ];
    
    var base = pow(10, decimalLens);
    var def = currencySyboml + '0' + decimalSyboml + zeroMaps[decimalLens];
    let result = def;

    var negetiveSymbol = val < 0 ? '-' : '';
    val = abs(val);

    if (val && !isNaN(val)) {
      let valStr = round(val * base) / base + '';
      valStr = valStr.split(decimalSyboml);

      let integer = valStr[0];
      let decimal = valStr[1];
      if (decimal) { // 处理小数部分
        let dl = decimal.length;
        dl = decimalLens - dl;
        decimal = decimal + zeroMaps[dl];// 小数不足补零
      } else {
        decimal = zeroMaps[decimalLens];
      }

      integer = integer.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + integerSyboml); // 处理整数部分
      result = currencySyboml + integer + decimalSyboml + decimal;
    }
    if (result !== def) {
      result = negetiveSymbol + result;
    }
    return result;
  };
