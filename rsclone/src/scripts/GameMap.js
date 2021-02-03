const SNOW_FRICTION = 0.2;
const LAYERS_FRICTION = {
  road: 1,
  sand: 0.5,
  ice: 0.3,
};
export default class GameMap {
  constructor(scene, level = 1) {
    this.level = level;
    this.scene = scene;
    this.init();
    this.create();
  }

  init() {
    if (this.level === 1) {
      this.tileMap = this.scene.make.tilemap({ key: 'tileMap' });
    }
    if (this.level === 2) {
      this.tileMap = this.scene.make.tilemap({ key: 'tileMap2' });
    }
    this.tileSet = this.tileMap.addTilesetImage('tileset', 'tileSet', 64, 64, 0, 1);
  }

  create() {
    this.addLayers();
    this.addObjects();
    this.addArrows();
    this.addSnowRoad();
    this.addCheckpoints();
  }

  addLayers() {
    this.tileMap.createLayer('snow', this.tileSet);
    this.tileMap.createLayer('road', this.tileSet);
    this.tileMap.createLayer('sand', this.tileSet);
    this.tileMap.createLayer('ice', this.tileSet);
  }

  addObjects() {
    this.tileMap.findObject('collisions', (item) => {
      const objectSprite = this.scene.matter.add.sprite(item.x + item.width / 2, item.y - item.height / 2, 'gameObjects', item.name);
      objectSprite.setStatic(true);
    });
  }

  addCheckpoints() {
    this.checkpoints = [];
    this.tileMap.findObject('checkpoints', (checkpoint) => {
      const rectangle = new Phaser.Geom.Rectangle(checkpoint.x, checkpoint.y, checkpoint.width, checkpoint.height);
      rectangle.index = checkpoint.properties.find((property) => property.name === 'value').value;
      this.checkpoints.push(rectangle);
    });
  }

  addArrows() {
    this.tileMap.findObject('arrows', (item) => {
      const objectSprite = this.scene.matter.add.sprite(item.x + item.width / 2, item.y - item.height / 2, 'gameObjects', item.name);
      objectSprite.setStatic(true);
      objectSprite.setSensor(true);
    });
  }

  addSnowRoad() {
    this.tileMap.findObject('snowroad', (item) => {
      const objectSprite = this.scene.matter.add.sprite(item.x + item.width / 2, item.y - item.height / 2, 'gameObjects', item.name);
      objectSprite.setStatic(true);
      objectSprite.setSensor(true);
    });
  }

  getPlayerPosition(positionName) {
    return this.tileMap.findObject(positionName, (position) => position.name === positionName);
  }

  getLayerFriction(car) {
    for (const layerRoad in LAYERS_FRICTION) {
      const layer = this.tileMap.getTileAtWorldXY(car.x, car.y, false, this.scene.cameras.main, layerRoad);
      if (layer) {
        return LAYERS_FRICTION[layerRoad];
      }
    }
    return SNOW_FRICTION;
  }

  getCheckpointMap(car) {
    const checkpoint = this.checkpoints.find((checkpoint) => checkpoint.contains(car.x, car.y));
    return checkpoint ? +(checkpoint.index) : false;
  }
}
