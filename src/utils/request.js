import axios from 'axios'
// import {target as domain} from '../common/ipConfig'
import domain from './config'
import {
  noop,
  deepCopy,
  Debug,
  isSucc,
  CreateActions,
} from './index'
import {
  sessionHandler,
} from './tools'
// 携带cookie
axios.defaults.withCredentials = false

const ORIGIN = window.location.origin
const mockUrl = ORIGIN

const fetch = (options) => {
  let {
    headers,
    method = 'get',
    data,
    url
  } = options
  method = method.toLowerCase()
  let params = (method === 'get') && options.data || {}
  const baseURL = options.mock && mockUrl || domain
  // const baseURL = domain
  const instance = axios.create({
    baseURL: baseURL,
    timeout: 20000,
    headers: headers
  })
  return instance({
    url,
    data,
    method,
    params,
    transformRequest: [(params) => {
      let ret = []
      for (let it in params) {
        let items = params[it] ? params[it] : ''
        items = typeof items === 'object' ? JSON.stringify(items) : items
        ret.push(`${encodeURIComponent(it)}=${encodeURIComponent(items)}&`)
      }
      return ret.join('')
    }]
  })
}

export default function request (options) {
  let opts = deepCopy(options)
  const success = opts.success
  const error = opts.error
  opts.params = opts.params || {}
  opts.headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }
  opts.data = opts.params

  delete opts.success
  delete opts.error
  return fetch(opts).then((response) => {
    Debug('response success: ' + opts.url)
    Debug(response.data)
    if (isSucc(response)) {
      success && success(response)
    } else {
      error && error(response)
    }
    return Promise.resolve(response && response.data)
  }).catch((error) => {
    // throw error
    Debug('response fail: ' + opts.url)
    Debug(error)
    let msg = error.message || '网络错误'
    // cb && cb(msg)
    return Promise.reject(new Error(msg))
  })
}

/**
 * 
 * @param {*} param0 
 * redux invoke action
 */
export const reduxRequest = ({actionTypes, successCallback, failCallback, ...rest}) => dispatch => {
  const {start = noop, success = noop, error = noop} = new CreateActions(actionTypes);
  dispatch(start())
  request({
    ...rest
  }).then(resp => {
    // session过期
    if (sessionHandler.isSessionOut(resp)) {
      sessionHandler.response();
      return;
    }
    if (isSucc(resp)) {
      dispatch(success(resp.data));
      successCallback && successCallback(dispatch, resp.data);
    } else {
      dispatch(error(resp.message || '不知道发生了什么错误~'));
      failCallback && failCallback(resp.message)
    }
  }).catch(error => {
    const err = error.message || error
    dispatch(error(err))
    failCallback && failCallback(err)
  })
}