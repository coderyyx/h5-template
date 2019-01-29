import {isProd} from './tools'

export const Debug = (...args) => {
  isProd && console.log(...args)
}

const logWithType = (type) => (...args) => {
  console[type](...args)
}

Debug.logWithType = logWithType