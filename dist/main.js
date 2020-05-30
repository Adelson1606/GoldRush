const renderer = new Renderer()
let board

const start = () => {
  const rowNum = parseInt($("#rows").val())
  const colNum = parseInt($("#columns").val())
  board = new GoldRush(rowNum, colNum)
  board.load(rowNum, colNum)

  renderer.renderBoard(board.matrix)
  renderer.renderScoreBoard(board.scores)
  renderer.renderWinner()
}

$('#container').on('click', '#play', function () {
  start()
  console.log('start')
})

$(document).keypress(function (e) {
  if (!board) { return }
  if (e.key === 'w' || e.key === "ц" || e.key === "'") { board.movePlayer(1, "up") }
  if (e.key == 'a' || e.key === "ф" || e.key === "ש") { board.movePlayer(1, "left") }
  if (e.key == 'd' || e.key === "в" || e.key === "ג") { board.movePlayer(1, "right") }
  if (e.key == 's' || e.key === "ы" || e.key === "ד") { board.movePlayer(1, "down") }
  if (e.key == 'i' || e.key === "ш" || e.key === "ן") { board.movePlayer(2, "up") }
  if (e.key == 'j' || e.key === "о" || e.key === "ח") { board.movePlayer(2, "left") }
  if (e.key == 'k' || e.key === "л" || e.key === "ל") { board.movePlayer(2, "down") }
  if (e.key == 'l' || e.key === "д" || e.key === "ך") { board.movePlayer(2, "right") }
  if (e.key == 32) { return start() }
  renderer.renderBoard(board.matrix)
  renderer.renderScoreBoard(board.scores)
  if (board.noCoinsLeft()) {
    const winner = board.getWinner()
    renderer.renderWinner(winner)
  }
})