//Подключаем нужные модули
const http = require('http');
const path = require('path');
const express = require('express');
const { Http2ServerRequest } = require('http2');

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