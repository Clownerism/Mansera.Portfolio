document.addEventListener('DOMContentLoaded', () => {
    
    // Set Current Year in Footer
    document.getElementById('year').textContent = new Date().getFullYear();

    /* =========================================
       1. Intersection Observer (Scroll Reveal)
       ========================================= */
    const revealElements = document.querySelectorAll('.reveal');
    const skillBars = document.querySelectorAll('.progress .bar');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            // Add active class to fade/slide in
            entry.target.classList.add('active');
            
            // Special trigger for skill bars to animate width
            if (entry.target.classList.contains('skills-grid')) {
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('style').match(/--w:\s*(.*)/)[1];
                    bar.style.width = width;
                });
            }
            
            observer.unobserve(entry.target); 
        });
    }, revealOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));


    /* =========================================
       2. Dynamic Typing Effect (Hero)
       ========================================= */
    // Updated strings for System Analyst & Project Manager
    const typeText = ["System Analyst", "Project Manager", "Software Engineer"];
    const typeElement = document.getElementById('typewriter');
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentString = typeText[textIndex];
        
        if (isDeleting) {
            typeElement.textContent = currentString.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; 
        } else {
            typeElement.textContent = currentString.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150; 
        }

        if (!isDeleting && charIndex === currentString.length) {
            typingSpeed = 2000; 
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typeText.length;
            typingSpeed = 500; 
        }

        setTimeout(type, typingSpeed);
    }
    
    setTimeout(type, 1000);


    /* =========================================
       3. Vanilla JS 3D Tilt Effect
       ========================================= */
    const tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;  
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -5; 
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            card.style.transition = "transform 0.1s ease"; 
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.transition = "transform 0.5s ease"; 
        });
    });

});
