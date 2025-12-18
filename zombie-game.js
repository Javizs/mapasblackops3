document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("zombie-container");
    const rondaUI = document.getElementById("ronda");
    const pauseBtn = document.getElementById("pauseBtn");
    const resetBtn = document.getElementById("resetBtn");
  
    let zombies = [];
    let ronda = 1;
    let objetivo = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let paused = true; // ✅ Empieza pausado
  
    document.addEventListener("mousemove", (e) => {
      if (!paused) {
        objetivo.x = e.clientX;
        objetivo.y = e.clientY;
      }
    });
  
    function spawnZombies(cantidad) {
        for (let i = 0; i < cantidad; i++) {
            const zombie = document.createElement("div");
            zombie.classList.add("zombie");
            zombie.style.left = `${Math.random() * window.innerWidth}px`;
            zombie.style.top = `${Math.random() * window.innerHeight}px`;
    
            // 👇 Esto asegura que los nuevos zombis respeten si el juego está en pausa
            zombie.style.visibility = paused ? "hidden" : "visible";
    
            zombie.addEventListener("click", () => {
                container.removeChild(zombie);
                zombies = zombies.filter(z => z !== zombie);
    
                if (zombies.length === 0) {
                    ronda++;
                    rondaUI.textContent = `Ronda: ${ronda}`;
                    spawnZombies(ronda * 2); // 👈 aquí se generan más zombis
                }
            });
    
            container.appendChild(zombie);
            zombies.push(zombie);
        }
    }
    
  
    function moveZombies() {
      if (!paused) {
        zombies.forEach(zombie => {
          const rect = zombie.getBoundingClientRect();
          let x = rect.left + rect.width / 2;
          let y = rect.top + rect.height / 2;
  
          let dx = objetivo.x - x;
          let dy = objetivo.y - y;
          let dist = Math.sqrt(dx * dx + dy * dy);
  
          const speed = 1.2;
  
          if (dist > 1) {
            let vx = (dx / dist) * speed;
            let vy = (dy / dist) * speed;
  
            zombie.style.left = `${zombie.offsetLeft + vx}px`;
            zombie.style.top = `${zombie.offsetTop + vy}px`;
          }
        });
  
        // Evitar superposición de zombis
        for (let i = 0; i < zombies.length; i++) {
          for (let j = i + 1; j < zombies.length; j++) {
            const zi = zombies[i].getBoundingClientRect();
            const zj = zombies[j].getBoundingClientRect();
  
            const dx = zi.left - zj.left;
            const dy = zi.top - zj.top;
            const dist = Math.sqrt(dx * dx + dy * dy);
  
            if (dist < 50) {
              const overlap = (50 - dist) / 2;
              zombies[i].style.left = `${zombies[i].offsetLeft + dx / dist * overlap}px`;
              zombies[i].style.top = `${zombies[i].offsetTop + dy / dist * overlap}px`;
              zombies[j].style.left = `${zombies[j].offsetLeft - dx / dist * overlap}px`;
              zombies[j].style.top = `${zombies[j].offsetTop - dy / dist * overlap}px`;
            }
          }
        }
      }
  
      requestAnimationFrame(moveZombies);
    }
  
    // ⏸️ Botón de pausa / reanudar
    pauseBtn.addEventListener("click", () => {
      paused = !paused;
      pauseBtn.textContent = paused ? "▶️" : "⏸️";
  
      zombies.forEach(zombie => {
        zombie.style.visibility = paused ? "hidden" : "visible";
      });
    });
  
    // 🔄 Botón de reiniciar
    resetBtn.addEventListener("click", () => {
      paused = false;
      ronda = 1;
      rondaUI.textContent = `Ronda: ${ronda}`;
      pauseBtn.textContent = "⏸️";
  
      zombies.forEach(zombie => container.removeChild(zombie));
      zombies = [];
  
      spawnZombies(ronda * 2);
  
      // Mostrar zombis al reiniciar
      zombies.forEach(zombie => {
        zombie.style.visibility = "visible";
      });
    });
  
    // Iniciar juego pausado
    spawnZombies(ronda * 2);
    moveZombies();
  });
  