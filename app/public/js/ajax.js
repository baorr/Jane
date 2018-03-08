(function(){
    var AJAXRequest = function(option){
        var type = option.type || 'get',
            async = option.async === false?false:true,
            callback = option.callback,
            errorCallback = option.errorCallback,
            responseData,
            xhr = createXMLHttpRequest(),
            ps = genComponent(option.param);
            if(type == 'get' && ps){
                option.url = option.url + '?' + ps;
            }
        xhr.open(type, option.url, async);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        xhr.onreadystatechange = function(){
            if (xhr.readyState != 4) {
                return;
            }
            var status = xhr.status;
            var isSuccess = status >= 200 && status < 300 || status === 304;
            if(isSuccess){
                if (status === 204) {
                    statusText = 'nocontent';
                }else if(status === 304) {
                    statusText = 'notmodified';
                }else{
                    statusText = 'sucess';
                    responseData = JSON.parse(xhr.responseText ? xhr.responseText : '');
                }
            }else{
                statusText = 'error';
            }
            if(isSuccess){
                callback && callback(responseData, statusText, xhr);
            }else{
                errorCallback && errorCallback(statusText, xhr);
            }
        };
        xhr.send(ps);
    };
    var createXMLHttpRequest = function() {
        var XMLHttpReq = null;
        try {
            XMLHttpReq = new ActiveXObject('Msxml2.XMLHTTP');//IE高版本创建XMLHTTP
        }
        catch(E) {
            try {
                XMLHttpReq = new ActiveXObject('Microsoft.XMLHTTP');//IE低版本创建XMLHTTP
            }
            catch(E) {
                XMLHttpReq = new XMLHttpRequest();//兼容非IE浏览器，直接创建XMLHTTP对象
            }
        }
        return XMLHttpReq;
    };
    var genComponent = function(){
        return function(data){
            var result = [];
            for(var prop in data){
                result.push(prop + '=' + data[prop]);
            }
            return result.join('&');
        }
    }();
    window.AJAXRequest = window.AJAXRequest || AJAXRequest;
})();


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
    currencySyboml = currencySyboml || '¥';
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

var dateFormat = function(timestamp, format) {
    var newDate = new Date(timestamp);
    var date = {
        "Y+":newDate.getFullYear(),
        "M+": newDate.getMonth() + 1,
        "d+": newDate.getDate(),
        "h+": newDate.getHours(),
        "m+": newDate.getMinutes(),
        "s+": newDate.getSeconds(),
        "q+": Math.floor((newDate.getMonth() + 3) / 3),
        "S+": newDate.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (newDate.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
};
