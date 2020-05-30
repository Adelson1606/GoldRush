class Renderer {
  renderIcons () {
    $(".c").html(`<i class="fab fa-bitcoin"></i>`)
    $(".1").html(`<i class="far fa-smile"></i>`)
    $(".2").html(`<i class="fas fa-smile"></i>`)
  }

  renderBoard (matrix) {
    const source = $('#board-template').html()
    const template = Handlebars.compile(source)
    const board = template({ matrix })
    $('#board').html(board)
    this.renderIcons()
  }

  renderScoreBoard (scores) { //{player1:0, player2:0}
    const source = $('#score-template').html()
    const template = Handlebars.compile(source)
    const scoreBoard = template(scores)
    $('#scores').html(scoreBoard)
  }

  renderWinner (player) {
    if (player === undefined) { return $('#winner').html("") } 
    if (player === "Tie") { return $('#winner').html("It's a Tie!") }
    $('#winner').html(`Player ${player} Wins!`)
  }
}