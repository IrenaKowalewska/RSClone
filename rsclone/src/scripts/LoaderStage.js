import Phaser from 'phaser';
import imgBG from '../assets/cityMap1.png';

export default class LoaderStage extends Phaser.Scene {
    constructor() {
        super('Loader');
    }
    preload() {
        console.log('Loader');
    }
    create() {
        console.log('Loader');
        this.scene.start('Preloader');
    }
}