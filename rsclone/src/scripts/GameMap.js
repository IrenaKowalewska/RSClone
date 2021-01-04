export default class GameMap {
    constructor(scene) {
        this.scene = scene;
        this.init();
        this.create();
    }
    init() {
        this.tileMap = this.scene.make.tilemap({key: 'tileMap'});
        this.tileSet =  this.tileMap.addTilesetImage('tileset', 'tileSet', 64, 64, 0, 1);
    }
    create() {
        this.tileMap.createStaticLayer('snow', this.tileSet);
        this.tileMap.createStaticLayer('road', this.tileSet);
        this.tileMap.createStaticLayer('sand', this.tileSet);
        this.tileMap.createStaticLayer('ice', this.tileSet);
    }
}