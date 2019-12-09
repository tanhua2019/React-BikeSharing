# 项目初始架构
- yarn add axios react-router-dom less less-loader
- react-router-dom是react-router的升级4.0版本
- 因为项目中要用到antd库，由less编写，所以让项目支持less
## 配置配置less
1. npm run eject 在webpack.config.js中增加配置 [react配置less](https://www.jianshu.com/p/bfa308164df4)
2. 修改样式文件正则，找到 注释style files regexes，在这部分最后添加如下两行代码：
```JavaScript
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;
```
3. 修改 getStyleLoaders 函数，添加lessOptions参数 修改如下代码
```JavaScript 
{
  loader: require.resolve('less-loader'),
  options: lessOptions,
},
```
4. 模仿代码中提供的sassRegex代码，添加代码
```JavaScript
//配置less
{
  test: lessRegex,
  exclude: lessModuleRegex,
  use: getStyleLoaders(
    {
      importLoaders: 2,
      sourceMap: isEnvProduction && shouldUseSourceMap,
    },
    'less-loader'
  ),
  sideEffects: true,
},
{
  test: lessModuleRegex,
  use: getStyleLoaders(
    {
      importLoaders: 2,
      sourceMap: isEnvProduction && shouldUseSourceMap,
      modules: true,
      getLocalIdent: getCSSModuleLocalIdent,
    },
    'less-loader'
  ),
},
```

## 项目中配置绝对路径@
- npm run eject 将webpack配置文件搞出来，如报错git暂存提交之后再跑
- 在webpack.config.js配置文件alias中配置'@': paths.appSrc即可

## babel-plugin-import实现按需加载的功能
- 为了提升性能，安装babel-plugin-import，实现按需加载的功能，即项目中用到什么样的组件，就引入对应的css
1. 在package.json文件中相应位置配置plugins:  如果发生错误，检查less版本，，如果大于3.0版本，重新安装less并且版本小于3.0.0  例如2.7.3 (参考)[https://blog.csdn.net/lvanboy/article/details/88200433]
```JavaScript
"babel": {
    "presets": [
      "react-app"
    ],
    "plugins": [
      [
        "import", {
          "libraryName": "antd",
          "style": "css"   //本应该是true 但是会报错
      }
    ]
  ]
}

  5 | @btn-prefix-cls: ~'@{ant-prefix}-btn';
  6 | 
> 7 | // for compatible
    | ^
  8 | @btn-ghost-color: @text-color;
  9 | @btn-ghost-bg: transparent;
```

2. 下载babel-plugin-import插件，然后在webpack.config.dev.js中的plugins添加配置 [参考](https://www.jianshu.com/p/78f16873c402)
```JavaScript
{
test: /\.(js|mjs|jsx|ts|tsx)$/,
include: paths.appSrc,
loader: require.resolve('babel-loader'),
options: {
  customize: require.resolve(
    'babel-preset-react-app/webpack-overrides'
  ),
  
  plugins: [
    [
      require.resolve('babel-plugin-named-asset-import'),
      {
        loaderMap: {
          svg: {
            ReactComponent: '@svgr/webpack?-prettier,-svgo![path]',
          },
        },
      },
    ],
    ['import',{libraryName:'antd',style:true}],  //添加这句话
  ],
  // This is a feature of `babel-loader` for webpack (not Babel itself).
  // It enables caching results in ./node_modules/.cache/babel-loader/
  // directory for faster rebuilds.
  cacheDirectory: true,
  // Don't waste time on Gzipping the cache
  cacheCompression: false,
},
},
```
- 会报错  将less配置更新为如下 解决~ [参考](https://coding.imooc.com/learn/questiondetail/113985.html)
```JavaScript
{
test: /.less$/,
use: [{
loader: "style-loader" // creates style nodes from JS strings
}, {
loader: "css-loader" // translates CSS into CommonJS
}, {
loader: "less-loader",// compiles Less to CSS
options: {
sourceMap: true,
modifyVars: {
"primary-color": "blue",
},
javascriptEnabled: true,
}
}]
},
```
# 项目主页结构开发
- 用antd 的栅格化做
- 定义全局样式 创建style文件夹
## calc() 函数 用于动态计算width与height
- calc是英文单词calculate(计算)的缩写，是css3的一个新增的功能，用来指定元素的长度。calc()最大的好处就是用在流体布局上，可以通过calc()计算得到元素的宽度。
- vh/vw
  vh: 相对于视窗的高度, 视窗被均分为100单位的vh;
  vw: 相对于视窗的宽度, 视窗被均分为100单位的vw;
- 任何长度值都可以使用calc()函数进行计算；
  calc()函数支持 “+”, “-“, “*”, “/” 运算；
  calc()函数使用标准的数学运算优先级规则；
  calc(100vh - 10px)  表示整个浏览器窗口高度减去10px的大小
  calc(100vw - 10px)   表示整个浏览器窗口宽度减去10px的大小

## 左侧导航栏菜单引入
- 用componentDidMount生命周期函数加载menu数据的时候会报错
```JavaScript
index.js:1375 Warning: Failed prop type: Invalid prop `span` of type `string` supplied to `Col`, expected `number`
NavLeft.js:30 Uncaught TypeError: Cannot read property 'menuTree' of null
index.js:1375 The above error occurred in the <NavLeft> component:
```
- 原因解决用componentWillMount[参考](https://blog.csdn.net/qq_38719039/article/details/82378434)
1. componentWillMount  将要装载，在render之前调用；
   componentDidMount，（装载完成），在render之后调用
2. componentWillMount  每一个组件render之前立即调用；
   componentDidMount  render之后并不会立即调用，而是所有的子组件都render完之后才可以调用
3. componentWillMount  可以在服务端被调用，也可以在浏览器端被调用；
   componentDidMount  只能在浏览器端被调用，在服务器端使用react的时候不会被调用

```JavaScript
componentWillMount() {
  const menuTree = this.menu(MenuConfig)
  this.setState({
    menuTree
  })
}

menu = (data) => {
  return data.map(item => {
    //流程->无子节点直接走item渲染->再次遍历有子节点->进入if函数->渲染subMenu父（有小箭头）->调用递归函数重新调用menu方法渲染子节点
    if (item.children) {
      return <SubMenu title={item.title} key={item.key}>{this.menu(item.children)}</SubMenu>
    }
     return <Menu.Item title={item.title} key={item.key}>{item.title}</Menu.Item>
  })
}
```

## 头部Header组件的实现
### 百度天气API
[天气API](http://api.map.baidu.com/telematics/v3/weather?location=foshan&output=json&ak=3p49MVra6urFRGOT9s8UBWr2)
[参考文献](https://blog.csdn.net/weixin_44370887/article/details/102810616)

- axios 不支持跨域，所以需要yarn add jsonp
- 百度天气api是第三方的，跨域的条件是同源策略，协议相同，域名相同，端口相同。
- 传递过程中由于city是中文 需要转码
encodeURIComponent(city) encodeURIComponent('北京')
"%E5%8C%97%E4%BA%AC"

### JSONP 
[参考文章](https://www.cnblogs.com/lovellll/p/10180081.html)
[参考文章](https://blog.csdn.net/badmoonc/article/details/82289252)
#### jsonp如何产生的
1. Ajax直接请求普通文件存在跨域无权限访问的问题，甭管你是静态页面、动态网页、web服务、WCF，只要是跨域请求，一律不准。
2. Web页面上调用js文件时则不受是否跨域的影响（不仅如此，我们还发现凡是拥有”src”这个属性的标签都拥有跨域的能力，比如<\script>、<\img>、<\iframe>）
3. 在远程服务器上设法把数据装进js格式的文件里，供客户端调用和进一步处理
4. 恰巧我们已经知道有一种叫做JSON的纯字符数据格式可以简洁的描述复杂数据，更妙的是JSON还被js原生支持，所以在客户端几乎可以随心所欲的处理这种格式的数据。
5. web客户端通过与调用脚本一模一样的方式，来调用跨域服务器上动态生成的js格式文件（一般以JSON为后缀），显而易见，服务器之所以要动态生成JSON文件，目的就在于把客户端需要的数据装入进去。
6. 客户端在对JSON文件调用成功之后，也就获得了自己所需的数据，剩下的就是按照自己需求进行处理和展现了，这种获取远程数据的方式看起来非常像AJAX，但其实并不一样。
7. 为了便于客户端使用数据，逐渐形成了一种非正式传输协议，人们把它称作JSONP，该协议的一个要点就是允许用户传递一个callback参数给服务端，然后服务端返回数据时会将这个callback参数作为函数名来包裹住JSON数据，这样客户端就可以随意定制自己的函数来自动处理返回数据了。
- jsonP说白了，就是在json字符串外面包上一个：参数名称+左右括弧！
类似这样：jsonpCallback([{“ID”:1,“Name”:“张三”},{“ID”:2,“Name”:“李四”}])

## 底部组件的实现

### 使用css实现箭头图标
- 指的边框的颜色，而transparent则设为了透明。
```JavaScript
.aaa {
   width: 0;
   height: 0;
   border-left: 50px solid transparent;
   border-right: 50px solid transparent;
   border-top: 50px solid black;
   /* border-bottom: 50px solid green; */
}
```

# React Router 4.0
- <Route path="/login" component={Login}> //当匹配到/login路径的时候加载Login组件
- <Link to={{pathname: '/three/7'}}>Three #7<Link>
- <Route path="/three/:number"> 取值this.props.match.parpams.number
- Link {pathname:'/', search:'',key:'abc123' state: {}}
- Redirect 路由重定向 <Redirect to="/admin/home/">

- exact 精确匹配某一个路由 / 和 /home 如果不加exact会匹配到两个组件
- Switch 一旦匹配到一个路由之后就不再继续匹配之后的路由