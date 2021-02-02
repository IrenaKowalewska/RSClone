//Подключаем нужные модули
const http = require('http');
const path = require('path');
const express = require('express');
const sockets = require('./server/sockets');

//создаем сервер
const distPath = './dist'
const PORT = process.env.PORT || 80;
const app = express();
const server = http.createServer(app);

//отдача игры 
const gamePath = path.join(__dirname,distPath);
const static = express.static(gamePath);
app.use(static);
sockets.init(server);
//запуск  сервера
server.listen(PORT,() => {
    console.log(`Сервер запущен на порте ${PORT}`);
});

