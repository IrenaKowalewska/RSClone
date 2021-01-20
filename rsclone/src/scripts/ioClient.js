import Phaser from 'phaser';
import io from 'socket.io-client';
console.log(Phaser.Events.EventEmiter)

const HOST = 'http://localhost:3000/';

export default class Client extends Phaser.Events.EventEmitter {
    constructor(){
        super();
    }

    init(){
        const socket = io(HOST)
        socket.on('connect',()=>{
            console.log('клиент подключился')
        });
        socket.on('disconnect',()=>{
            console.log('клиент отключился')
        });
        socket.on('gameStart',()=>{
            this.emit('game');
        })
    }
}