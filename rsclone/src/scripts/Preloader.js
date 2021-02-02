export default class Preloader {
    constructor(scene) {
        this.scene = scene;
        this.loadingText = this.scene.add.text(this.scene.game.config.width / 2 - 50,
            this.scene.game.config.height / 2 + 50, 
            `LOADING...`,
            {
                font: 'bold 40px monospace',
                fill: '#ffffff',
            });
        this.loadingText.setStroke('#003333', 16);
        this.assetText = this.scene.add.text(
            this.scene.game.config.width / 2 - 50,
            this.scene.game.config.height / 2 + 50, 
            '',
            {
                font: 'bold 30px monospace',
                fill: '#ffffff'
            }
        );
        this.assetText.setStroke('#003333', 16);

        this.progressBox = this.scene.add.graphics();
        this.progressBar = this.scene.add.graphics(); 

        this.showProgressBox();
        this.setEvents();
    }

    setEvents() {
        this.scene.load.on('progress', this.showProgressBar, this);
        this.scene.load.on('fileprogress', this.onFileProgress, this);
        this.scene.load.on('complete', this.onLoadComplete, this);
    }

    showProgressBox() {
        this.progressBox
            .fillStyle('0xFFFFFF')
            .fillRect(this.scene.game.config.width / 2 - 450, this.scene.game.config.height / 2, 900, 30);
    }
    onFileProgress(file) {
        this.loadingText.setText('');
        this.assetText.setText('Loading resource: ' + file.key);
    }
    onLoadComplete() {
        this.progressBar.destroy();
        this.progressBox.destroy();
    }

    showProgressBar(value) {
        this.progressBar
            .clear()
            .fillStyle('0x003333')
            .fillRect(this.scene.game.config.width / 2 - 450, this.scene.game.config.height / 2, 900 * value, 30);
    }
}