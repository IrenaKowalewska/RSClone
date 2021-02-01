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
        this.isEnglish = this.sys.game.config.language ? true : false;
        this.addBG();
        this.addGameTitle();
        this.addButtons();
        this.addEvents();
        this.changeLanguage();
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
            '',
            {
                font: 'bold 55px monospace',
                fill: '#ffffff',
            });
        this.buttonOnePlayer.setStroke('#003333', 16);
        this.buttonOnePlayer.setOrigin(0.5);
        this.buttonOnePlayer.setInteractive();

        this.buttonTwoPlayers = this.add.text(this.cameras.main.centerX,
            this.cameras.main.centerY + 50, 
            '',
            {
                font: 'bold 55px monospace',
                fill: '#ffffff',
            });
        this.buttonTwoPlayers.setStroke('#003333', 16);
        this.buttonTwoPlayers.setOrigin(0.5);
        this.buttonTwoPlayers.setInteractive();

        this.buttonMute = this.add.text(this.cameras.main.centerX,
            this.cameras.main.centerY + 150, 
                ``,
            {
                font: 'bold 45px monospace',
                fill: '#ffffff',
            });
        this.buttonMute.setStroke('#003333', 10);
        this.buttonMute.setOrigin(0.5);
        this.buttonMute.setInteractive();
        this.buttonLanguage = this.add.text(this.cameras.main.centerX,
            this.cameras.main.centerY + 240, 
                ``,
            {
                font: 'bold 45px monospace',
                fill: '#ffffff',
            });
        this.buttonLanguage.setStroke('#003333', 10);
        this.buttonLanguage.setOrigin(0.5);
        this.buttonLanguage.setInteractive();
    }
    addEvents() {
        this.buttonMute.on('pointerdown', this.changeMute, this);
        this.buttonLanguage.on('pointerdown', this.changeLanguage, this);
        this.buttonOnePlayer.on('pointerdown', this.startGame, this);
        this.buttonTwoPlayers.on('pointerdown', this.requestGame, this);
    }
    changeLanguage() {
        if(this.sys.game.config.language || this.isEnglish) {
            this.buttonLanguage.setText('LANGUAGE: EN');
            this.buttonOnePlayer.setText('ONE PLAYER');
            this.buttonTwoPlayers.setText('TWO PLAYERS');
            if (!this.sys.game.config.mute) {
                this.buttonMute.setText('SOUND OFF');
            } else {
                this.buttonMute.setText('SOUND ON');
            }
            this.sys.game.config.language = !this.isEnglish;
            this.isEnglish = !this.isEnglish;
            
        } else {
            this.buttonLanguage.setText('ЯЗЫК: RU');
            this.buttonOnePlayer.setText('ОДИН ИГРОК');
            this.buttonTwoPlayers.setText('ДВА ИГРОКА');
            if (this.sys.game.config.mute) {
                this.buttonMute.setText('ВКЛ. ЗВУК');
            } 
            if(!this.sys.game.config.mute) {
                this.buttonMute.setText('ВЫКЛ. ЗВУК');
            }
            this.sys.game.config.language = !this.isEnglish;
            this.isEnglish = !this.isEnglish;
        }
    }
    changeMute() {
        if(this.sys.game.config.mute) {
            if(!this.sys.game.config.language || !this.isEnglish) {
                this.buttonMute.setText('SOUND OFF');
            } else {
                this.buttonMute.setText('ВЫКЛ. ЗВУК');
            }
            this.start.play({
                volume: 0.1
            });
            this.sys.game.config.mute = !this.mute;
            this.mute = !this.mute;
        } else {
            if(!this.sys.game.config.language || !this.isEnglish) {
                this.buttonMute.setText('SOUND ON');
            } else {
                this.buttonMute.setText('ВКЛ. ЗВУК');
            }
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