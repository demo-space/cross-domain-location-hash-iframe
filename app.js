const http = require("http")

http.createServer((request, response) => {
  response.writeHead(200, {"Content-Type": "text/html"})
  response.write(`<script>window.location = 'http://localhost:1234/proxy.html#{"name":"hanzichi","age":10}'</script>`)
  response.end()
}).listen(8888)