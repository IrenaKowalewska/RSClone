import Phaser from 'phaser';
import imgBG from '../assets/cityMap1.png';

export default class LoaderStage extends Phaser.Scene {
    constructor() {
        super('Loader');
    }
    preload() {
        this.load.image('imgBG', imgBG);
        this.load.audio('theme', '../../src/assets/sounds/theme.mp3');
        this.load.audio('slip', '../../src/assets/sounds/slip.mp3');
        this.load.audio('bom', '../../src/assets/sounds/bom.mp3');
    }
    create() {
        this.scene.start('Preloader');
    }
}