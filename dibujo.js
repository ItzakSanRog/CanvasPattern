var canvasObj = document.getElementById("dibujito");
var dibujo = canvasObj.getContext("2d");
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

dibujarCurva(canvasObj, "black");




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

function dibujarRectangulo(canvas, size, color) {
    dibujarLineasVerticalesRectangulo(canvas, size, color);
    dibujarLineasHorizontalesRectangulo(canvas, size, color);
}

function dibujarLineasVerticalesRectangulo(canvas, size, color) {
    var limite_inferior = 0;
    var limite_superior_x = canvas.width;
    var limite_superior_y = canvas.height;
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

function dibujarLineasHorizontalesRectangulo(canvas, size, color) {
    var limite_inferior = 0;
    var limite_superior_y = canvas.height;
    var limite_superior_x = canvas.width;
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
//Cuadrado
//

function dibujarLineasVerticalesCuadrado(canvas, size, color) {
    var limite_inferior = 0;
    var limite_superior = canvas.height;
    do {
        dibujarLinea(color, limite_inferior, limite_inferior, limite_inferior, limite_superior)
        limite_inferior = limite_inferior + size;
        dibujarLinea(color, limite_superior, limite_superior, limite_superior, limite_inferior)
        limite_superior = limite_superior - size;
    } while (limite_superior - limite_inferior >= size);
}

function dibujarLineasHorizontalesCuadrado(canvas, size, color) {
    var limite_inferior = 0;
    var limite_superior = canvas.width;
    do {
        dibujarLinea(color, limite_inferior, limite_superior, limite_superior, limite_superior)
        limite_inferior = limite_inferior + size;
        dibujarLinea(color, limite_superior, limite_inferior, limite_inferior, limite_inferior)
        limite_superior = limite_superior - size;
    } while (limite_superior - limite_inferior >= size);
}

function dibujarCuadro(canvas, size, color) {
    dibujarLineasVerticalesCuadrado(canvas, size, color);
    dibujarLineasHorizontalesCuadrado(canvas, size, color);
}


//
//Curva
//

function dibujarCurva(canvas, color) {
    var numeroDeLineas = parseInt(prompt("¿Cuantas lineas quieres"));
    var posicion = parseInt(prompt("¿En que esquina quieres dibujar la curva?\n1.- Superior izquierdo\n2.- Superior derecho\n3.- Inferior izquierdo\n4.- Inferior derecho"));
    /*
    Posicion 
    1= Superior izquierdo
    2= Superior derecho
    3= Inferior izquierdo
    4= Inferior derecho
    */
    var ancho = canvas.width;
    var alto = canvas.height;
    var squareSize;
    if (ancho > alto) {
        squareSize = alto;
    } else {
        squareSize = ancho;
    }
    var espacioEntreLineas = squareSize / numeroDeLineas;

    if (posicion == 1) {
        var y_inicial = espacioEntreLineas, x_final = squareSize;

        for (var i = 0; i < numeroDeLineas; i++) {
            dibujarLinea(color, 0, y_inicial, x_final, 0);
            y_inicial = y_inicial + espacioEntreLineas;
            x_final = x_final - espacioEntreLineas;
            console.log(0 + ", " + y_inicial + " - " + x_final + ", " + 0);
        }
    } else {
        if (posicion == 2) {
            var x_inicial = ancho, y_final = squareSize;

            for (var i = 0; i < numeroDeLineas; i++) {
                dibujarLinea(color, x_inicial, 0, ancho, y_final);
                x_inicial = x_inicial - espacioEntreLineas;
                y_final = y_final - espacioEntreLineas;
                console.log(x_inicial + ", " + 0 + " - " + ancho + ", " + y_final);
            }
        } else {
            if (posicion == 3) {
                var y_inicial = alto - squareSize, x_final = ancho - espacioEntreLineas;

                for (var i = 0; i < numeroDeLineas; i++) {
                    dibujarLinea(color, ancho, y_inicial, x_final, alto);
                    y_inicial = y_inicial + espacioEntreLineas;
                    x_final = x_final - espacioEntreLineas;
                    console.log(ancho + ", " + y_inicial + " - " + x_final + ", " + alto);
                }

            } else {
                if (posicion == 4) {
                    var x_inicial = squareSize, y_final = alto;

                    for (var i = 0; i < numeroDeLineas; i++) {
                        dibujarLinea(color, x_inicial, alto, 0, y_final);
                        x_inicial = x_inicial - espacioEntreLineas;
                        y_final = y_final - espacioEntreLineas;
                        console.log(ancho + ", " + x_inicial + " - " + y_final + ", " + alto);
                    }
                } else {
                }
            }
        }
    }


}