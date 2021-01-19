import GameEvents from "./Events"
import { OpType } from "./OpsButton"
import { UI_TEXT_STYLE_TARGET, UI_TEXT_STYLE_OPERATIONS } from "./Styles"

interface GameUIConfig {
    scene: Phaser.Scene
    width: integer
    height: integer
}

interface PreviousSelection {
    idx: integer
    value: integer
    op: OpType
}

export default class GameUI extends Phaser.GameObjects.Container {

    config: GameUIConfig
    events: GameEvents
    targetText: Phaser.GameObjects.Text
    operationsText: Phaser.GameObjects.Text
    selectionHistory: PreviousSelection[] = []
    selectionHistoryIdxs: Array<integer> = new Array<integer>()

    constructor(config: GameUIConfig) {
        super(config.scene)

        this.config = config
        this.events = GameEvents.get()

        this.width = config.width
        this.height = config.height
        
        this.targetText = new Phaser.GameObjects.Text(config.scene, 0, 0, "0", UI_TEXT_STYLE_TARGET)
        this.operationsText = new Phaser.GameObjects.Text(config.scene, 0, 100, "", {...UI_TEXT_STYLE_OPERATIONS, wordWrap: { width: 450, useAdvancedWrap: true }})

        this.targetText.setOrigin(0.5)
        this.operationsText.setOrigin(0.5)

        this.events.on(GameEvents.LOGIC_NEW_TARGET, this.onTargetUpdate, this)
        this.events.on(GameEvents.LOGIC_ACCEPT_SOLUTION, this.clearOperationsText, this)
        this.events.on(GameEvents.LOGIC_REJECT_SOLUTION, this.clearOperationsText, this)
        this.events.on(GameEvents.LOGIC_UNSELECTION, this.onUnselection, this)
        this.events.on(GameEvents.LOGIC_VALID_SELECTION, this.onValidSelection, this)

        this.add(this.targetText)
        this.add(this.operationsText)
    }

    clearOperationsText() {
        this.operationsText.setText("")
        this.selectionHistory.length = 0
        this.selectionHistoryIdxs.length = 0
    }

    onValidSelection(boardIdx: integer, number: integer, op: OpType) {
        this.selectionHistoryIdxs.unshift(boardIdx)
        this.selectionHistory[boardIdx] = {
            idx: boardIdx, 
            value: number, 
            op: op
        }
        this.buildOpsText()
    }

    onUnselection(dataIdxs: integer[], rejection: Boolean = false) { 
        this.selectionHistoryIdxs.splice(0, dataIdxs.length)
        this.selectionHistory = this.selectionHistory.filter(prev => this.selectionHistoryIdxs.includes(prev.idx))
        this.buildOpsText()
    }

    buildOpsText() {
        let text: string = ""
        for(let i=this.selectionHistoryIdxs.length-1; i>=0; i--) {
            let set = this.selectionHistory[this.selectionHistoryIdxs[i]]
            if(set.op != null) {
                let symbol = ""
                switch(set.op) {
                    case OpType.Add: symbol = " + "; break
                    case OpType.Subtract: symbol = " - "; break
                }
                text += symbol 
            }
            text += set.value
        }
        this.operationsText.setText(text)
    }
 
    onTargetUpdate(target: integer) {
        this.scene.tweens.add({
            targets: this.targetText,
            duration: 100,
            yoyo: true,
            onYoyoScope: this,
            onYoyo(){
                this.targetText.setText(target.toString())
            },
            props: {
                scale: { value: 0},
                angle: { value: 180 }
            }
        }) 
    }
}