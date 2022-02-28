var canvas = document.getElementById('minha-tela');
var ctx = canvas.getContext('2d');
//definir o ínicio do desenho
var x = 350;
var y = 150;
var imagem = new Image();
var naveup = new Image();
var navedown = new Image();
var naveleft = new Image();
var naveright = new Image();
naveup.src = "images/naveUp.png";
navedown.src = "images/naveDown.png";
naveleft.src = "images/naveLeft.png";
naveright.src = "images/naveRight.png";



var variacaoAst = 0;
//dimensões do canvas
max_x = 750;
min_x = 0;
max_y = 350;
min_y = 0;
i = 0;

//dimensoes da nave
largura_nave = 100;
altura_nave = 100;

var asteroide = new Image();
asteroide.src = "images/asteroide.png";
largura_ast = 100;
altura_ast = 100;


var x_ast = new Array();
var y_ast = new Array();



//a função gameloop é chamada aqui
requestAnimationFrame(gameloop);

window.onkeydown = pressionaTecla;

function pressionaTecla(tecla) {


    if (tecla.keyCode == 39) {
        imagem = naveright;
        x = x + 20; //aumentar o x tem o efeito de ir para a direita
        if (x > 800) {
            x = 800
        }
    }
    if (tecla.keyCode == 37) {
        imagem = naveleft;
        x = x - 20; //diminuir o x tem o efeito de ir para a esquerda
        if (x < 0) {
            x = 0
        }
    }
    if (tecla.keyCode == 40) {
        imagem = navedown;

        y = y + 20;
        if (y > 400) {
            y = 400
        }
    }
    if (tecla.keyCode == 38) {
        imagem = naveup;

        y = y - 20;
        if (y < 0) {
            y = 0
        }

    }
}

function gameloop() {
    ctx.clearRect(0, 0, 800, 400);

    variacaoAst++;
    desenharAst(i, x_ast[i], y_ast[i]);
    desenharNave();
    detectarColisao();
    if (variacaoAst % 100 == 0) {
        i++;
        x_ast[i] = Math.floor((Math.random() * (max_x - min_x)) + min_x);
        y_ast[i] = 0;
    }


}


function marcarPonto() {
    ctx.strokeText('PONTOS: ' + ponto.toFixed(0), canvas.width - 150, canvas.height - 20);
    ponto += 1 / 60;
    tPonto = Math.floor(new Date().valueOf() / 1000);

    console.log("Variação Tempo:" + parseInt(tPonto - tInicial));
}


function desenharAst(i, x, y) {
    //desenha na tela

    //desenha na tela
    for (h = 0; h <= i; h++) {
        y_ast[h]++;
        ctx.drawImage(asteroide, x_ast[h], y_ast[h]);
    }
}

function detectarColisao() {

    if (((x_ast[i] + largura_ast) > x && x_ast[i] < (x +
        largura_nave)) && ((y_ast[i] + altura_ast) > y && y_ast[i] < (y + altura_nave))) {
        //interrompe o game loop parando a movimentação dos quadrados
        clearTimeout();
        alert("GAME OVER");

    } else {
        //chama novamente o ciclo da animação
        requestAnimationFrame(gameloop);
    }

}
function desenharNave() {
    //desenha na tela
    ctx.drawImage(imagem, x, y);
}