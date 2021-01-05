import Phaser from 'phaser';
import GameMap from './GameMap';
import Player from './Player';

export default class GameStage extends Phaser.Scene {
    constructor() {
        super('Game');
    }
    preload() {
        this.add.sprite(0, 0, 'imgBG').setOrigin(0);
    }
    create() {
        this.map = new GameMap(this);
        this.player = new Player(this, this.map);
    }
}