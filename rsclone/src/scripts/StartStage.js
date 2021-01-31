import Client from "./ioClient";

export default class StartStage extends Phaser.Scene {
    constructor() {
        super('Start');
        this.level = 1;
    }
    preload() {
        this.start = this.sound.add('start');
    }
    create() {
        this.mute = this.sys.game.config.mute || false;
        this.addBG();
        this.addGameTitle();
        this.addButtons();
        this.addEvents();
        this.changeMute();
        this.sys.game.config.level = this.level;
      
    }
    addBG() {
        const bg = this.add.sprite(0, 0, 'imgBG').setOrigin(0).setAlpha(0);
        this.tweens.add({
            targets: bg,
            alphaTopLeft: { value: 1, duration: 10000, ease: 'Power1' },
            alphaBottomRight: { value: 1, duration: 15000, ease: 'Power1' },
            alphaBottomLeft: { value: 1, duration: 10000, ease: 'Power1', delay: 10000 },
            yoyo: true,
            loop: -1

        });
    }
    addGameTitle() {
        this.gameTitle = this.add.text(this.cameras.main.centerX,
            this.cameras.main.centerY - 200, 
            `REAL NEW YEAR'S DAY RACING`,
            {
                font: 'bold 80px CurseCasual',
                fill: '#ffffff',
            });
        this.gameTitle.setStroke('#003333', 8);
        this.gameTitle.setOrigin(0.5);
        this.gradient = this.gameTitle.context.createLinearGradient(0, 0, 0, this.gameTitle.height);
        this.gradient.addColorStop(0, '#003333');
        this.gradient.addColorStop(.5, '#ffffff');
        this.gradient.addColorStop(.5, '#aaaaaa');
        this.gradient.addColorStop(1, '#003333');
    
        this.gameTitle.setFill(this.gradient);
    }
    addButtons() {
        this.buttonOnePlayer = this.add.text(this.cameras.main.centerX,
            this.cameras.main.centerY - 50, 
            'ONE PLAYER',
            {
                font: 'bold 55px CurseCasual',
                fill: '#ffffff',
                backgroundColor: '#ffffff',
            });
        this.buttonOnePlayer.setPadding(27, 5);
        this.buttonOnePlayer.setStroke('#003333', 16);
        this.buttonOnePlayer.setOrigin(0.5);
        this.buttonOnePlayer.setInteractive();

        this.buttonTwoPlayers = this.add.text(this.cameras.main.centerX,
            this.cameras.main.centerY + 50, 
            'TWO PLAYERS',
            {
                font: 'bold 55px CurseCasual',
                fill: '#ffffff',
                backgroundColor: '#ffffff'
            });
        this.buttonTwoPlayers.setPadding(5);
        this.buttonTwoPlayers.setStroke('#003333', 16);
        this.buttonTwoPlayers.setOrigin(0.5);
        this.buttonTwoPlayers.setInteractive();

        this.buttonMute = this.add.text(this.cameras.main.centerX,
            this.cameras.main.centerY + 150, 
                ``,
            {
                font: 'bold 45px CurseCasual',
                fill: '#ffffff',
                backgroundColor: "#ffffff"
            });
        this.buttonMute.setPadding(30, 5)
        this.buttonMute.setStroke('#003333', 16);
        this.buttonMute.setOrigin(0.5);
        this.buttonMute.setInteractive();
    }
    addEvents() {
        this.buttonMute.on('pointerdown', this.changeMute, this);
        this.buttonOnePlayer.on('pointerdown', this.startGame, this);
        this.buttonTwoPlayers.on('pointerdown', this.requestGame, this);
    }
    changeMute() {
        if(this.sys.game.config.mute) {
            this.buttonMute.setText('SOUND OFF');
            this.start.play({
                volume: 0.1
            });
            this.sys.game.config.mute = !this.mute;
            this.mute = !this.mute;
        } else {
            this.buttonMute.setText('SOUND ON');
            this.start.stop();
            this.sys.game.config.mute = !this.mute;
            this.mute = !this.mute;
        }
    }
    startGame() {
        this.scene.start('Level');
        this.start.stop();
    }
    requestGame() {
        this.client = new Client();
        this.client.init();
        this.client.on('game',this.startGame,this)
        
    }
}