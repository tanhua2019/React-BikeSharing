# 项目初始架构
- yarn add axios react-router-dom less less-loader
- react-router-dom是react-router的升级4.0版本
- 因为项目中要用到antd库，由less编写，所以让项目支持less
## 配置less
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

##项目中配置绝对路径@
- npm run eject 将webpack配置文件搞出来，如报错git暂存提交之后再跑
- 在webpack.config.js配置文件alias中配置'@': paths.appSrc即可
