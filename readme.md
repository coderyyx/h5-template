# h5-template

### 命令行
```shell
# 启动开发服务器
$ npm run start

# 输出构建产物
$ npm run bundle

# 构建产物依赖分析
$ npm run report

# 以构建产物作为资源启动web服务
$ npm run static

```

### 编码约定
* 路由组件下使用ErrorBoundary组件包裹
```shell
import ErrorBoundary from 'toolComponents/ErrorBoundary'

<ErrorBoundary>
  <YoursRouteComp>
  </YoursRouteComp>
</ErrorBoundary>

```

* 组件props类型校验使用es6 class 的static类型的成员变量(必填限制相应类型后加isRequired)
```javascript
export default class NodeInformation extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {}
  }
  static propTypes = {
    test: PropTypes.bool.isRequired
  }
  render () {

  }
}
```

* 对于把UI组件绑定到redux上的方式
> 没有必要把整个页面这个维度的状态都注入到组件里面，只注入这个组件需要的，也可以在mapStateToProps方法里对状态做一些过滤&结构调整，可以应用reselect

```javascript
// we can also apply reselect
function mapStateToProps (state) {
  const {processConfig, app} = state
  const {processList, selectedKeys} = processConfig
  const {labList} = app
  // todo something filter states
  return {
    processList,
    selectedKeys,
    labList,
  }
}

export default connect(mapStateToProps)(ProcessConfig)
```


### tips
- 某些情况下暂时无法修复语法报错的使用 [eslint-disable] 禁用此处语法校验 
example
```javascript
/* eslint-disable */
if (module.hot) {
  module.hot.accept();
}
```
> 或者在.eslintrc配置文件的globals字段中加上全局变量
```javascript
"globals": {
    "module": true
  },
```

