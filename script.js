document.addEventListener('DOMContentLoaded', () => {
    
    // Process current execution timestamp context securely
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* =========================================================================
       0. HARDENED AUDIO CONTEXT & SYSTEM INITIALIZATION PIPELINE
       ========================================================================= */
    const bootBtn = document.getElementById('boot-btn');
    const bootScreen = document.getElementById('boot-screen');
    const bgMusic = document.getElementById('bg-music');
    
    // Hardware Web Audio API Architecture setup
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    let audioCtx = null;

    function initAudioContext() {
        if (!audioCtx) {
            try { 
                audioCtx = new AudioContext(); 
            } catch(e) {
                console.error("Failed to construct core AudioContext pipelines:", e);
            }
        }
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    }

    if (bootBtn && bootScreen) {
        bootBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Execute Audio Context Initialization lifecycle
            initAudioContext();
            
            // Attempt secondary structural background element fallback playback
            if (bgMusic) {
                bgMusic.volume = 0.25;
                let playPromise = bgMusic.play();
                if (playPromise !== undefined) {
                    playPromise.catch(err => {
                        console.warn("Static MP3 resource unavailable. Relying on Native Audio Synthesis Matrix:", err);
                    });
                }
            }
            
            // Absolute layer transition logic to prevent rendering blockades
            bootScreen.style.opacity = '0';
            bootScreen.style.pointerEvents = 'none';
            
            // Safe execution context for interface activation
            setTimeout(() => { 
                bootScreen.style.display = 'none'; 
                // CRITICAL FIX: Activate safe hardware tracking pointer layout state
                document.body.classList.add('custom-cursor-active');
            }, 550);
            
            // Trigger confirmation tone
            playSynthesizedTone(587.33, 'sine', 0.2, 0.05); // D5
            setTimeout(() => playSynthesizedTone(880, 'sine', 0.3, 0.05), 150); // A5
        });
    }

    /* =========================================================================
       1. HARDENED HARDWARE TRACKING CURSOR RENDERING PIPELINE
       ========================================================================= */
    const cursor = document.querySelector('.cyber-cursor');
    const follower = document.querySelector('.cyber-cursor-follower');
    
    if (cursor && follower) {
        let mouseX = -100, mouseY = -100;
        let followerX = -100, followerY = -100;
        let isMoving = false;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX; 
            mouseY = e.clientY;
            isMoving = true;
            
            // Immediate top layer component rendering updates
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });

        // Loop array execution via standard window request frames
        function renderTrackingLoop() {
            if (isMoving) {
                followerX += (mouseX - followerX) * 0.18;
                followerY += (mouseY - followerY) * 0.18;
                follower.style.left = followerX + 'px';
                follower.style.top = followerY + 'px';
            }
            requestAnimationFrame(renderTrackingLoop);
        }
        requestAnimationFrame(renderTrackingLoop);

        // Map interaction triggers securely to prevent target breaking
        const mapInteractions = () => {
            const nodes = document.querySelectorAll('a, button, .btn, .project-card, .comp-item, .skill-badge, .movie-card, .music-node');
            nodes.forEach(el => {
                // Ensure duplicate structural triggers do not attach across updates
                el.removeAttribute('data-cursor-bound');
                el.setAttribute('data-cursor-bound', 'true');
                
                el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
                el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
            });
        };
        mapInteractions();
        
        // Track DOM insertion anomalies and rebuild node arrays if required
        const mutationObserver = new MutationObserver(() => mapInteractions());
        mutationObserver.observe(document.body, { childList: true, subtree: true });
    }

    /* =========================================================================
       2. NATIVE POLYPHONIC AUDIO SYNTHESIS STRUCTURE
       ========================================================================= */
    function playSynthesizedTone(frequency = 440, type = 'sine', duration = 0.1, maxGain = 0.05) {
        if (!audioCtx || audioCtx.state !== 'running') return;
        
        try {
            const osc = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            const filter = audioCtx.createBiquadFilter();
            
            osc.type = type;
            osc.frequency.value = frequency;
            
            // Structural processing routing block
            filter.type = 'lowpass';
            filter.frequency.value = 2500;
            
            osc.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            
            const now = audioCtx.currentTime;
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(maxGain, now + 0.02);
            gainNode.gain.exponentialRampToValueAtTime(0.00001, now + duration);
            
            osc.start(now);
            osc.stop(now + duration);
        } catch (error) {
            console.warn("Audio Context core processing anomaly suppressed:", error);
        }
    }

    // UI Sound Hover triggers
    document.querySelectorAll('.play-sound').forEach(el => {
        el.addEventListener('mouseenter', () => {
            const assignedFreq = el.getAttribute('data-freq') ? parseInt(el.getAttribute('data-freq')) : 480;
            playSynthesizedTone(assignedFreq, 'triangle', 0.08, 0.02);
        });
    });

    /* =========================================================================
       3. SYSTEM PHONIC DISCOGRAPHY MATRIX CORE
       ========================================================================= */
    const musicNodes = document.querySelectorAll('.music-node');
    const globalVisualizer = document.getElementById('global-visualizer');
    
    // Complete melodic synthesis tracks structured step-by-step
    const matrixTracks = {
        'aespa': [
            { f: 146.83, t: 'sawtooth', d: 0.15 }, // D3 base
            { f: 293.66, t: 'sine', d: 0.1 },     // D4
            { f: 349.23, t: 'sine', d: 0.1 },     // F4
            { f: 440.00, t: 'sine', d: 0.15 },    // A4
            { f: 587.33, t: 'square', d: 0.25 }   // D5 high progression
        ],
        'ive': [
            { f: 329.63, t: 'sine', d: 0.2 },     // E4
            { f: 392.00, t: 'sine', d: 0.2 },     // G4
            { f: 493.88, t: 'sine', d: 0.2 },     // B4
            { f: 587.33, t: 'triangle', d: 0.2 }, // D5
            { f: 783.99, t: 'sine', d: 0.4 }      // G5 resolution
        ],
        'txt': [
            { f: 261.63, t: 'triangle', d: 0.15 }, // C4
            { f: 329.63, t: 'triangle', d: 0.15 }, // E4
            { f: 392.00, t: 'sine', d: 0.15 },     // G4
            { f: 523.25, t: 'sine', d: 0.2 },      // C5
            { f: 659.25, t: 'sine', d: 0.3 }       // E5
        ],
        'treasure': [
            { f: 110.00, t: 'square', d: 0.15 },   // A2 hard punch
            { f: 220.00, t: 'sawtooth', d: 0.1 },  // A3
            { f: 440.00, t: 'triangle', d: 0.15 }, // A4
            { f: 392.00, t: 'sine', d: 0.1 },      // G4
            { f: 440.00, t: 'square', d: 0.3 }     // A4 hit
        ]
    };

    function executeSynthesizedTrack(artistKey) {
        initAudioContext();
        const scoreSequence = matrixTracks[artistKey];
        if (!scoreSequence) return;

        let accumulatedTime = 0;
        scoreSequence.forEach(note => {
            setTimeout(() => {
                playSynthesizedTone(note.f, note.t, note.d, 0.06);
            }, accumulatedTime);
            accumulatedTime += (note.d * 1000) + 40;
        });

        if (globalVisualizer) {
            globalVisualizer.classList.remove('inactive');
            setTimeout(() => {
                globalVisualizer.classList.add('inactive');
            }, accumulatedTime);
        }
    }

    musicNodes.forEach(node => {
        node.addEventListener('click', (e) => {
            e.stopPropagation();
            musicNodes.forEach(n => n.classList.remove('active'));
            node.classList.add('active');
            executeSynthesizedTrack(node.getAttribute('data-artist'));
        });
    });

    /* =========================================================================
       4. CINEMATIC OVERLAY PROCESSOR HOOKS
       ========================================================================= */
    const movieCards = document.querySelectorAll('.movie-card');
    movieCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const processingEffect = card.getAttribute('data-effect');
            document.body.classList.add(`effect-${processingEffect}`);
            
            // Map frequencies to simulate sound profiles
            if (processingEffect === 'from') {
                playSynthesizedTone(65.41, 'sawtooth', 0.8, 0.04); // Low C2 drone
            } else if (processingEffect === 'abigail') {
                playSynthesizedTone(185.00, 'square', 0.4, 0.03);  // Sharp F#3 chord component
            } else if (processingEffect === 'incantation') {
                playSynthesizedTone(92.50, 'sawtooth', 0.6, 0.05);  // Distortion simulator sound
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const processingEffect = card.getAttribute('data-effect');
            document.body.classList.remove(`effect-${processingEffect}`);
        });
    });

    /* =========================================================================
       5. HARDENED DIAGNOSTICS MINI-GAME CORE FRAMEWORK
       ========================================================================= */
    const initGameBtn = document.getElementById('init-game');
    const closeGameBtn = document.getElementById('close-game');
    const gameLayer = document.getElementById('game-layer');
    const gameArena = document.getElementById('game-arena');
    const scoreDisplay = document.getElementById('game-score');
    const timerDisplay = document.getElementById('game-timer');
    
    let activeScore = 0;
    let gameTimeRemaining = 15.0;
    let coreClockInterval = null;
    let dataPacketSpawnInterval = null;

    function spawnDataPacket() {
        if (activeScore >= 10 || gameTimeRemaining <= 0 || !gameArena) return;

        const packet = document.createElement('div');
        packet.classList.add('data-packet');
        packet.innerHTML = '&lt;/&gt;';
        
        // Isolate client placement processing dimensions securely
        const boundX = Math.max(gameArena.clientWidth - 50, 10);
        const boundY = Math.max(gameArena.clientHeight - 50, 10);
        
        packet.style.left = Math.floor(Math.random() * boundX) + 'px';
        packet.style.top = Math.floor(Math.random() * boundY) + 'px';
        
        packet.addEventListener('mousedown', (e) => {
            e.stopPropagation(); // Halt standard propagation bubbles
            e.preventDefault();
            
            activeScore++;
            if (scoreDisplay) scoreDisplay.textContent = activeScore;
            
            // Direct audio feedback routing
            playSynthesizedTone(1046.50, 'sine', 0.08, 0.06); // High C6 tracking pulse
            packet.remove();
            
            if (activeScore >= 10) {
                terminateDiagnosticProcess(true);
            }
        });

        gameArena.appendChild(packet);
        
        // Dynamic cleanup lifecycle step
        setTimeout(() => {
            if (gameArena && gameArena.contains(packet)) {
                packet.remove();
            }
        }, 1200);
    }

    function terminateDiagnosticProcess(isSuccessState) {
        clearInterval(coreClockInterval);
        clearInterval(dataPacketSpawnInterval);
        
        if (gameArena) gameArena.innerHTML = '';
        if (bgMusic) bgMusic.volume = 0.25;
        
        if (isSuccessState) {
            if (timerDisplay) {
                timerDisplay.innerHTML = '<span style="color:var(--accent-glow)">CORE DIAGNOSTICS VALIDATED. SECURITY PERIMETER HARDENED.</span>';
            }
            playSynthesizedTone(523.25, 'sine', 0.15, 0.05);
            setTimeout(() => playSynthesizedTone(783.99, 'sine', 0.15, 0.05), 100);
            setTimeout(() => playSynthesizedTone(1046.50, 'sine', 0.4, 0.05), 200);
        } else {
            if (timerDisplay) {
                timerDisplay.innerHTML = '<span style="color:#ff003c">DIAGNOSTIC CRITICAL TIMEOUT. COMPONENT BOUNDS OVERFLOW.</span>';
            }
            playSynthesizedTone(130.81, 'sawtooth', 0.6, 0.08); // Failure bass drop
        }
    }

    function shutDownGameEngine() {
        clearInterval(coreClockInterval);
        clearInterval(dataPacketSpawnInterval);
        
        if (gameArena) gameArena.innerHTML = '';
        if (gameLayer) gameLayer.classList.add('hidden');
        if (bgMusic) bgMusic.volume = 0.25;
        
        // Remove tracking lock flags gracefully
        document.body.classList.remove('cursor-hover');
        playSynthesizedTone(329.63, 'sine', 0.15, 0.03);
    }

    if (initGameBtn && gameLayer) {
        initGameBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            initAudioContext();
            
            activeScore = 0;
            gameTimeRemaining = 15.0;
            
            if (scoreDisplay) scoreDisplay.textContent = activeScore;
            if (timerDisplay) timerDisplay.textContent = `Time remaining: ${gameTimeRemaining.toFixed(1)}s`;
            
            if (gameArena) gameArena.innerHTML = '';
            gameLayer.classList.remove('hidden');
            
            if (bgMusic) bgMusic.volume = 0.05; // Drop background track for clear diagnostic signaling
            
            playSynthesizedTone(220, 'sawtooth', 0.3, 0.05);

            // Establish primary thread loop execution matrices
            coreClockInterval = setInterval(() => {
                gameTimeRemaining -= 0.1;
                if (gameTimeRemaining <= 0) {
                    gameTimeRemaining = 0;
                    if (timerDisplay) timerDisplay.textContent = `Time remaining: 0.0s`;
                    terminateDiagnosticProcess(false);
                } else {
                    if (timerDisplay && activeScore < 10) {
                        timerDisplay.textContent = `Time remaining: ${gameTimeRemaining.toFixed(1)}s`;
                    }
                }
            }, 100);

            dataPacketSpawnInterval = setInterval(spawnDataPacket, 750);
        });
    }

    // Absolute Exit Listeners (Ensures execution terminates instantly on exit actions)
    if (closeGameBtn) {
        closeGameBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            shutDownGameEngine();
        });
        closeGameBtn.addEventListener('mousedown', (e) => {
            e.stopPropagation();
        });
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (gameLayer && !gameLayer.classList.contains('hidden')) {
                shutDownGameEngine();
            }
        }
    });

    /* =========================================================================
       6. INTERSECTION OBSERVER REVEAL & 3D HARDWARE TRANSFORMS
       ========================================================================= */
    const revealElements = document.querySelectorAll('.reveal');
    const skillBars = document.querySelectorAll('.progress .bar');

    if ('IntersectionObserver' in window) {
        const structuralScrollObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    if (entry.target.classList.contains('skills-grid')) {
                        skillBars.forEach(bar => {
                            const parsedWidth = bar.getAttribute('style').match(/--w:\s*(.*)%/)[1];
                            if (parsedWidth) bar.style.width = parsedWidth + '%';
                        });
                    }
                    observer.unobserve(entry.target); 
                }
            });
        }, { threshold: 0.05, rootMargin: "0px 0px -30px 0px" });

        revealElements.forEach(el => structuralScrollObserver.observe(el));
    }

    // 3D Matrix Layer Card tilting processing
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const cardRect = card.getBoundingClientRect();
            const computeX = e.clientX - cardRect.left; 
            const computeY = e.clientY - cardRect.top;  
            const midX = cardRect.width / 2;
            const midY = cardRect.height / 2;
            const degX = ((computeY - midY) / midY) * -5; 
            const degY = ((computeX - midX) / midX) * 5;
            card.style.transform = `perspective(1000px) rotateX(${degX}deg) rotateY(${degY}deg) scale3d(1.015, 1.015, 1.015)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });

    // Core Typewriter execution layer logic
    const functionalTitles = ["System Analyst", "Project Manager", "Network Architecture Engineer"];
    const textTargetNode = document.getElementById('typewriter');
    
    if (textTargetNode) {
        let executionIndex = 0, characterStringIndex = 0, removalFlag = false;
        function processTypewriterCycle() {
            const targetString = functionalTitles[executionIndex];
            
            if (removalFlag) {
                textTargetNode.textContent = targetString.substring(0, characterStringIndex - 1);
                characterStringIndex--;
            } else {
                textTargetNode.textContent = targetString.substring(0, characterStringIndex + 1);
                characterStringIndex++;
            }

            let transitionInterval = removalFlag ? 35 : 95;
            if (!removalFlag && characterStringIndex === targetString.length) {
                transitionInterval = 1800; 
                removalFlag = true;
            } else if (removalFlag && characterStringIndex === 0) {
                removalFlag = false;
                executionIndex = (executionIndex + 1) % functionalTitles.length;
                transitionInterval = 350; 
            }
            setTimeout(processTypewriterCycle, transitionInterval);
        }
        setTimeout(processTypewriterCycle, 800);
    }

    // Secondary rendering fallback loops for Particle background
    const canvasElement = document.getElementById('particle-canvas');
    if (canvasElement) {
        const drawingCtx = canvasElement.getContext('2d');
        let arraySet = [];

        function adjustCanvasDisplayBounds() {
            canvasElement.width = window.innerWidth;
            canvasElement.height = window.innerHeight;
        }
        window.addEventListener('resize', adjustCanvasDisplayBounds);
        adjustCanvasDisplayBounds();

        class CoordinateNode {
            constructor() {
                this.x = Math.random() * canvasElement.width;
                this.y = Math.random() * canvasElement.height;
                this.nodeRadius = Math.random() * 1.8;
                this.vX = Math.random() * 0.4 - 0.2;
                this.vY = Math.random() * 0.4 - 0.2;
                this.colorValue = Math.random() > 0.45 ? 'rgba(0, 255, 204, 0.35)' : 'rgba(255, 0, 255, 0.18)';
            }
            updatePositionState() {
                this.x += this.vX;
                this.y += this.vY;
                if (this.x > canvasElement.width) this.x = 0;
                else if (this.x < 0) this.x = canvasElement.width;
                if (this.y > canvasElement.height) this.y = 0;
                else if (this.y < 0) this.y = canvasElement.height;
            }
            renderNodeFrame() {
                drawingCtx.fillStyle = this.colorValue;
                drawingCtx.beginPath();
                drawingCtx.arc(this.x, this.y, this.nodeRadius, 0, Math.PI * 2);
                drawingCtx.fill();
            }
        }

        function structureMatrixArray() {
            arraySet = [];
            let optimalDensityCount = (canvasElement.width * canvasElement.height) / 9500; 
            for (let idx = 0; idx < optimalDensityCount; idx++) {
                arraySet.push(new CoordinateNode());
            }
        }

        function executeCanvasRenderIteration() {
            drawingCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
            for (let idx = 0; idx < arraySet.length; idx++) {
                arraySet[idx].updatePositionState();
                arraySet[idx].renderNodeFrame();
            }
            requestAnimationFrame(executeCanvasRenderIteration);
        }
        structureMatrixArray();
        executeCanvasRenderIteration();
    }
});
