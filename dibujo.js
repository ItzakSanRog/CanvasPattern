var canvasObj = document.getElementById("dibujito");
var dibujo = canvasObj.getContext("2d");
var text_input = document.getElementById("input_text_lineas");
var boton_dibujar = document.getElementById("boton_dibujar");
var boton_limpiar = document.getElementById("boton_limpiar");

var checkbox_superior_izqierda = document.getElementById("checkbox_superior_izqierda");
var checkbox_superior_derecha = document.getElementById("checkbox_superior_derecha");
var checkbox_inferior_izquierda = document.getElementById("checkbox_inferior_izquierda");
var checkbox_inferior_derecha = document.getElementById("checkbox_inferior_derecha");
var checkbox_espiral_Cuadrada = document.getElementById("checkbox_espiral_Cuadrada");

boton_dibujar.addEventListener("click", draw);
boton_limpiar.addEventListener("click",limpiar);

var ancho = canvasObj.width;
var alto = canvasObj.height;
color="black";


function limpiar(){
    dibujo.clearRect(0, 0, canvasObj.width, canvasObj.height);
}

function draw() {
    var numeroDeLineas = parseInt(text_input.value);
    var squareSize;
    if (ancho > alto) {
        squareSize = alto;
    } else {
        squareSize = ancho;
    }
    var espacioEntreLineas = squareSize / numeroDeLineas;

    console.log(numeroDeLineas);

    if (checkbox_superior_izqierda.checked) {
        dibujarCurvaSuperiorIzquierda(numeroDeLineas, espacioEntreLineas, squareSize);
    }
    if (checkbox_superior_derecha.checked) {
        dibujarCurvaSuperiorDerecha(numeroDeLineas, espacioEntreLineas, squareSize);
    }
    if (checkbox_inferior_izquierda.checked) {
        dibujarCurvaInferiorIzquierda(numeroDeLineas, espacioEntreLineas, squareSize);
    }
    if (checkbox_inferior_derecha.checked) {
        dibujarCurvaInferiorDerecha(numeroDeLineas, espacioEntreLineas, squareSize);
    }
    if (checkbox_espiral_Cuadrada.checked) {
        dibujarRectangulo();
    }
}
/*
dibujo.beginPath(); //Inicia el trazo 
dibujo.strokeStyle = "red"; //define el color 
dibujo.moveTo(100, 100); //Definir el inicio de la linea
dibujo.lineTo(20, 20); //Definir el final de la linea
dibujo.stroke(); //Realizar el trazo
dibujo.closePath(); //Terminar el trazo
*/

/*
var size = 3;
dibujarRectangulo(canvasObj,size,"black");
document.write("<p>Este es tu dibujo en un lienzo de dimensiones: "+canvasObj.width+"x"+canvasObj.height+" pixeles con una separacion de "+size+" pixeles.</p>");
*/

//dibujarCurva(canvasObj, "black");




//
//Linea
//

function dibujarLinea(color, x_inicial, y_inicial, x_final, y_final) {
    dibujo.beginPath();
    dibujo.strokeStyle = color;
    dibujo.moveTo(x_inicial, y_inicial);
    dibujo.lineTo(x_final, y_final);
    dibujo.stroke();
    dibujo.closePath();
}

//
//Rectangulo
//

function dibujarRectangulo() {
    var size = 3;
    var color = "black";
    dibujarLineasVerticalesRectangulo(size, color);
    dibujarLineasHorizontalesRectangulo(size, color);
}

function dibujarLineasVerticalesRectangulo(size, color) {
    var limite_inferior = 0;
    var limite_superior_x = ancho;
    var limite_superior_y = alto;
    do {
        dibujarLinea(color, limite_inferior, limite_inferior, limite_inferior, limite_superior_y)
        limite_inferior = limite_inferior + size;
        dibujarLinea(color, limite_superior_x, limite_superior_y, limite_superior_x, limite_inferior)
        limite_superior_x = limite_superior_x - size;
        limite_superior_y = limite_superior_y - size;
        if (limite_superior_y - limite_inferior <= size || limite_superior_x - limite_inferior <= size) {
            return;
        }
    } while (limite_superior_y - limite_inferior >= size || limite_superior_x - limite_inferior >= size);
}

function dibujarLineasHorizontalesRectangulo(size, color) {
    var limite_inferior = 0;
    var limite_superior_y = alto;
    var limite_superior_x = ancho;
    do {
        dibujarLinea(color, limite_inferior, limite_superior_y, limite_superior_x, limite_superior_y)
        limite_inferior = limite_inferior + size;
        dibujarLinea(color, limite_superior_x, limite_inferior, limite_inferior, limite_inferior)
        limite_superior_y = limite_superior_y - size;
        limite_superior_x = limite_superior_x - size;
        if (limite_superior_y - limite_inferior <= size || limite_superior_x - limite_inferior <= size) {
            return;
        }
    } while (limite_superior_y - limite_inferior >= size || limite_superior_x - limite_inferior >= size);
}

//
//Curva
//

function dibujarCurvaSuperiorIzquierda(numeroDeLineas, espacioEntreLineas, squareSize) {
    var y_inicial = espacioEntreLineas, x_final = squareSize;

    for (var i = 0; i < numeroDeLineas; i++) {
        dibujarLinea(color, 0, y_inicial, x_final, 0);
        y_inicial = y_inicial + espacioEntreLineas;
        x_final = x_final - espacioEntreLineas;
        console.log(0 + ", " + y_inicial + " - " + x_final + ", " + 0);
    }
}
function dibujarCurvaSuperiorDerecha(numeroDeLineas, espacioEntreLineas, squareSize) {
    var x_inicial = ancho, y_final = squareSize;

    for (var i = 0; i < numeroDeLineas; i++) {
        dibujarLinea(color, x_inicial, 0, ancho, y_final);
        x_inicial = x_inicial - espacioEntreLineas;
        y_final = y_final - espacioEntreLineas;
        console.log(x_inicial + ", " + 0 + " - " + ancho + ", " + y_final);
    }
}
function dibujarCurvaInferiorIzquierda(numeroDeLineas, espacioEntreLineas, squareSize) {
    var y_inicial = alto - squareSize, x_final = ancho - espacioEntreLineas;

    for (var i = 0; i < numeroDeLineas; i++) {
        dibujarLinea(color, ancho, y_inicial, x_final, alto);
        y_inicial = y_inicial + espacioEntreLineas;
        x_final = x_final - espacioEntreLineas;
        console.log(ancho + ", " + y_inicial + " - " + x_final + ", " + alto);
    }
}
function dibujarCurvaInferiorDerecha(numeroDeLineas, espacioEntreLineas, squareSize) {
    var x_inicial = squareSize, y_final = alto;

    for (var i = 0; i < numeroDeLineas; i++) {
        dibujarLinea(color, x_inicial, alto, 0, y_final);
        x_inicial = x_inicial - espacioEntreLineas;
        y_final = y_final - espacioEntreLineas;
        console.log(ancho + ", " + x_inicial + " - " + y_final + ", " + alto);
    }
}