import { Debug } from './index';
const prefix = 'h5_template';
/**
 * 本地存储 examples sessionId centerId extra...
 * tips: sessionStorage 生命周期跟随当前页面；localStorage 跟随当前域名
 */
export class Db {
  constructor(isSessionStorage = true) {
    this.storage = isSessionStorage ? window.sessionStorage : window.localStorage;
  }
  /**
   * 慎用，一般系统退出，清理当前缓存使用
   * Usage: Db.cleanAll()
   */
  static cleanAll() {
    window.sessionStorage.clear();
    window.localStorage.clear();
  }
  set(name, value) {
    value = (typeof value === 'object' && JSON.stringify(value)) || value;
    this.storage.setItem(prefix + name, value);
  }
  get(name) {
    let value = this.storage.getItem(prefix + name);
    try {
      value = JSON.parse(value);
    } catch (error) {
      Debug.logWithType('error')(error);
      return null;
    }
    return value;
  }
  clean() {
    this.storage.clear();
  }
}
