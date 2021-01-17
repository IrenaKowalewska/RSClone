import Phaser from 'phaser';
import GameMap from './GameMap';
import Player from './Player';

const CYCLES = 3;

export default class GameStage extends Phaser.Scene {
    constructor() {
        super('Game');
    }
    init() {
        this.cursors = this.input.keyboard.createCursorKeys();
    }
    preload() {
        this.add.sprite(0, 0, 'imgBG').setOrigin(0);
    }
    create() {
        this.map = new GameMap(this);
        this.player = new Player(this, this.map);

        this.cameras.main.setBounds(0, 0, this.map.tileMap.widthInPixels, this.map.tileMap.heightInPixels);
        this.cameras.main.startFollow(this.player.car);

        this.player.car.on('cycle', this.onCycleComplete, this)

        this.matter.world.on('collisionactive', (event, oil, player) => {
            if (player.gameObject === this.player.car && oil.gameObject.frame.name === 'oil') {
                this.player.slip();
            }
        })
    }
    onCycleComplete(cycle) {
        if (cycle > CYCLES) {
            this.scene.restart();
        }
    }
    update() {
        this.player.move();
    }
}