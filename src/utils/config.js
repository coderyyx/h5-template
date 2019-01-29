
const {NODE_ENV, isProd, projectType} = process.env

console.log('=======environment vars======>')
console.log(process.env)
console.log('=============================\n\n\n')
const domains = {
  test: '',
  deveploment: 'http://localhost:7070/Acme/',
  production: '',
}

let env = 'deveploment'

// 开启mock功能，设为false时全局request中mock选项失效
export const isMock = true; // 为true, 不要修改这个参数
export const isTest = !isProd;
export {
  isProd,
  projectType,
};
console.log(`current env=====>${NODE_ENV}`)
console.log(`current domains======>${domains[env]}`)
export default domains[env]