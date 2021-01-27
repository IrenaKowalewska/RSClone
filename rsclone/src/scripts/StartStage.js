import Client from "./ioClient";

export default class StartStage extends Phaser.Scene {
    constructor() {
        super('Start');
    }
    create() {
        this.addBG();
        this.addMusic();
        this.addGameTitle();
        this.addButtons();
        this.addEvents();
    }
    addMusic() {
        this.theme = this.sound.add('theme');
    }
    addBG() {
        this.add.sprite(0, 0, 'imgBG').setOrigin(0);
    }
    addGameTitle() {
        this.gameTitle = this.add.text(this.cameras.main.centerX,
            this.cameras.main.centerY - 200, 
            `REAL NEW YEAR'S DAY RACING`,
            {
                font: 'bold 60px CurseCasual',
                fill: '#ffffff',
            });
        this.gameTitle.setStroke('#003333', 16);
        this.gameTitle.setOrigin(0.5);
    }
    addButtons() {
        this.buttonOnePlayer = this.add.text(this.cameras.main.centerX,
            this.cameras.main.centerY - 50, 
            'ONE PLAYER',
            {
                font: 'bold 56px CurseCasual',
                fill: '#ffffff',
            });
        this.buttonOnePlayer.setStroke('#003333', 16);
        this.buttonOnePlayer.setOrigin(0.5);
        this.buttonOnePlayer.setInteractive();

        this.buttonTwoPlayers = this.add.text(this.cameras.main.centerX,
            this.cameras.main.centerY + 50, 
            'TWO PLAYERS',
            {
                font: 'bold 56px CurseCasual',
                fill: '#ffffff',
            });
        this.buttonTwoPlayers.setStroke('#003333', 16);
        this.buttonTwoPlayers.setOrigin(0.5);
        this.buttonTwoPlayers.setInteractive();
    }
    addEvents() {
        this.buttonOnePlayer.on('pointerdown', this.startGame, this);
        this.buttonTwoPlayers.on('pointerdown', this.requestGame, this);
    }
    startGame() {
        this.scene.start('Game',{client: this.client});
        this.theme.play({
            volume: 0.1
        });
    }
    requestGame() {
        this.client = new Client();
        this.client.init();
        this.client.on('game',this.startGame,this)
        
    }
}