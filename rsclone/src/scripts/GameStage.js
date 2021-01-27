import Phaser from 'phaser';
import GameMap from './GameMap';
import Player from './Player';
import Stats from './Stats';
import StatsView from './StatsView';

const CYCLES = 3;
const CARS = {
    BLACK:{
        sprite: 'car_black_small_1',
        position: 'player',
    },
    RED:{
        sprite: 'car_red_small_1',
        position: 'enemy',
    }
};

export default class GameStage extends Phaser.Scene {
    constructor() {
        super('Game');
    }
    init(data) {
        if(data.client){
            this.client = data.client;
        };
        this.cursors = this.input.keyboard.createCursorKeys();
    }
    preload() {
        this.add.sprite(0, 0, 'imgBG').setOrigin(0);
    }
    getCarsConfig(){
        let config = {
            player:CARS.BLACK,
            enemy:CARS.RED,
        }
        if (this.client && !this.client.master){
            config = {
                player:CARS.RED,
                enemy:CARS.BLACK,  
            }
        }
        return config
    }
    create() {
        this.map = new GameMap(this);
        const car = this.getCarsConfig();

        this.player = new Player(this, this.map , car.player);

        if (this.client){
            this.enemy = new Player(this,this.map, car.enemy);
        };

        this.stats = new Stats(this, CYCLES);
        this.statsView = new StatsView(this, this.stats);

        this.cameras.main.setBounds(0, 0, this.map.tileMap.widthInPixels, this.map.tileMap.heightInPixels);
        this.cameras.main.startFollow(this.player.car);

        this.player.car.on('cycle', this.onCycleComplete, this)

        this.matter.world.on('collisionactive', (event, oil, player) => {
            if (player.gameObject === this.player.car && oil.gameObject.frame.name === 'oil') {
                this.player.slip();
            }
        })
    }
    onCycleComplete() {
        this.stats.onCycleComplete();
        if (this.stats.complete) {
            this.scene.restart();
        }
    }
    update(time, deltaTime) {
        this.stats.update(deltaTime)
        this.statsView.render();
        this.player.move();
    }
}