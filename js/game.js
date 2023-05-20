
let coresButao = ["vermelho", "azul", "verde", "amarelo"];

let padraoJogo = [];
let clickPadraoUsuario =[];

var iniciado = false;

var nivel = 0;

$(document).keydown(function() {
  if (!iniciado) {
    $("#titulo-nivel").text("Nível " + nivel);
    proximaSequencia();
    iniciado = true;
  }
});

$(".btn").on("click", function () {
  var corEscolhida = $(this).attr("id");
  clickPadraoUsuario.push(corEscolhida);

  playSound(clickPadraoUsuario);
  animatePress(corEscolhida);

  verificaResposta(clickPadraoUsuario.length-1);
}); 

function verificaResposta(currentLevel) {

  if (padraoJogo[currentLevel] === clickPadraoUsuario[currentLevel]) {
    if (clickPadraoUsuario.length === padraoJogo.length)
    {
      setTimeout(function () {
        proximaSequencia();
      }, 1000);
    }
  } else {
    playSound("errado");
    $("body").addClass("game-over");
    $("#titulo-nivel").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function proximaSequencia() {

  nivel++;

  $("#titulo-nivel").text("Nível " + nivel);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomEscolhaCor = coresButao[randomNumber];
  padraoJogo.push(randomEscolhaCor)

  $("#" + randomEscolhaCor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomEscolhaCor);  
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();   
}

function animatePress(corAtual) {
  $("#" + corAtual).addClass("pressed");  
  setTimeout(function(){
    $("#" + corAtual).removeClass("pressed");
  }, 100);
}


function startOver() {
  level = 0;
  padraoJogo = [];
  iniciado = false;
}
