import Phaser from 'phaser';
import Preloader from './Preloader';
import tileSetImg from '../assets/tileset.png';
import gameMapJson from '../assets/cityMap1.json';
import gameMapJson2 from '../assets/cityMap2.json';
import objectsImg from '../assets/objectsAll.png';
import objectsJson from '../assets/objectsAll.json';

export default class PreloaderStage extends Phaser.Scene {
    constructor() {
        super('Preloader');
    }
    preload() {
        this.add.sprite(0, 0, 'imgBG').setOrigin(0);
        this.preloader = new Preloader(this);
        this.load.spritesheet('tileSet', tileSetImg, {frameWidth: 64, frameHeight: 64});
        this.load.tilemapTiledJSON('tileMap', gameMapJson);
        this.load.tilemapTiledJSON('tileMap2', gameMapJson2);
        this.load.atlas('gameObjects', objectsImg, objectsJson);
    }
    create() {
        this.scene.start('Start');
    }
}