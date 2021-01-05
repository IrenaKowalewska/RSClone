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
        this.addLayers();
        this.addObjects();
    }
    addLayers() {
        this.tileMap.createStaticLayer('snow', this.tileSet);
        this.tileMap.createStaticLayer('road', this.tileSet);
        this.tileMap.createStaticLayer('sand', this.tileSet);
        this.tileMap.createStaticLayer('ice', this.tileSet);
    }
    addObjects() {
        this.tileMap.findObject('collisions', item => {
            const objectSprite = this.scene.matter.add.sprite(item.x, item.y, 'gameObjects', item.name);
            objectSprite.setOrigin(0, 1);
            objectSprite.setStatic(true);
        })
    }

    getPlayerPosition() {
        return this.tileMap.findObject('player', position => {
            return position.name ==='player';
        });
    }

}