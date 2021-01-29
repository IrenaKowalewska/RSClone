export default class StatsPopup {
    constructor(scene, stats, level) {
        this.scene = scene;
        this.stats = stats;
        this.level = level;
        this.create();
    }

    create() {
        const style = {font: '40px monospace', fill: '#fff'},
            popupWidth = 800,
            popupHeight = 600;
        
        this.popup = this.scene.add.graphics()
            .setScrollFactor(0)
            .fillStyle(0x000000, 0.5)
            .fillRect((this.scene.sys.game.config.width - popupWidth) / 2, (this.scene.sys.game.config.height - popupHeight), popupWidth, popupHeight);
        
        this.title = this.scene.add.text(this.scene.cameras.main.centerX, 
            this.scene.cameras.main.centerY - 200,
            `Level complete`,
            {font: '50px monospace', fill: '#fff'})
            .setStroke('#000000', 6)
            .setOrigin(0.5)
            .setScrollFactor(0);
        
        this.time = this.scene.add.text(this.scene.cameras.main.centerX, 
            this.scene.cameras.main.centerY - 50,
            `Time total: ${this.stats.time.toFixed(2)}`,
            style)
            .setStroke('#000000', 6)
            .setOrigin(0.5)
            .setScrollFactor(0);

        this.timeBest = this.scene.add.text(this.scene.cameras.main.centerX, 
            this.scene.cameras.main.centerY + 50,
            `Time Best: ${this.stats.timeBestCycle.toFixed(2)}`,
            style)
            .setStroke('#000000', 6)
            .setOrigin(0.5)
            .setScrollFactor(0);

        this.continue = this.scene.add.text(this.scene.cameras.main.centerX, 
            this.scene.cameras.main.centerY + 200,
            `CONTINUE`,
            style)
            .setStroke('#000000', 10)
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setInteractive();
        
        this.menu = this.scene.add.text(this.scene.cameras.main.centerX, 
            this.scene.cameras.main.centerY + 280,
            `MENU`,
            style)
            .setStroke('#000000', 10)
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setInteractive();

        this.continue.on('pointerdown', () => {
            this.scene.scene.start('Game');
        });
        this.menu.on('pointerdown', () => {
            this.scene.scene.start('Start'); 
        });
    }
}