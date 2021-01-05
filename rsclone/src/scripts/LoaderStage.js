import Phaser from 'phaser';
import imgBG from '../assets/cityMap1.png';

export default class LoaderStage extends Phaser.Scene {
    constructor() {
        super('Loader');
    }
    preload() {
        this.load.image('imgBG', imgBG);
    }
    create() {
        this.scene.start('Preloader');
    }
}