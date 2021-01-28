import Phaser from 'phaser';
import imgBG from '../assets/cityMap1.png';

export default class LoaderStage extends Phaser.Scene {
    constructor() {
        super('Loader');
        this.level = 1;
    }
    preload() {
        this.load.image('imgBG', imgBG);
        this.load.audio('theme', '../../src/assets/music/theme.mp3');
        this.load.audio('slip', '../../src/assets/music/slip.mp3');
        this.load.audio('bom', '../../src/assets/music/bom.mp3');
    }
    create() {
        this.scene.start('Preloader');
    }
}