const DIRECTIONS = Object.freeze({BACK: -1, NONE: 0, FORWARD: 1});
const TURNS = Object.freeze({LEFT: -1, NONE: 0, RIGHT: 1});
const SPEED = 10;
const ACCELERATION = 0.5;
const SLIP_ANGLE = 4;
export default class Player {
    constructor(scene, map) {
        this.scene = scene;
        this.map = map;
        const position = this.map.getPlayerPosition();
        this.car = this.scene.matter.add.sprite(position.x, position.y, 'gameObjects', 'car_black_small_1');
        this.car.setFixedRotation(true);
        this._speed = 0;
        this.checkpoint = 0;
        this.cycles = 0;
    }

    get cycle() {
        return this.cycles + 1;
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
        const velocity = Math.abs(this._speed);
        const gameSpeed = this.getGameSpeedCar();
        if(this.directionCar && velocity < gameSpeed) {
            this._speed += ACCELERATION * Math.sign(this.directionCar);
        } else if ((!this.directionCar && velocity > 0) || (this.directionCar && velocity > gameSpeed)) {
            this._speed -= ACCELERATION * Math.sign(this._speed);
        }
        return this._speed;
    }

    get turnCar() {
        let turn = TURNS.NONE;

        if (this.scene.cursors.left.isDown) {
            turn = TURNS.LEFT;
        } else if (this.scene.cursors.right.isDown) {
            turn = TURNS.RIGHT;
        }

        return turn;
    }

    get angle () {
        return this.car.angle + this.turnCar * SPEED / 3;
    }

    getSpeedFromAngle() {
        const vector = new Phaser.Math.Vector2();
        return vector.setToPolar(this.car.rotation - Math.PI/2, this.speed);

    }

    getGameSpeedCar() {
        return SPEED * this.map.getLayerFriction(this.car);
    }

    slip() {
        this.car.angle += SLIP_ANGLE;
    }

    move() {
        this.car.setAngle(this.angle);
        const speed = this.getSpeedFromAngle();
        this.car.setVelocity(speed.x, speed.y);
        const playerHalfWidth = this.car.width / 2;
        const playerHalfHeigh = this.car.height / 2;
        if (this.car.x < 20) {
            this.car.x = playerHalfWidth;
        } 
        if (this.car.x > 1700 - playerHalfWidth) {
            this.car.x = 1700 - playerHalfWidth;
        }
        if (this.car.y < 40) {
            this.car.y = playerHalfHeigh;
        } 
        if (this.car.y > 1160 - playerHalfHeigh) {
            this.car.y = 1160 - playerHalfHeigh;
        }
        this.checkPosition();
    }

    checkPosition() {
        const checkpoint = this.map.getCheckpointMap(this.car);
        if (checkpoint) {
            this.validCheckpoint(checkpoint);
        }
    }

    validCheckpoint(checkpoint) {
        if (checkpoint === 1 && this.checkpoint === this.map.checkpoints.lenght) {
            this.checkpoint = 1;
            ++this.cycles;
            this.car.emit('cycle', this.cycles);
        } else if (this.checkpoint === this.checkpoint + 1) {
            ++this.checkpoint;
           
        }
    }
}