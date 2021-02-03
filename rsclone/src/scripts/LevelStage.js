export default class LevelStage extends Phaser.Scene {
  constructor() {
    super('Level');
  }

  preload() {
    this.start = this.sound.add('start');
  }

  create() {
    this.addBG();
    this.addGameTitle();
    this.addButtons();
    this.addEvents();
  }

  addBG() {
    this.add.sprite(0, 0, 'imgBG').setOrigin(0).setAlpha(0.2);
    this.add.sprite(this.cameras.main.centerX - 150, this.cameras.main.centerY - 50, 'imgLevel1');
    this.add.sprite(this.cameras.main.centerX - 150, this.cameras.main.centerY + 50, 'imgLevel2');
  }

  addGameTitle() {
    this.gameTitle = this.add.text(this.cameras.main.centerX,
      this.cameras.main.centerY - 200,
      'CHOOSE A TRACK',
      {
        font: 'bold 60px monospace',
        fill: '#ffffff',
      });
    this.gameTitle.setStroke('#003333', 16);
    this.gameTitle.setOrigin(0.5);
    if (this.sys.game.config.language) {
      this.gameTitle.setText('ВЫБЕРИТЕ ТРАССУ');
    } else {
      this.gameTitle.setText('CHOOSE A TRACK');
    }
  }

  addButtons() {
    this.buttonOneTrack = this.add.text(this.cameras.main.centerX,
      this.cameras.main.centerY - 50,
      '1 Track',
      {
        font: 'bold 55px CurseCasual',
        fill: '#ffffff',
      });
    this.buttonOneTrack.setStroke('#003333', 16);
    this.buttonOneTrack.setOrigin(0.5);
    this.buttonOneTrack.setInteractive();

    this.buttonTwoTrack = this.add.text(this.cameras.main.centerX,
      this.cameras.main.centerY + 50,
      '2 Track',
      {
        font: 'bold 55px CurseCasual',
        fill: '#ffffff',
      });
    this.buttonTwoTrack.setStroke('#003333', 16);
    this.buttonTwoTrack.setOrigin(0.5);
    this.buttonTwoTrack.setInteractive();
  }

  addEvents() {
    this.buttonOneTrack.on('pointerdown', this.startGameLevel1, this);
    this.buttonTwoTrack.on('pointerdown', this.startGameLevel2, this);
  }

  startGameLevel1() {
    this.sys.game.config.level = 1;
    this.scene.start('Game');
  }

  startGameLevel2() {
    this.sys.game.config.level = 2;
    this.scene.start('Game');
  }
}
