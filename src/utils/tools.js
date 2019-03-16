import React from 'react';
import {Db} from './index';
export { Toast } from 'antd-mobile';
const setTimeout = window.setTimeout

const {NODE_ENV, isProd} = process.env
export const noop = () => {}
export {isProd}
// polling
export function polling({fn = noop, success = noop, error = noop, timeout = 20000, interval = 1000}) {
  const endTime = Number(new Date()) + timeout;
  let timeIdList = []
  const clearTimeID = (timeIdList) => {
    timeIdList && timeIdList.forEach(i => clearTimeout(i))
  }
  // 协商结束轮询条件
  /**
   * 
   * 1、 code != 200
   * 2、 code == 200 && result.length != 0 
   */
  const endPolling = (resp) => {
    let result = {isEnd: false, isSucc: true}
    if (resp.code == 200 && resp.result.length !== 0){
      result = {isEnd: true, isSucc: true, result: resp.result}
    } else if (resp[0] && resp[0].code != 200) {
      result = {isEnd: true, isSucc: false, message: resp[0].result}
    }
    return result
  }
  var checkCondition = function() { 
      var ajax = fn();
      ajax.then( function(response){
        console.log('response=======>')
        console.log(response)
          if (Number(new Date()) < endTime) {
            const {isSucc, isEnd, message, result} = endPolling(response)
            console.log('isEnd=======>')
            console.log(isEnd)
            // 受制于返回格式的限制。。。
            isSucc && success && success({isSucc, result})
            !isSucc && error && error(message)
            // end polling
            if (isEnd) {
              clearTimeID(timeIdList)
              return;
            }
            const timeId = setTimeout(checkCondition, interval);
            timeIdList.push(timeId)
          }
          // timeout reject!
          else {
            clearTimeID(timeIdList)
            error && error('timeout!')
          }
      }).catch(_error => {
        error && error(_error)
      });
  };
  checkCondition()
}

export function deepCopy (source) {
  let result = Array.isArray(source) ? [] : {}
  for (let key in source) {
    if (source.hasOwnProperty(key)) {
      result[key] = typeof source[key] === 'object' && source[key] !== null ? deepCopy(source[key]) : source[key]
    }
  }
  return result
}

export const Debug = (...args) => {
  isProd && console.log(...args)
}

export const isSucc = (resp) => {
  return resp && (resp.code === 200)
}


const response = () => {
  alert('session timeout~')
  window.location = window.location.origin
  // clear
  Db.cleanAll()
}

function isSessionOut(result) {
  return result.code === -90000
}
export const sessionHandler = {
  response,
  isSessionOut,
}
/**
 * redux action
 */
export class CreateActions {
  constructor(types) {
    const [startType, successType, errorType] = types;
    this.types = types;
    this.startType = startType;
    this.successType = successType;
    this.errorType = errorType;
  }
  start = () => ({
      type: this.startType,
      loading: true,
  })
  success = (payload) => ({
      type: this.successType,
      payload,
      loading: false,
  })
  error = (errormsg) => ({
      type: this.errorType,
      errorMessage: errormsg,
      loading: false,
  })
  typeCheck(type) {
    if(!type) {
      throw new Error(`action type is undefined!${this.types}`)
    }
  }
}