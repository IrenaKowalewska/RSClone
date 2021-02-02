import Phaser from 'phaser';
import Preloader from './Preloader';
import imgBG from '../assets/cityMap1.png';
import imgLevel1 from '../assets/cityMap1min.png';
import imgLevel2 from '../assets/cityMap2min.png';
export default class LoaderStage extends Phaser.Scene {
    constructor() {
        super('Loader');
        this.level = 1;
    }
    preload() {
         this.preloader = new Preloader(this);
        this.load.image('imgBG', imgBG);
        this.load.image('imgLevel1', imgLevel1);
        this.load.image('imgLevel2', imgLevel2);
        this.load.audio('theme', '../../src/assets/music/theme.mp3');
        this.load.audio('start', '../../src/assets/music/start.mp3');
    }
    create() {
        this.scene.start('Preloader');
    }
}