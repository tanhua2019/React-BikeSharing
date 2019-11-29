const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  let data = {
    data: {
      name: '王鹤鹏',
      time: '2019-11-29'
    },
    message: '跨域调用成功'
  }

  const body = url.parse(req.url, 'true')
  // node.js中的url.parse方法使用说明：将一个URL字符串转换成对象并返回。
  // 语法：url.parse(urlStr, [parseQueryString], [slashesDenoteHost]);
  // 接收参数：urlStr url字符串 parseQueryString 为true时将使用查询模块分析查询字符串，默认为false      
  const callback = body.query.callback;
  // jsonp请求中会包含一个callback参数，例如 http://baidu.com.js?callback=hello
  // 获取请求的url中的callback参数的值,callback是一个函数名  
  data = JSON.stringify(data);
  res.end(`${callback}(${data})`)
  //服务端接口到get请求，返回的是func({message:'hello'})，这样的话在服务端不就可以把数据通过函数执行传参的方式实现数据传递了吗。
})

server.listen(3000, (err) => {
  console.log('3000 is running');
})