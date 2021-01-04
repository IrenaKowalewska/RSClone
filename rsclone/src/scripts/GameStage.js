import Phaser from 'phaser';;

export default class GameStage extends Phaser.Scene {
    constructor() {
        super('Game');
    }
    preload() {
        console.log('Game');
    }
    create() {
        console.log('Game');
    }
}