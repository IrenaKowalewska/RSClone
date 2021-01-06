const DIRECTIONS = Object.freeze({BACK: -1, NONE: 0, FORWARD: 1});
const SPEED = 10;
export default class Player {
    constructor(scene, map) {
        this.scene = scene;
        this.map = map;
        const position = this.map.getPlayerPosition();
        this.car = this.scene.matter.add.sprite(position.x, position.y, 'gameObjects', 'car_black_small_1');
    }

    get directionCar() {
        let direction = DIRECTIONS.NONE;

        if (this.scene.cursors.up.isDown) {
            direction = DIRECTIONS.FORWARD;
        } else if (this.scene.cursors.down.isDown) {
            direction = DIRECTIONS.BACK;
        }

        return direction;
    }

    get speed() {
        return this.directionCar * SPEED;
    }

    getSpeedFromAngle() {
        const vector = new Phaser.Math.Vector2();
        return vector.setToPolar(this.car.rotation - Math.PI/2, this.speed);

    }

    move() {
        const speed = this.getSpeedFromAngle();
        this.car.setVelocity(speed.x, speed.y);
    }
}