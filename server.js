const http = require('http')
const webSocket = require('websocket').server

const httpServer = http.createServer().listen(5007,() => {
  console.log('listen on http://127.0.0.1:5007')
})

const ws = new webSocket({
  httpServer,
  autoAcceptConnections: false
})
const connetors = []
// 监听客户端的请求事件
ws.on('request', (request) => {
  // console.log('request', request)
  const currentCon = request.accept()
  connetors.push(currentCon)
  currentCon.on('message', (messages) => {
    console.log('messages', messages)
    connetors.forEach((conn) => {
      conn.send(messages.utf8Data)
    })
  })
})