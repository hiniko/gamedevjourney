# Numbers
_A simple maths game_

# Play it online!
https://numbers.shermanrose.uk

![](numbers_game.gif)

# Objective
Add or Subtract numbers to make the target number.
The target number, and number tiles increse ad you play!

# Controls
* Left click a tile to select it.
* * When selected, operations adjacent to tiles will appear. Select an operation to perform on the adjacent tile
* When you are happy with your solution press space to accept
* * If your solution is correct, the tiles will be removed and new tiles will drop down from above
* * If your solution is incorrect, the tiles will flash red and deselect
* Left click on a previous selection to unslect tiles to that point

# Building yourself 

```
npm install
npm build
npm run watch # dev-server
```

# Bugs 
There are likely to be bugs still lurking. One I have noticed is that someties you are unable to select an operation for an adjacent tile. I think this is due to stale data in `GameDisplayBoard.ts`. Feel free to report any others.