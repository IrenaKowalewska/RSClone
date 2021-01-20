import Phaser from 'phaser';
import Loader from './scripts/LoaderStage';
import Preloader from './scripts/PreloaderStage';
import Game from './scripts/GameStage';
import Start from './scripts/StartStage';

const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    scene: [Loader, Preloader, Start, Game],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'matter',
        matter: {
            debug: false,
            gravity: {x: 0, y: 0}
        }
    }
};

const game = new Phaser.Game(config);
