import Phaser from 'phaser';
import io from 'socket.io-client';

const HOST = 'http://localhost:3000/';

export default class Client extends Phaser.Events.EventEmiter{
    constructor(){
        super();
    }

    init(){
        io(HOST)
    }
}