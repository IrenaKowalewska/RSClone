import Phaser from 'phaser';
import GameMap from './GameMap';
import Player from './Player';
import Stats from './Stats';
import StatsView from './StatsView';
import StatsPopup from './StatsPopup';

const CYCLES = 3;

export default class GameStage extends Phaser.Scene {
    constructor() {
        super('Game');
        this.level = 1;
    }

    init() {
        this.cursors = this.input.keyboard.createCursorKeys();
    }
    preload() {
        this.add.sprite(0, 0, 'imgBG').setOrigin(0);
    }
    create() {
        this.map = new GameMap(this, this.level);
        this.player = new Player(this, this.map);
        this.stats = new Stats(this, CYCLES);
        this.statsView = new StatsView(this, this.stats);

        this.cameras.main.setBounds(0, 0, this.map.tileMap.widthInPixels, this.map.tileMap.heightInPixels);
        this.cameras.main.startFollow(this.player.car);

        this.player.car.on('cycle', this.onCycleComplete, this)

        this.matter.world.on('collisionactive', (event, oil, player) => {
            if (player.gameObject === this.player.car && oil.gameObject.frame.name === 'oil') {
                this.player.slip();
            }
            // if (player.gameObject === this.player.car && oil.gameObject.frame.name === 'topdownTile_41') {
            //     this.sound.add('bom').play({
            //         volume: 0.1
            //     });
                
            // }
        })
    }
    onCycleComplete() {
        this.stats.onCycleComplete();
        if (this.stats.complete) {
            this.level++;
            this.statsPopup = new StatsPopup(this, this.stats, this.level);
        }
    }
    update(time, deltaTime) {
        this.stats.update(deltaTime)
        this.statsView.render();
        this.player.move();
    }
}