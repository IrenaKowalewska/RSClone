import Phaser from 'phaser';
import GameMap from './GameMap';
import Player from './Player';
import Stats from './Stats';
import StatsView from './StatsView';
import StatsPopup from './StatsPopup';

const CYCLES = 3;
const CARS = {
  BLACK: {
    sprite: 'car_black_small_1',
    position: 'player',
  },
  RED: {
    sprite: 'car_red_small_1',
    position: 'enemy',
  },
};

export default class GameStage extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  init(data) {
    if (data.client) {
      this.client = data.client;
    }

    this.cursors = this.input.keyboard.createCursorKeys();
    if (this.sys.game.config.level === 3) {
      this.sys.game.config.level = 1;
      this.level = 1;
    }
    this.level = this.sys.game.config.level;
  }

  preload() {
    this.add.sprite(0, 0, 'imgBG').setOrigin(0);
    this.theme = this.sound.add('theme');
  }

  getCarsConfig() {
    let config = {
      player: CARS.BLACK,
      enemy: CARS.RED,
    };
    if (this.client && !this.client.master) {
      config = {
        player: CARS.RED,
        enemy: CARS.BLACK,
      };
    }
    return config;
  }

  create() {
    this.map = new GameMap(this, this.level);
    const car = this.getCarsConfig();

    this.player = new Player(this, this.map, car.player);

    if (this.client) {
      this.enemy = new Player(this, this.map, car.enemy);
      this.client.on('data', (data) => {
        this.enemy.car.setX(data.x);
        this.enemy.car.setY(data.y);
        this.enemy.car.setAngle(data.angle);
      });
    }

    if (!this.sys.game.config.mute) {
      this.theme.play({
        volume: 0.1,
      });
    } else {
      this.theme.stop();
    }

    this.stats = new Stats(this, CYCLES);
    this.statsView = new StatsView(this, this.stats);

    this.cameras.main.setBounds(0, 0, this.map.tileMap.widthInPixels, this.map.tileMap.heightInPixels);
    this.cameras.main.startFollow(this.player.car);

    this.player.car.on('cycle', this.onCycleComplete, this);

    this.addButton();
    this.addEvents();
  }

  onCycleComplete() {
    this.stats.onCycleComplete();
    if (this.stats.complete) {
      this.theme.stop();
      this.sys.game.config.level = ++this.level;
      this.statsPopup = new StatsPopup(this, this.stats, this.level);
    }
  }

  addButton() {
    this.menu = this.add.text(100,
      850,
      'MENU',
      {
        font: 'bold 55px monospace',
        fill: '#ffffff',
      });
    this.menu.setStroke('#003333', 16);
    this.menu.setOrigin(0.5);
    this.menu.setInteractive();
    if (this.sys.game.config.language) {
      this.menu.setText('МЕНЮ');
    } else {
      this.menu.setText('MENU');
    }
  }

  sync() {
    if (this.client) {
      this.client.send({
        x: this.player.car.x,
        y: this.player.car.y,
        angle: this.player.car.angle,
      });
    }
  }

  goToMenu() {
    this.sys.game.config.mute = !this.sys.game.config.mute;
    this.sys.game.config.language = !this.sys.game.config.language;
    this.theme.stop();
    this.scene.start('Start');
  }

  addEvents() {
    this.menu.on('pointerdown', this.goToMenu, this);
  }

  update(time, deltaTime) {
    this.stats.update(deltaTime);
    this.statsView.render();
    this.player.move();
    this.sync();
  }
}
