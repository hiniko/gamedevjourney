import GameBoard from "./lib/GameBoard"
import GameBoardDisplay from "./lib/GameBoardDisplay"
import GameUI from "./lib/GameUI"
import { Graphics } from "./lib/Graphics"

export default class NumbersGame extends Phaser.Scene {

    private board: GameBoard;
    private boardDisplay: GameBoardDisplay
    private gameUI: GameUI

    constructor ()
    {
        super('NumbersGame');
    }

    preload ()
    {
        // @ts-ignore
        this.load.webfont("NunitoExtraBold","/assets/fonts/Nunito-ExtraBold.ttf");
        Graphics.generateGraphics(this)
    }

    create ()
    {            

        //Graphics.debugTextures(this)

        let { width, height } = this.sys.game.canvas;

        this.board = new GameBoard({
             scene: this, 
             width: 8, 
             height: 6, 
             startingMaxValue: 10
        })

        this.boardDisplay = new GameBoardDisplay({
          scene: this,
          spriteKey: Graphics.tileSheetKey,
          spriteFrameCount: 5,
          tileWidth: Graphics.tileWidth,
          tileHeight: Graphics.tileHeight,
          tilePadding: Graphics.tilePadding,
          gameBoard: this.board,
         })

        this.gameUI = new GameUI({
            scene: this,
            width: this.boardDisplay.container.width,
            height: 350
        })

        const boardOffsetX = (width - (Graphics.tileWidth * this.board.config.width) +(Graphics.tilePadding * (this.board.config.width -1))) / 2
        this.boardDisplay.setPosition(boardOffsetX, 300);

        this.gameUI.setPosition(
            (this.cameras.main.width / 2) - (this.gameUI.config.width / 2),
            (this.cameras.main.height / 2) - 350)

        this.add.existing(this.boardDisplay.container)
        this.add.existing(this.gameUI)

        this.board.popluate()
        this.boardDisplay.assembleBoard()
    }


    update() {
      this.boardDisplay.update()
    }
}

