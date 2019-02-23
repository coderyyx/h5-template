import 'babel-polyfill';
import sha1 from "./sha1.js";
import dtop from "./dtop.js";
import wx from "weixin-js-sdk";
import {toast} from 'react-mobile-message';
import Config from './info.js';

const appId = Config.appId;  //wx1c1fa5d121654c89
let dwechat = {
    Params : function(){
        let params = location.search.slice(1);
        let result = {}
        if(params){
            let temp;
            params = params.split('&');
            params.forEach(function(item){
                temp = item.split('=');
                result[temp[0]] = temp[1];
            });
        }
        return result;
    }(),
    //校验商家是否登录
    login : function(error){
        //获取url中的参数
        let param = dwechat.Params;
        return new Promise(function(resolve,reject){
            dtop.request({
                api : "comLogin/isLoginValid",
                data : {
                    authCode : param.code
                },
                success : function(data){
                    let online = data.online;
                    if(online == 1){ //已登录
                        resolve();
                    }
                    else if(online == 2){//弹出登录框
                        reject();
                    }
                    else{//授权
                        var url = location.href.split('#')[0];
                        location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ appId +'&redirect_uri='+ encodeURIComponent(url) +'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
                        return false;
                    }
                },
                fail : function(result){
                    if(error){
                        error(result.msg);
                    }
                    else{
                        toast(result.msg);
                    }
                },
                error : function(result){
                    if(error){
                        error(result.msg);
                    }
                    else{
                        toast(result.msg);
                    }
                }
            });
        });
    },
    isUserLogin : function(){
        let param = dwechat.Params;
        return new Promise(function(resolve,reject){
            dtop.request({
                api : "register/isLoginValid",
                data : {
                    authCode : param.code
                },
                success : function(data){
                    let online = data.online;
                    if(online == 1){ //已登录
                        resolve();
                    }
                    else if(online == 2){//弹出注册
                        reject({
                            mobile : data.mobile,
                            step : 0
                        });
                    }
                    else if(online == 3){//完善资料
                        reject({
                            mobile : data.mobile,
                            step : 1
                        });
                    }
                    else if(online == 0){//授权
                        var url = location.href.split('#')[0];
                        location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ appId +'&redirect_uri='+ encodeURIComponent(url) +'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
                        return false;
                    }
                },
                fail : function(result){
                    toast(result.msg);
                },
                error : function(result){
                    toast(result.msg);
                }
            });
        });
    },
    randomStr : function(){
        return Math.random().toString(36).substr(2);
    },
    initWeChat : function(jsApiList,callback){
        function firstInit(ticket,callback){
            //let ticket = ticket;
            let timestamp = Date.now();
            let nonceStr = dwechat.randomStr();
            let url = location.href.split('#')[0];
            //console.log(url);
            let sign = 'jsapi_ticket='+ ticket +'&noncestr='+ nonceStr +'&timestamp='+ timestamp +'&url=' + url;
            sign = sha1(sign);
            wx.config({
                debug : false,
                appId : appId,
                timestamp : timestamp,
                nonceStr : nonceStr,
                signature : sign,
                jsApiList : jsApiList
            });
            wx.ready(function(){
                callback && callback.call(wx);
            });
        }
        dtop.request({
            api : 'open/getWeixinTicket',
            success : function(data){
                let ticket = data.ticket;
                firstInit(ticket,callback);
            },
            fail : function(result){
                //reject(result);
            },
            error : function(result){
                //reject(result);
            }
        });
    }
}
export default dwechat;