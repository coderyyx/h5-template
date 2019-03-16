if(typeof String.prototype.trim === 'undefined'){
    String.prototype.trim = function(){  
        return this.replace(/(^\s*)|(\s*$)/g,'');  
    };
}
import Config from './info.js';
const redirect_uri = Config.redirect_uri;

const ktopUtils = {
    hostname : function(){
        //暂时固定写死
        let hostname = location.hostname;
        let url;
        if(hostname == Config.hostname){
            url = Config.apiurl;
        }
        else{
            // url = Config.testapiurl;
            url = Config.apiurl;
        }
        return url;
    }(),
    getUrl : function(api){
        let host = ktopUtils.hostname;
        host += api || 'h5';
        return host;
    }
}

var jsonpID = 0;
var ajaxJSONP = function(options){
    let url = options.url;
    if(!url){
        new TypeError("url is not exist");
    }
    let data = options.data || {};
    let params = ['v=' + Date.now()];
    for(var p in data){
        params.push(p +'='+ data[p]);
    };
    params = params.join('&');
    url += url.indexOf('?') == -1 ? '?' : '&';
    url += params;
    let success = options.success;
    let error = options.error;
    function ajaxSuccess(result){
        success && success(result);
    }
    function ajaxError(result){
        error && error(result);
    }
    let _callbackName = options.jsonpCallback;
    let callbackName = _callbackName || ('jsonp' + (++jsonpID));
    let script = document.createElement('script');
    let originalCallback = window[callbackName];
    let responseData;
    //let xhr = { abort: abort };
    let abortTimeout;
    let handle = function(e, errorType){
        clearTimeout(abortTimeout);
        script.removeEventListener('load',handle,false);
        script.removeEventListener('error',handle,false);
        let type = typeof e == 'string' ? e : e.type;
        if(type == 'error' || !responseData){
            ajaxError(errorType || 'error');
        }
        else{
            ajaxSuccess(responseData[0]);
        }
        window[callbackName] = originalCallback;
        if(responseData && typeof originalCallback == 'function'){
            originalCallback(responseData[0]);
        }
        originalCallback = responseData = undefined;
    }
    let abort = function(errorType) {
        handle('error', errorType || 'abort');
    };
    script.addEventListener('load',handle,false);
    script.addEventListener('error',handle,false);

    window[callbackName] = function(){
        responseData = arguments
    }
    script.src = url + '&callback=' + callbackName;
    document.head.appendChild(script)

    if(options.timeout > 0){
        abortTimeout = setTimeout(function(){
            abort('timeout');
        },options.timeout)
    }
}
var ajax = function(options){
    options = options || {};
    if(options.dataType && options.dataType == 'jsonp'){
        ajaxJSONP(options);
        return;
    }
    let success = options.success;
    let error = options.error;
    function ajaxSuccess(result){
        success && success(result);
    }
    function ajaxError(result){
        error && error(result);
    }
    let headers = {};
    function setHeader(name, value){
        headers[name.toLowerCase()] = [name, value];
    }
    let xhr = new window.XMLHttpRequest();
    let nativeSetHeader = xhr.setRequestHeader;
    let blankRE = /^\s*$/;
    let abortTimeout;

    setHeader('Accept','application/json');
    if(options.contentType){
        setHeader('Content-Type', options.contentType)
    }

    if (options.headers) for (name in options.headers) setHeader(name, options.headers[name]);
    xhr.setRequestHeader = setHeader

    xhr.onreadystatechange = function(){
        //console.log(xhr.readyState);
        if(xhr.readyState == 3){
            //console.log(xhr.responseText);
            options.pipe && options.pipe(xhr.responseText);
        }
        if(xhr.readyState == 4){
            xhr.onreadystatechange = null;
            clearTimeout(abortTimeout);
            var result, error = false
            if((xhr.status >= 200 && xhr.status < 300)){
                result = xhr.responseText;
                try{
                    result = blankRE.test(result) ? null : JSON.parse(result);
                }
                catch(e){
                    error = e;
                }
                if(error){
                    ajaxError(error);
                }
                else{
                    ajaxSuccess(result)
                }
            }
            else {
                ajaxError(xhr.status ? 'error' : 'abort')
            }
        }
    }
    xhr.open(options.type, options.url, true);
    if(options.xhrFields){
        for(name in options.xhrFields){
            xhr[name] = options.xhrFields[name];
        }
    }
    for(name in headers){
        nativeSetHeader.apply(xhr, headers[name]);
    }
    if (options.timeout > 0){
        abortTimeout = setTimeout(function(){
            xhr.onreadystatechange = null;
            xhr.abort()
            ajaxError('timeout');
        }, options.timeout)
    }
    xhr.send(options.data ? options.data : null)
    return xhr;
}

//var callbackCount = 1;
const ktop = {
    ajaxJSONP : ajaxJSONP,
    ajax : ajax,
    /*
        option {Object}
            - api 接口名称
            - data 参数
    */
    request : function(option){
        option = option || {};
        var api = option.api;
        var data = option.data || {};
        var success = option.success;
        var fail = option.fail;
        var error = option.error;
        /* 
            参数格式
            {
                "body":{"authCode":"authCode"},
                "header":{"handler":"comLogin","method":"isLoginValid","platform":"weixin","version":"0.0.1"}
            }
        */
        if(!api){
            return;
        }
        var [handler, method] = api.split('/');
        var paramdata = {
            'body' : data,
            'header' : {
                "handler" : handler,
                "method" : method,
                "platform" : "weixin",
                "version" : "0.0.1"
            }
        }
        var dataJson = JSON.stringify(paramdata);
        var url = ktopUtils.getUrl(option.path);
        return ajax({
            url : url,
            contentType : 'text/plain',
            type : 'post',
            data : dataJson,
            xhrFields : {
                withCredentials : true
            },
            success : function(result){
                result = result || {};
                try{
                    var header = result.header;
                    var code = header.retCode;
                    var data = result.body || {};
                    if(code == 1000){
                        success && success(data);
                    }
                    else if(code == 2000){ //登录
                        // var cururl = location.href.split('#')[0];
                        location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ Config.appId +'&redirect_uri='+ encodeURIComponent(redirect_uri) +'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
                        return;
                    }
                    else{
                        result.msg = header.errorMsg || '请求出错，请返回重试';
                        fail && fail(result);
                    }
                }
                catch(e){
                    fail && fail({msg : e.message});
                }
            },
            error : function(){
                error && error({
                    msg : '网络请求失败，请稍后重试'
                });
            }
        });
    },
    promisefyRequest : function(option) {
        option = option || {};
        const {api, data, methodType = 'POST'} = option;
        /* 
            参数格式
            {
                "body":{"authCode":"authCode"},
                "header":{"handler":"comLogin","method":"isLoginValid","platform":"weixin","version":"0.0.1"}
            }
        */
        if(!api){
            return;
        }
        var [handler, method] = api.split('/');
        var paramdata = {
            'body' : data,
            'header' : {
                "handler" : handler,
                "method" : method,
                "platform" : "weixin",
                "version" : "0.0.1"
            }
        }
        var dataJson = JSON.stringify(paramdata);
        var url = ktopUtils.getUrl(option.path);
        return new Promise((resolve, reject) => {
            ajax({
                url : url,
                contentType : 'text/plain',
                type : methodType,
                data : dataJson,
                xhrFields : {
                    withCredentials : true
                },
                success : function(result){
                    console.log('request url success===========>', url, api);
                    console.log('response data success===============>', result.body);
                    result = result || {};
                    try{
                        var header = result.header;
                        var code = header.retCode;
                        var data = result.body || {};
                        if(code == 1000){
                            // success && success(data);
                            resolve(data);
                        }
                        else if(code == 2000){ //登录
                            location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ Config.appId +'&redirect_uri='+ encodeURIComponent(redirect_uri) +'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
                            return;
                        }
                        else{
                            result.msg = header.errorMsg || '请求出错，请返回重试';
                            // fail && fail(result);
                            reject(result);
                        }
                    }
                    catch(e){
                        // fail && fail({msg : e.message});
                        reject({msg : e.message});
                    }
                },
                error : function(){
                    reject({msg : '网络请求失败，请稍后重试'});
                }
            });
        })
    },
    loginRequest : function(option){
        
    }
}
export default ktop;
