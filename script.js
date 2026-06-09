/* =========================================
       NEW: Cinematic Environment Variables
       ========================================= */
    const movieCards = document.querySelectorAll('.movie-card');
    
    movieCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const effect = card.getAttribute('data-effect');
            document.body.classList.add(`effect-${effect}`);
            
            // Optional: Play an eerie low-frequency drone
            if(effect === 'incantation' || effect === 'from') {
                playUIBeep(80, 'sawtooth', 1.5, 0.05);
            } else if (effect === 'abigail') {
                playUIBeep(150, 'square', 0.5, 0.05);
            }
        });

        card.addEventListener('mouseleave', () => {
            const effect = card.getAttribute('data-effect');
            document.body.classList.remove(`effect-${effect}`);
        });
    });

    /* =========================================
       NEW: Web Audio Generative Sequences (Music)
       ========================================= */
    const musicNodes = document.querySelectorAll('.music-node');
    const globalVisualizer = document.getElementById('global-visualizer');
    
    // Abstract representations of group sounds
    const sequences = {
        'aespa': [ {f:880, d:0.1}, {f:1108, d:0.1}, {f:1318, d:0.2}, {f:880, d:0.1} ], // Cyber/Hyperpop sequence
        'ive': [ {f:523, d:0.2}, {f:659, d:0.2}, {f:783, d:0.4} ], // Elegant pop chords
        'txt': [ {f:440, d:0.15}, {f:554, d:0.15}, {f:659, d:0.15}, {f:880, d:0.3} ], // Energetic rock/synth scale
        'treasure': [ {f:150, d:0.2}, {f:200, d:0.1}, {f:150, d:0.3} ] // Heavy bass drop
    };

    function playSequence(artist) {
        const seq = sequences[artist];
        if(!seq) return;
        
        let timeOffset = 0;
        seq.forEach(note => {
            setTimeout(() => {
                playUIBeep(note.f, artist === 'treasure' ? 'square' : 'sine', note.d, 0.08);
            }, timeOffset);
            timeOffset += (note.d * 1000) + 50; 
        });
        
        // Trigger visualizer
        globalVisualizer.classList.remove('inactive');
        setTimeout(() => { globalVisualizer.classList.add('inactive'); }, timeOffset);
    }

    musicNodes.forEach(node => {
        node.addEventListener('click', () => {
            // Remove active class from all
            musicNodes.forEach(n => n.classList.remove('active'));
            // Add to clicked
            node.classList.add('active');
            
            const artist = node.getAttribute('data-artist');
            playSequence(artist);
        });
    });

    /* =========================================
       NEW: System Override Mini-Game Engine
       ========================================= */
    const initGameBtn = document.getElementById('init-game');
    const closeGameBtn = document.getElementById('close-game');
    const gameLayer = document.getElementById('game-layer');
    const gameArena = document.getElementById('game-arena');
    const scoreDisplay = document.getElementById('game-score');
    const timerDisplay = document.getElementById('game-timer');
    
    let score = 0;
    let timeLeft = 15.0;
    let gameInterval, spawnInterval;

    function spawnPacket() {
        if(score >= 10 || timeLeft <= 0) return;

        const packet = document.createElement('div');
        packet.classList.add('data-packet');
        packet.innerHTML = '&lt;/&gt;';
        
        // Random position within arena bounds
        const maxX = gameArena.clientWidth - 40;
        const maxY = gameArena.clientHeight - 40;
        packet.style.left = Math.floor(Math.random() * maxX) + 'px';
        packet.style.top = Math.floor(Math.random() * maxY) + 'px';
        
        packet.addEventListener('click', () => {
            score++;
            scoreDisplay.textContent = score;
            playUIBeep(1200, 'sine', 0.1, 0.05); // High pitch success sound
            packet.remove();
            
            if(score >= 10) {
                endGame(true);
            }
        });

        gameArena.appendChild(packet);

        // Packet disappears after 1.5 seconds if not clicked
        setTimeout(() => {
            if(gameArena.contains(packet)) packet.remove();
        }, 1500);
    }

    function startGame() {
        score = 0;
        timeLeft = 15.0;
        scoreDisplay.textContent = score;
        gameLayer.classList.remove('hidden');
        gameArena.innerHTML = ''; // Clear arena
        
        // Glitch sound effect
        playUIBeep(100, 'sawtooth', 0.5, 0.1);

        gameInterval = setInterval(() => {
            timeLeft -= 0.1;
            timerDisplay.textContent = `Time remaining: ${timeLeft.toFixed(1)}s`;
            if(timeLeft <= 0) {
                endGame(false);
            }
        }, 100);

        spawnInterval = setInterval(spawnPacket, 800);
    }

    function endGame(win) {
        clearInterval(gameInterval);
        clearInterval(spawnInterval);
        gameArena.innerHTML = '';
        
        if(win) {
            timerDisplay.innerHTML = '<span style="color:var(--accent-glow)">SYSTEM SECURED. YOU HAVE ADMINISTRATIVE ACCESS.</span>';
            playUIBeep(800, 'sine', 0.1); setTimeout(() => playUIBeep(1200, 'sine', 0.3), 100);
        } else {
            timerDisplay.innerHTML = '<span style="color:red">SYSTEM FAILURE. CONNECTION LOST.</span>';
            playUIBeep(200, 'sawtooth', 0.5);
        }
    }

    initGameBtn.addEventListener('click', startGame);
    closeGameBtn.addEventListener('click', () => {
        clearInterval(gameInterval);
        clearInterval(spawnInterval);
        gameLayer.classList.add('hidden');
    });
