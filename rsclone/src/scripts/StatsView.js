export default class StatsView {
    constructor(scene, stats) {
        this.scene = scene;
        this.stats = stats;
        this.create();
    }

    create() {
        const style = {font: '24px Arial', fill: '#000'};
        this.cycles = this.scene.add.text(10, 10, 'Cycles: 0/0', style).setScrollFactor(0);
        this.time = this.scene.add.text(10, 40, 'Time: 0/0', style).setScrollFactor(0);
        this.timeCycle = this.scene.add.text(10, 70, 'Time cycle: 0/0', style).setScrollFactor(0);
        this.timeBestCycle = this.scene.add.text(10, 100, 'Best Cycle: 0/0', style).setScrollFactor(0);
    }

    render() {
        this.cycles.setText(`Cycles: ${this.stats.cycle}/${this.stats.cycles}`);
        this.time.setText(`Time: ${this.stats.time.toFixed(2)}`);
        this.timeCycle.setText(`Time cycle: ${this.stats.timeCycle.toFixed(2)}`);
        this.timeBestCycle.setText(`Best Cycle: ${this.stats.timeBestCycle.toFixed(2)}`);
    }
}