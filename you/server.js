const http = require('http')
const fs = require('fs')
const url = require('url')
const port = process.argv[2]

if (!port) {
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

const server = http.createServer(function (request, response) {
  const parsedUrl = url.parse(request.url, true)
  const pathWithQuery = request.url
  let queryString = ''
  if (pathWithQuery.indexOf('?') >= 0) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'))
  }
  const path = parsedUrl.pathname
  const query = parsedUrl.query
  const method = request.method

  console.log('收到请求，路径：' + path)
  if (path === '/index.html') {
    response.code = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    // response.setHeader("Access-Control-Allow-Origin", "http://frank.com:9990");
    response.write(fs.readFileSync('./public/index.html'))
    response.end()
  } else if (path === '/you.js') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
    response.write(fs.readFileSync('./public/you.js'))
    response.end()
  } else {
    response.code = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write('找不到对应的路径')
    response.end()
  }
})


server.listen(port)

console.log(`监听 ${port}成功，请在浏览器中打开 http://localhost:${port}`)