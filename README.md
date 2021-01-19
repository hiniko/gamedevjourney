# Numbers _A simple maths game_

## Play it online!
https://numbers.shermanrose.uk

## Objective
Add or Subtract numbers to make the target number.
The target number, and number tiles increase as you play!

![](numbers_game.gif)


## Controls
* `Left-Click` a tile to select it.
* * When selected, operations adjacent to tiles will appear. `Left-Click` an operation (+ or -) to perform on the adjacent tile. That tile will become selected and the process repeats
* When you are happy with your solution press `space` to accept
* * If your solution is correct, the tiles will be removed and new tiles will drop down from above
* * If your solution is incorrect, the tiles will flash red and deselect
* `Left-click` on a previous selection to unslect tiles to that point

## Building yourself 
```
npm install
npm build
npm run watch # dev-server
```

## Bugs 
There are likely to be bugs still lurking. One I have noticed is that someties you are unable to select an operation for an adjacent tile. I think this is due to stale data in `GameDisplayBoard.ts`. Feel free to report any others.