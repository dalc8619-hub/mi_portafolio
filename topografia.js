// --- ARTE GENERATIVO: TOPOGRAFÍA VIVA ---
// Concepto: Líneas de elevación que simulan un paisaje en movimiento.

let yoff = 0.0; // Variable para mover el terreno hacia adelante

function setup() {
    // Creamos el lienzo del tamaño de la ventana
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-1'); // Al fondo, detrás del texto
    
    // Configuración inicial de dibujo
    stroke(212, 175, 55, 100); // Color DORADO (R:212, G:175, B:55) con transparencia
    noFill(); // Sin relleno, solo líneas (estilo arquitecto)
}

function draw() {
    // Fondo oscuro suave (limpia la pantalla cada cuadro)
    background(10, 15, 13); 

    // Configuración del terreno
    // Vamos a dibujar muchas líneas horizontales
    
    let espacio = 40; // Espacio entre cada línea de montaña
    
    // Empezamos un poco más abajo del top para que no tape el título del blog
    for (let y = 100; y < height; y += espacio) {
        
        beginShape(); // Empezamos a dibujar una línea continua
        
        let xoff = 0; // Ruido en el eje X
        
        // Recorremos todo el ancho de la pantalla
        for (let x = 0; x <= width; x += 20) {
            
            // FORMULA MÁGICA DE LA ELEVACIÓN:
            // Usamos noise() para calcular qué tan alta es la montaña en este punto.
            // map() convierte ese ruido (0 a 1) en píxeles de altura (-50 a 50).
            
            // "yoff" hace que las montañas se muevan con el tiempo
            let altura = map(noise(xoff, yoff + (y * 0.01)), 0, 1, -60, 60);
            
            // Un truco: Hacemos que el ruido sea más fuerte en el centro y suave en los bordes
            // para crear un efecto de "valle" o viñeta.
            let centro = dist(x, y, width/2, y);
            let atenuacion = map(centro, 0, width/2, 1, 0);
            altura *= atenuacion; 

            // Dibujamos el punto
            // curveVertex hace que la línea sea curva y suave, no picuda
            curveVertex(x, y - altura);
            
            xoff += 0.05; // Frecuencia de las montañas (qué tan arrugadas son)
        }
        
        endShape();
    }

    // Movemos el terreno un poquito para el siguiente cuadro (Animación)
    yoff -= 0.005; // Velocidad de vuelo (negativo = hacia adelante)
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}