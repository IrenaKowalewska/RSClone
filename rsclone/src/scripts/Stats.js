export default class Stats {
    constructor(scene, cycles) {
        this.scene = scene;
        this.cycles = cycles;
        this.cycle = 0;
        this.time = 0;
        this.timeCycle = 0;
        this.timeBestCycle = 0;
        this.timeLastCycle = 0;
    }

    get complete() {
        return this.cycle > this.cycles;
    }

    onCycleComplete() {
        comsole.log('complete');
        ++this.cycle;

        if (this.timeBestCycle === 0 || this.timeCycle < this.timeBestCycle) {
            this.timeBestCycle = this.timeCycle;
        }

        this.timeLastCycle = this.timeCycle;
        this.timeCycle = 0;
    }

    update(deltaTime) {
        if (!this.complete) {
            const time = deltaTime / 1000;
            this.time += time;
            this.timeCycle += time;
            console.log(this);
        }
    }
}