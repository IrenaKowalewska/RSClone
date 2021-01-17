import Phaser from 'phaser';
import tileSetImg from '../assets/tileset.png';
import gameMapJson from '../assets/cityMap1.json';
import objectsImg from '../assets/objectsAll.png';
import objectsJson from '../assets/objectsAll.json';
import LoadingBar from '../scripts/LoadingBar';

export default class PreloaderStage extends Phaser.Scene {
    constructor() {
        super('Preloader');
    }
    preload() {
        this.add.sprite(0, 0, 'imgBG').setOrigin(0);
        this.loadingBar = new LoadingBar(this);
        this.load.spritesheet('tileSet', tileSetImg, {frameWidth: 64, frameHeight: 64});
        this.load.tilemapTiledJSON('tileMap', gameMapJson);
        this.load.atlas('gameObjects', objectsImg, objectsJson);

    }
    create() {
        this.scene.start('Start');
    }
}