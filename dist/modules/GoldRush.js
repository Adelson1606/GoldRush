// const Matrix = require('./Matrix')
class GoldRush extends Matrix {
  constructor (numRows, numCols) {
    super(numRows, numCols)
    this.scores = { player1: 0, player2: 0 }       
  }

  generatePlayers () {
    this.alter(0, 0, 1)
    this.alter(this.numRows - 1, this.numCols - 1, 2)
    // return this.matrix
  }

  getNewLocation (currentLocation, direction) {
    let newLocation    
    if (direction === "down") {
      newLocation = { x: currentLocation.x, y: currentLocation.y + 1 }            
    }
    if (direction === "left") {
      newLocation = { x: currentLocation.x - 1, y: currentLocation.y }
    }
    if (direction === "up") {
      newLocation = { x: currentLocation.x, y: currentLocation.y - 1 }
          
    }
    if (direction === "right") {
      newLocation = { x: currentLocation.x + 1, y: currentLocation.y }
    }
    return newLocation
  }

  collectCoin (player) {
    this.scores["player" + player] += 10
  }

  isPlayer (rowNum, colNum) {
    const place = this.get(rowNum, colNum)
    return place === 1 || place === 2
  }

  isCoin (rowNum, numCols) {
    return this.get(rowNum, numCols) === 'c'
  }

  isWall (rowNum, numCols) {
    return this.get(rowNum, numCols) === 'w'
  }

  isOutOfBounds (location) {
    const matrixY = this.matrix.length - 1
    const matrixX = this.matrix[matrixY].length - 1
    return location.x < 0 || location.y < 0 || location.x > matrixX || location.y > matrixY
  }

  noCoinsLeft () {
    try {
      this.findCoordinate('c')
    } catch (err) {
      return true
    } 
    return false
  }

  validateMove (location) {
    try {
      if (this.isOutOfBounds(location)) { throw new Error("Can't move out of bounds") }
      if (this.isWall(location.y, location.x)) { throw new Error("Wrong Move") }
      if (this.isPlayer(location.y, location.x)) { throw new Error("Can't step on other players") }
    } catch (err) {
      return err.message
    }
    return "OK"
  }

  movePlayer (player, direction) {
    const currentLocation = this.findCoordinate(player) 
    const newLocation = this.getNewLocation(currentLocation, direction)
    const validationMessage = this.validateMove(newLocation)
    if (validationMessage === "OK") {
      this.alter(currentLocation.y, currentLocation.x, '.')
      if (this.isCoin(newLocation.y, newLocation.x)) {
        this.collectCoin(player) 
      }
      this.alter(newLocation.y, newLocation.x, player) 
    } else {
      return validationMessage
    }
    // return this.matrix
  }

  generateCoins (coinAmount) {
    for (let i = 0; i < coinAmount; i++) {
      const coinLocation = { y: Math.floor(Math.random() * this.numRows), x: Math.floor(Math.random() * this.numCols) }
      if (this.isWall(coinLocation.y, coinLocation.x) || this.isPlayer(coinLocation.y, coinLocation.x) || this.isCoin(coinLocation.y, coinLocation.x)) {
        i-- 
      } else {
        this.alter(coinLocation.y, coinLocation.x, 'c') 
      }
    }
    // return this.matrix
  }
  
  generateWalls (wallsAmount) {
    for (let i = 0; i < wallsAmount; i++) {
      const wallLocation = { y: Math.floor(Math.random() * this.numRows), x: Math.floor(Math.random() * this.numCols) }
      if (this.isPlayer(wallLocation.y, wallLocation.x)) { 
        i-- 
      } else {
        this.alter(wallLocation.y, wallLocation.x, 'w') 
      }
    }
  //  return this.matrix
  }

  getWinner () {
    if (this.scores.player1 === this.scores.player2) { return "Tie" }
    if (this.scores.player1 > this.scores.player2) {
      return 1
    } else {
      return 2
    } 
  }
  
  load (rowNum, colNum) {
    this.generateCoins(Math.floor(rowNum * 3))
    this.generateWalls(Math.floor(rowNum * 2))
    this.generatePlayers(rowNum, colNum)
    return this.matrix
  }
}
// const f = new GoldRush(5, 5)
// f.generateMatrix(5, 5)
// console.log(f.load(10.10))
// console.log(f.movePlayer(2, 'left'))

//module.exports = GoldRush
