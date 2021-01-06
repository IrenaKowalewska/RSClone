export default class Player {
    constructor(scene, map) {
        this.scene = scene;
        this.map = map;
        const position = this.map.getPlayerPosition();
<<<<<<< HEAD
        this.car = this.scene.matter.add.sprite(position.x, position.y, 'gameObjects', 'car_black_small_1');
=======
        this.car = this.scene.matter.add.sprite(position.x, position.y, 'objects', 'car_black_small_1');
>>>>>>> dcec1ccd40d71bab5af3d8cf34398aef1c8c8eb0
    }
}