import Phaser from 'phaser';
import tileSetImg from '../assets/tileset.png';
import gameMapJson from '../assets/cityMap1.json';

export default class PreloaderStage extends Phaser.Scene {
    constructor() {
        super('Preloader');
    }
    preload() {
        this.add.sprite(0, 0, 'imgBG').setOrigin(0);
        this.load.spritesheet('tileSet', tileSetImg, {frameWidth: 64, frameHeight: 64});
        this.load.tilemapTiledJSON('tileMap', gameMapJson);
    }
    create() {
        this.scene.start('Game');
    }
}