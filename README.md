# location.hash + iframe 跨域 demo

```bash
$ npm install
$ npm run server
$ npm run client
```

然后打开 <http://localhost:1234>，控制台查看。直接打开 <http://localhost:8888> 会被重定向，可以通过 `curl http://localhost:8888` 查看后台数据返回的形式

跨域原理：

如果不同域，index.html 里不能获取 iframe.contentWindow 里的任何值，但是如果将 iframe.src 或者 iframe.contentWindow.location 的地址置为和 index.html 同源，那么就能通信了（demo 中我将其置为了一个和 index.html 同源的 proxy.html，之前 window.name+iframe 跨域的时候，设置的值是一个神奇的 about:blank，但是如果现在用 about:blank#xxx 的形式，只有 chrome 可行，ff 和 safari 都会报错）

```
重置 iframe.src 或者 iframe.contentWindow.location.href 都会引起子窗口页面的刷新，以及内容的变化（指向重置后的 url）
如果重置的是 iframe.src，那么刷新后 iframe.src === iframe.contentWindow.location.href
如果重置的是 iframe.contentWindow.location.href，iframe.src 值不变
iframe 里面包含了子窗口，所以操作 iframe 的内容会影响子窗口，反之操作子窗口的内容则不会影响 “父辈” iframe 的属性
```

跨域原理同 window.name+iframe，利用 iframe.contentWindow.xx 来获取想要的值。我们在服务端返回中直接重置 window.location 的值（即 iframe.contentWindow.location 的值），**这个地址必须和 index.html** 同源，这样才能获取到 iframe.contentWindow.xxx

这里用了 location.hash，原则上 location.search 等都是可以的，看起来 hash 比较方便
