import Phaser from 'phaser';

export default class PreloaderStage extends Phaser.Scene {
    constructor() {
        super('Preloader');
    }
    preload() {
        console.log('Preloader');
    }
    create() {
        console.log('Preloader');
        this.scene.start('Game');
    }
}