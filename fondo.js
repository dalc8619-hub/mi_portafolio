    // --- SCRIPT DE ARTE GENERATIVO: NIEBLA DEL SUMAPAZ ---
    
    let particles = [];
    const num = 1000; // Cantidad de trazos (¡Súbelo si tu PC aguanta!)
    const noiseScale = 0.01; // Qué tan "suave" es el viento (menor = más suave)

    function setup() {
        // Creamos un lienzo que cubre toda la ventana
        let canvas = createCanvas(windowWidth, windowHeight);
        canvas.position(0, 0);
        canvas.style('z-index', '-1'); // Lo mandamos al fondo
        
        // Inicializamos las partículas en posiciones aleatorias
        for(let i = 0; i < num; i ++) {
            particles.push(createVector(random(width), random(height)));
        }
        
        // Color de fondo (oscuro, casi negro) con transparencia para dejar rastro
        background(10, 15, 13); 
        stroke(0, 255, 136, 15); // Color Verde Neon muy transparente (RGBA)
    }

    function draw() {
        // Truco mágico: No borramos el fondo totalmente.
        // Pintamos un velo negro casi invisible para crear el efecto "fantasma/rastro".
        noStroke();
        fill(10, 15, 13, 10); // El último número es la opacidad (alpha)
        rect(0, 0, width, height);

        // Configuración del pincel
        strokeWeight(1.5);
        
        // Bucle principal: Mover cada partícula
        for(let i = 0; i < num; i ++) {
            let p = particles[i];
            
            // --- EL CORAZÓN DEL ALGORITMO (RUIDO PERLIN) ---
            // Obtenemos un valor de "ruido" basado en la posición X, Y.
            // A diferencia de random(), noise() devuelve valores cercanos para puntos cercanos.
            let n = noise(p.x * noiseScale, p.y * noiseScale, frameCount * 0.002);
            
            // Convertimos ese ruido en un ángulo (dirección del viento)
            let a = TAU * n; 
            
            // Movemos la partícula en esa dirección
            p.x += cos(a);
            p.y += sin(a);
            
            // Dibujamos el punto actual
            // Variamos el color un poco basado en la posición para dar profundidad
            let verde = map(p.x, 0, width, 100, 255);
            stroke(0, verde, 150, 50); 
            point(p.x, p.y);

            // Si se sale de la pantalla, vuelve a entrar por el otro lado (Efecto Pacman)
            if(!onScreen(p)) {
                p.x = random(width);
                p.y = random(height);
            }
        }
    }

    function onScreen(v) {
        return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
    }

    function windowResized() {
        resizeCanvas(windowWidth, windowHeight);
        background(10, 15, 13);
    }
