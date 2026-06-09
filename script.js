document.addEventListener('DOMContentLoaded', () => {
    
    document.getElementById('year').textContent = new Date().getFullYear();

    /* =========================================
       1. Custom Cyber Cursor Logic
       ========================================= */
    const cursor = document.querySelector('.cyber-cursor');
    const follower = document.querySelector('.cyber-cursor-follower');
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Instant cursor
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    // Smooth follower animation loop
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Hover state expansion for interactive elements
    const interactables = document.querySelectorAll('a, .btn, .project-card, .comp-item, .skill-badge');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    /* =========================================
       2. Procedural UI Audio Engine (Gamification)
       ========================================= */
    // Generates synth beeps natively in the browser
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    let audioCtx;

    function initAudio() {
        if (!audioCtx) {
            audioCtx = new AudioContext();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    }

    function playUIBeep(frequency = 440, type = 'sine', duration = 0.05, vol = 0.05) {
        if (!audioCtx) return;
        
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        oscillator.type = type;
        oscillator.frequency.value = frequency;
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.start();
        
        // Smooth fade out to prevent clicking sounds
        gainNode.gain.setValueAtTime(vol, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration);
        
        oscillator.stop(audioCtx.currentTime + duration);
    }

    // Initialize audio context on first user interaction (Browser security requirement)
    document.body.addEventListener('click', initAudio, { once: true });
    document.body.addEventListener('mousemove', initAudio, { once: true });

    // Bind sound effects to specific elements
    const soundElements = document.querySelectorAll('.play-sound');
    soundElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            // Read custom frequency from data attribute, or default to 500
            const freq = el.getAttribute('data-freq') ? parseInt(el.getAttribute('data-freq')) : 500;
            playUIBeep(freq, 'triangle', 0.1, 0.02);
        });
    });


    /* =========================================
       3. Scroll Reveal & Progress Bars
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
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    revealElements.forEach(el => revealOnScroll.observe(el));


    /* =========================================
       4. Typewriter Logic (Hero)
       ========================================= */
    const typeText = ["System Analyst", "Project Manager", "Creative Architect"];
    const typeElement = document.getElementById('typewriter');
    let textIndex = 0, charIndex = 0, isDeleting = false;

    function type() {
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
            speed = 2000; 
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typeText.length;
            speed = 400; 
        }
        setTimeout(type, speed);
    }
    setTimeout(type, 1000);

    /* =========================================
       5. 3D Magnetic Tilt Cards
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
});
