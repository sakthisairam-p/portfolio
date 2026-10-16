document.addEventListener('DOMContentLoaded', () => {
    // 1. Loading Screen
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('fade-out');
        }, 1500);
    });

    // 2. Custom Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Smooth outline animation
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Cursor hover effects
    const interactiveElements = document.querySelectorAll('a, button, .glass-card, input, textarea');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.width = '60px';
            cursorOutline.style.height = '60px';
            cursorOutline.style.borderColor = 'var(--primary-color)';
            cursorOutline.style.backgroundColor = 'rgba(0, 242, 254, 0.1)';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.borderColor = 'var(--primary-color)';
            cursorOutline.style.backgroundColor = 'transparent';
        });
    });

    // 3. Scroll Progress Bar & Dynamic Navbar Glass Effect
    const navbar = document.querySelector('.glass-nav');
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById('scroll-progress').style.width = scrolled + '%';

        // Toggle glassmorphism when scrolled down
        if (navbar) {
            if (window.scrollY > 40) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // 4. AI & ML Neural Network Simulation with Synaptic Signals & Data Flow
    const canvas = document.getElementById('ai-neural-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let nodes = [];
        let pulses = [];
        const mouse = { x: null, y: null, radius: 180 };

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initNodes();
        }

        class NeuralNode {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.7;
                this.vy = (Math.random() - 0.5) * 0.7;
                this.radius = Math.random() * 2.5 + 2;
                this.baseAlpha = Math.random() * 0.35 + 0.3;
                // AI layer type (Input, Hidden, Output node representation)
                this.type = Math.random() > 0.85 ? 'hub' : 'standard';
                if (this.type === 'hub') {
                    this.radius = Math.random() * 2 + 4.5;
                }
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;

                // Mouse interaction - gentle neural connection attraction
                if (mouse.x !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const dist = Math.hypot(dx, dy);
                    if (dist < mouse.radius) {
                        const force = (mouse.radius - dist) / mouse.radius;
                        this.x += (dx / dist) * force * 1.5;
                        this.y += (dy / dist) * force * 1.5;
                    }
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                if (this.type === 'hub') {
                    // Hub neuron (Key activation weight node)
                    ctx.fillStyle = 'rgba(255, 107, 53, 0.95)';
                    ctx.fill();
                    // Outer synapse ring
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.radius + 3.5, 0, Math.PI * 2);
                    ctx.strokeStyle = 'rgba(255, 107, 53, 0.6)';
                    ctx.lineWidth = 1.2;
                    ctx.stroke();
                } else {
                    ctx.fillStyle = `rgba(226, 232, 240, ${this.baseAlpha * 0.85})`;
                    ctx.fill();
                }
            }
        }

        class SynapticPulse {
            constructor(from, to) {
                this.from = from;
                this.to = to;
                this.progress = 0;
                this.speed = Math.random() * 0.02 + 0.012; // Pulse transfer velocity
            }

            update() {
                this.progress += this.speed;
                return this.progress < 1;
            }

            draw() {
                const currentX = this.from.x + (this.to.x - this.from.x) * this.progress;
                const currentY = this.from.y + (this.to.y - this.from.y) * this.progress;

                ctx.beginPath();
                ctx.arc(currentX, currentY, 3, 0, Math.PI * 2);
                ctx.fillStyle = '#FF8F5A'; // Luminous synaptic signal
                ctx.shadowColor = '#FF6B35';
                ctx.shadowBlur = 12;
                ctx.fill();
                ctx.shadowBlur = 0; // Reset
            }
        }

        function initNodes() {
            nodes = [];
            // Node density calculated based on screen size
            const nodeCount = Math.floor((width * height) / 14000);
            for (let i = 0; i < Math.min(nodeCount, 85); i++) {
                nodes.push(new NeuralNode());
            }
        }

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });
        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        // Trigger synaptic data pulses between connected neurons
        setInterval(() => {
            if (nodes.length < 2) return;
            const nodeA = nodes[Math.floor(Math.random() * nodes.length)];
            let closest = null;
            let minDist = 160;

            for (let nodeB of nodes) {
                if (nodeA === nodeB) continue;
                const d = Math.hypot(nodeA.x - nodeB.x, nodeA.y - nodeB.y);
                if (d < minDist) {
                    closest = nodeB;
                    minDist = d;
                }
            }

            if (closest && pulses.length < 14) {
                pulses.push(new SynapticPulse(nodeA, closest));
            }
        }, 320);

        function animate() {
            ctx.clearRect(0, 0, width, height);

            // Connect neural synapses with dynamic weights
            const maxDistance = 150;
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dist = Math.hypot(dx, dy);

                    if (dist < maxDistance) {
                        const alpha = (1 - dist / maxDistance) * 0.28;
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);

                        // Highlight links connected to Hub nodes
                        if (nodes[i].type === 'hub' || nodes[j].type === 'hub') {
                            ctx.strokeStyle = `rgba(255, 107, 53, ${alpha * 1.8})`;
                            ctx.lineWidth = 1.3;
                        } else {
                            ctx.strokeStyle = `rgba(148, 163, 184, ${alpha})`;
                            ctx.lineWidth = 0.8;
                        }
                        ctx.stroke();
                    }
                }
            }

            // Draw and update Nodes
            nodes.forEach(node => {
                node.update();
                node.draw();
            });

            // Update & Draw Synaptic Signals (data flow packets)
            pulses = pulses.filter(pulse => {
                const alive = pulse.update();
                if (alive) pulse.draw();
                return alive;
            });

            requestAnimationFrame(animate);
        }

        resize();
        animate();
    }

    // 5. Typed.js Initialization (Aligned with core roles)
    new Typed('#typed-text', {
        strings: [
            'Machine Learning Engineer',
            'Full Stack Developer',
            'Data Analyst',
            'Web Development Specialist'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true
    });

    // 6. AOS Animation Initialization (Polished & dynamic per section)
    AOS.init({
        duration: 750,
        easing: 'ease-out-cubic',
        once: false,
        mirror: true,
        offset: 100
    });

    // 7. Smooth Scroll for Navbar & Side-Nav Links
    const navLinks = document.querySelectorAll('.nav-link, .side-nav-dot, .scroll-down, .btn-glow[href^="#"]');
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                // Close mobile menu if open
                const navbarCollapse = document.getElementById('navbarNav');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) bsCollapse.hide();
                }

                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 7.1 Scrollspy: Highlight active links on scroll
    const sections = document.querySelectorAll('section');
    const sideDots = document.querySelectorAll('.side-nav-dot');
    const mainNavLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        mainNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });

        sideDots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('href').includes(current)) {
                dot.classList.add('active');
            }
        });
    });

    // 9. Navbar scroll effect & Back to Top
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.glass-nav');
        if (window.scrollY > 50) {
            nav.style.padding = '12px 0';
            nav.style.background = 'rgba(10, 10, 12, 0.94)';
            nav.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.8)';
            if(backToTop) backToTop.classList.add('show');
        } else {
            nav.style.padding = '16px 0';
            nav.style.background = 'rgba(10, 10, 12, 0.75)';
            nav.style.boxShadow = 'none';
            if(backToTop) backToTop.classList.remove('show');
        }
    });

    // 10. Interactive Mouse Wheel & Drag on Skills Marquees (Scroll accelerates Right-to-Left)
    const marqueeWrappers = document.querySelectorAll('.skills-marquee-wrapper');
    marqueeWrappers.forEach(wrapper => {
        const tracks = wrapper.querySelectorAll('.marquee-track');
        let currentOffset = 0;
        let isHovered = false;

        wrapper.addEventListener('mouseenter', () => {
            isHovered = true;
        });

        wrapper.addEventListener('mouseleave', () => {
            isHovered = false;
        });

        wrapper.addEventListener('wheel', (e) => {
            e.preventDefault();
            const delta = e.deltaY || e.deltaX;
            currentOffset += delta * 1.5;

            tracks.forEach((track, idx) => {
                const speedMultiplier = idx === 0 ? 1 : 1.25;
                track.style.animationPlayState = 'paused';
                track.style.transform = `translateX(${-((Math.abs(currentOffset) * speedMultiplier) % 2000)}px)`;
            });

            clearTimeout(wrapper._scrollTimeout);
            wrapper._scrollTimeout = setTimeout(() => {
                tracks.forEach(track => {
                    if (!isHovered) {
                        track.style.animationPlayState = 'running';
                    }
                });
            }, 600);
        }, { passive: false });
    });

    // 11. Mobile Tap-to-Flip Support for Achievement Cards
    const flipCards = document.querySelectorAll('.flip-card-container');
    flipCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });

    // 12. Contact Form AJAX Submission to Email (FormSubmit)
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('contact-submit-btn');
    const formStatus = document.getElementById('form-status-msg');

    if (contactForm && submitBtn) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const originalBtnContent = submitBtn.innerHTML;

            // Loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>Sending...</span> <span class="spinner-border spinner-border-sm ms-2" role="status" aria-hidden="true"></span>`;
            if (formStatus) {
                formStatus.style.display = 'none';
                formStatus.className = 'col-12';
            }

            try {
                const formData = new FormData(contactForm);
                const response = await fetch('https://formsubmit.co/ajax/sairamsakthi8@gmail.com', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json'
                    },
                    body: formData
                });

                const data = await response.json();

                if (response.ok) {
                    if (formStatus) {
                        formStatus.style.display = 'block';
                        formStatus.className = 'col-12 text-success small font-mono p-2 rounded bg-success bg-opacity-10 border border-success';
                        formStatus.innerHTML = '<i class="bi bi-check-circle-fill me-1"></i> Message sent successfully! I will get back to you soon.';
                    }
                    contactForm.reset();
                } else {
                    throw new Error(data.message || 'Submission failed');
                }
            } catch (err) {
                if (formStatus) {
                    formStatus.style.display = 'block';
                    formStatus.className = 'col-12 text-danger small font-mono p-2 rounded bg-danger bg-opacity-10 border border-danger';
                    formStatus.innerHTML = '<i class="bi bi-exclamation-triangle-fill me-1"></i> Failed to send message. Please email directly to sairamsakthi8@gmail.com.';
                }
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;
            }
        });
    }
});
