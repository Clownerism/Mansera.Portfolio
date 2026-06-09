document.addEventListener('DOMContentLoaded', () => {
    
    document.getElementById('year').textContent = new Date().getFullYear();

    /* =========================================
       1. Custom Cursor Logic
       ========================================= */
    const cursor = document.querySelector('.cyber-cursor');
    const follower = document.querySelector('.cyber-cursor-follower');
    let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX; mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    function animateFollower() {
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    const interactables = document.querySelectorAll('a, button, .btn, .project-card, .comp-item, .skill-badge, .movie-card');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    /* =========================================
       2. Web Audio Synthesizer Engine
       ========================================= */
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    let audioCtx;

    function initAudio() {
        if (!audioCtx) audioCtx = new AudioContext();
        if (audioCtx.state === 'suspended') audioCtx.resume();
    }

    // Initialize audio safely via user interaction
    document.body.addEventListener('click', initAudio, { once: true });

    function playUIBeep(frequency = 440, type = 'sine', duration = 0.05, vol = 0.05) {
        if (!audioCtx || audioCtx.state !== 'running') return;
        try {
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            oscillator.type = type;
            oscillator.frequency.value = frequency;
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            oscillator.start();
            gainNode.gain.setValueAtTime(vol, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration);
            oscillator.stop(audioCtx.currentTime + duration);
        } catch (e) {
            console.log("Audio exception handled.");
        }
    }

    const soundElements = document.querySelectorAll('.play-sound');
    soundElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            const freq = el.getAttribute('data-freq') ? parseInt(el.getAttribute('data-freq')) : 500;
            playUIBeep(freq, 'triangle', 0.1, 0.02);
        });
    });

    /* =========================================
       3. Intersection Observers (Scroll Reveals)
       ========================================= */
    const revealElements = document.querySelectorAll('.reveal');
    const skillBars = document.querySelectorAll('.progress .bar');

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                if (entry.target.classList.contains('skills-grid')) {
                    skillBars.forEach(bar => {
                        const width = bar.getAttribute('style').match(/--w:\s*(.*)/)[1];
                        bar.style.width = width;
                    });
                }
                observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    revealElements.forEach(el => revealOnScroll.observe(el));

    /* =========================================
       4. Hero Typewriter Effect
       ========================================= */
    const typeText = ["System Analyst", "Project Manager", "Creative Architect"];
    const typeElement = document.getElementById('typewriter');
    let textIndex = 0, charIndex = 0, isDeleting = false;

    function type() {
        if(!typeElement) return;
        const currentString = typeText[textIndex];
        
        if (isDeleting) {
            typeElement.textContent = currentString.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typeElement.textContent = currentString.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 40 : 120;
        if (!isDeleting && charIndex === currentString.length) {
            speed = 2000; isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typeText.length;
            speed = 400; 
        }
        setTimeout(type, speed);
    }
    setTimeout(type, 1000);

    /* =========================================
       5. 3D Tilt Cards
       ========================================= */
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;  
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -4; 
            const rotateY = ((x - centerX) / centerX) * 4;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });

    /* =========================================
       6. Cinematic Horror Overlays
       ========================================= */
    const movieCards = document.querySelectorAll('.movie-card');
    movieCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const effect = card.getAttribute('data-effect');
            document.body.classList.add(`effect-${effect}`);
            if(effect === 'incantation' || effect === 'from') playUIBeep(80, 'sawtooth', 1.5, 0.05);
            else if (effect === 'abigail') playUIBeep(150, 'square', 0.5, 0.05);
        });
        card.addEventListener('mouseleave', () => {
            const effect = card.getAttribute('data-effect');
            document.body.classList.remove(`effect-${effect}`);
        });
    });

    /* =========================================
       7. Discography Matrix Audio
       ========================================= */
    const musicNodes = document.querySelectorAll('.music-node');
    const globalVisualizer = document.getElementById('global-visualizer');
    
    const sequences = {
        'aespa': [ {f:880, d:0.1}, {f:1108, d:0.1}, {f:1318, d:0.2}, {f:880, d:0.1} ], 
        'ive': [ {f:523, d:0.2}, {f:659, d:0.2}, {f:783, d:0.4} ], 
        'txt': [ {f:440, d:0.15}, {f:554, d:0.15}, {f:659, d:0.15}, {f:880, d:0.3} ], 
        'treasure': [ {f:150, d:0.2}, {f:200, d:0.1}, {f:150, d:0.3} ] 
    };

    function playSequence(artist) {
        initAudio(); // Ensure context is running
        const seq = sequences[artist];
        if(!seq) return;
        
        let timeOffset = 0;
        seq.forEach(note => {
            setTimeout(() => { playUIBeep(note.f, artist === 'treasure' ? 'square' : 'sine', note.d, 0.08); }, timeOffset);
            timeOffset += (note.d * 1000) + 50; 
        });
        
        globalVisualizer.classList.remove('inactive');
        setTimeout(() => { globalVisualizer.classList.add('inactive'); }, timeOffset);
    }

    musicNodes.forEach(node => {
        node.addEventListener('click', () => {
            musicNodes.forEach(n => n.classList.remove('active'));
            node.classList.add('active');
            playSequence(node.getAttribute('data-artist'));
        });
    });

    /* =========================================
       8. System Override Mini-Game
       ========================================= */
    const initGameBtn = document.getElementById('init-game');
    const closeGameBtn = document.getElementById('close-game');
    const gameLayer = document.getElementById('game-layer');
    const gameArena = document.getElementById('game-arena');
    const scoreDisplay = document.getElementById('game-score');
    const timerDisplay = document.getElementById('game-timer');
    
    let score = 0, timeLeft = 15.0, gameInterval, spawnInterval;

    function spawnPacket() {
        if(score >= 10 || timeLeft <= 0) return;

        const packet = document.createElement('div');
        packet.classList.add('data-packet');
        packet.innerHTML = '&lt;/&gt;';
        
        // Wait for DOM layout to ensure correct dimensions
        requestAnimationFrame(() => {
            const maxX = Math.max(gameArena.clientWidth - 40, 10);
            const maxY = Math.max(gameArena.clientHeight - 40, 10);
            packet.style.left = Math.floor(Math.random() * maxX) + 'px';
            packet.style.top = Math.floor(Math.random() * maxY) + 'px';
        });
        
        packet.addEventListener('click', () => {
            score++; scoreDisplay.textContent = score;
            playUIBeep(1200, 'sine', 0.1, 0.05); 
            packet.remove();
            if(score >= 10) endGame(true);
        });

        gameArena.appendChild(packet);
        setTimeout(() => { if(gameArena.contains(packet)) packet.remove(); }, 1500);
    }

    function startGame() {
        initAudio();
        score = 0; timeLeft = 15.0; scoreDisplay.textContent = score;
        gameLayer.classList.remove('hidden');
        gameArena.innerHTML = ''; 
        playUIBeep(100, 'sawtooth', 0.5, 0.1);

        gameInterval = setInterval(() => {
            timeLeft -= 0.1;
            timerDisplay.textContent = `Time remaining: ${timeLeft.toFixed(1)}s`;
            if(timeLeft <= 0) endGame(false);
        }, 100);

        spawnInterval = setInterval(spawnPacket, 800);
    }

    function endGame(win) {
        clearInterval(gameInterval); clearInterval(spawnInterval);
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
        clearInterval(gameInterval); clearInterval(spawnInterval);
        gameLayer.classList.add('hidden');
    });
});
