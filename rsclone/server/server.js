//Подключаем нужные модули
const http = require('http');
const path = require('path');
const express = require('express');
const { Http2ServerRequest } = require('http2');
const socketIO = require('socket.io');
const { Socket } = require('dgram');

//создаем сервер
const distPath = './../dist'
const PORT = 3000;
const app = express();
const server = http.createServer(app);

//отдача игры 
const gamePath = path.join(__dirname,distPath);
const static = express.static(gamePath);
app.use(static);

//запуск  сервера
server.listen(PORT,() => {
    console.log(`Сервер запущен на порте ${PORT}`);
});

const io = socketIO(server);
io.on('connection',(socket)=>{
    console.log(`Подключился новый игрок ${socket.id}`)
})