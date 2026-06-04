/* ==========================================================================
   INTERACTIVE JAVASCRIPT - CYBER SECURITY PORTFOLIO (KRISH ATTRI)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 0. High-Tech Page Skeleton Loader Trigger
    document.body.classList.add('loading-active');
    const skeletonOverlay = document.getElementById('skeleton-loader-overlay');
    const skeletonPercent = document.getElementById('skeleton-percent');
    
    if (skeletonOverlay && skeletonPercent) {
        let loadPercent = 0;
        const loadDuration = 900; // 0.9 second loading time
        const intervalTime = 20;
        const increment = 100 / (loadDuration / intervalTime);
        
        const loadTimer = setInterval(() => {
            loadPercent += increment;
            if (loadPercent >= 100) {
                loadPercent = 100;
                clearInterval(loadTimer);
                setTimeout(() => {
                    skeletonOverlay.classList.add('fade-out');
                    document.body.classList.remove('loading-active');
                }, 150);
            }
            skeletonPercent.textContent = Math.floor(loadPercent);
        }, intervalTime);
    }

    // 1. Initialize EmailJS
    emailjs.init({
        publicKey: "oUCBjRhJ70BE_t89o",
    });

    // 2. Mouse Tracker Coordinate System for Cards (Glow Effect)
    const cards = document.querySelectorAll('.card, .project-case-card, .premium-build-card, .beyond-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // 3. Mobile Menu Toggle Logic
    const mobileToggle = document.getElementById('mobile-toggle');
    const premiumNav = document.querySelector('.premium-nav');

    if (mobileToggle && premiumNav) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            premiumNav.classList.toggle('mobile-active');
        });

        // Close mobile nav when clicking a link
        const navLinks = document.querySelectorAll('.nav-links-center a, .get-in-touch-pill');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                premiumNav.classList.remove('mobile-active');
            });
        });
    }

    // 4. Sticky Navbar & Active Section Link tracking (Scrollspy)
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links-center a');

    window.addEventListener('scroll', () => {
        // Sticky Header shrink
        if (window.scrollY > 50) {
            premiumNav.classList.add('scrolled');
        } else {
            premiumNav.classList.remove('scrolled');
        }

        // Active Section Scrollspy
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // 5. Matrix Hex/Binary Text Scrambler Animation (Headers & Links)
    const scrambleElements = document.querySelectorAll('[data-scramble]');
    
    scrambleElements.forEach(element => {
        const originalText = element.textContent;
        const numberPrefixMatch = originalText.match(/^\d+\.\s*/);
        const prefix = numberPrefixMatch ? numberPrefixMatch[0] : '';
        const scrambableText = originalText.substring(prefix.length);
        
        let intervalId = null;
        
        element.addEventListener('mouseenter', () => {
            let iteration = 0;
            clearInterval(intervalId);
            
            const chars = "0123456789ABCDEF$#@%&*?_[]{}";
            
            intervalId = setInterval(() => {
                element.innerHTML = prefix + scrambableText.split("")
                    .map((char, index) => {
                        if (char === " ") return " ";
                        if (index < iteration) {
                            return scrambableText[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("");
                
                if (iteration >= scrambableText.length) {
                    clearInterval(intervalId);
                }
                
                iteration += 1 / 3;
            }, 30);
        });

        element.addEventListener('mouseleave', () => {
            clearInterval(intervalId);
            element.textContent = originalText;
        });
    });

    // 6. Dynamic Terminal Text Switcher (Typewriter Effect)
    const switcherText = document.getElementById('switcher-text');
    const words = [
        "Applied Cryptography Tooling",
        "QA & Edge-Case Audits",
        "Static Malware Dissection",
        "Secure REST Gateways"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function typeEffect() {
        if (!switcherText) return;
        
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            switcherText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 30;
        } else {
            switcherText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingSpeed = 2200;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 400;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();

    // 7. Password Strength Analyzer Widget
    const passInput = document.getElementById('pass-analyzer-input');
    const passGauge = document.getElementById('pass-gauge');
    const passEntropyVal = document.getElementById('pass-entropy');
    const passCrackVal = document.getElementById('pass-crack-time');

    if (passInput && passGauge && passEntropyVal && passCrackVal) {
        passInput.addEventListener('input', () => {
            const password = passInput.value;
            if (!password) {
                passGauge.style.width = '0%';
                passEntropyVal.textContent = '0.00';
                passCrackVal.textContent = '0 sec';
                return;
            }

            let poolSize = 0;
            if (/[a-z]/.test(password)) poolSize += 26;
            if (/[A-Z]/.test(password)) poolSize += 26;
            if (/[0-9]/.test(password)) poolSize += 10;
            if (/[^a-zA-Z0-9]/.test(password)) poolSize += 33;

            const length = password.length;
            const entropy = length * Math.log2(poolSize);

            passEntropyVal.textContent = entropy.toFixed(2);

            let color = '#FF3366'; // Weak
            let width = '25%';
            
            if (entropy >= 28 && entropy < 52) {
                color = '#FF5722'; // Moderate
                width = '55%';
            } else if (entropy >= 52) {
                color = '#00FF88'; // Strong
                width = '100%';
            }

            passGauge.style.width = width;
            passGauge.style.backgroundColor = color;

            const combinations = Math.pow(2, entropy);
            const guessesPerSec = 1e9;
            const seconds = combinations / guessesPerSec;

            passCrackVal.textContent = formatCrackTime(seconds);
        });

        function formatCrackTime(seconds) {
            if (seconds < 1) return 'Instant (< 0.1s)';
            if (seconds < 60) return `${seconds.toFixed(1)} sec`;
            
            const minutes = seconds / 60;
            if (minutes < 60) return `${minutes.toFixed(1)} min`;
            
            const hours = minutes / 60;
            if (hours < 24) return `${hours.toFixed(1)} hrs`;
            
            const days = hours / 24;
            if (days < 365) return `${days.toFixed(0)} days`;
            
            const years = days / 365;
            if (years < 1000) return `${years.toFixed(0)} years`;
            if (years < 1e6) return `${(years / 1000).toFixed(0)}k years`;
            
            return 'Centuries (10k+ years)';
        }
    }

    // 8. Cryptographic Stream Feed Simulator (Text Encryption Card UI & Hero Console)
    const cryptoStreamBox = document.getElementById('crypto-stream-box');
    if (cryptoStreamBox) {
        const streamLogs = [
            "Initializing AES-GCM-256 block ciphers.",
            "Thread pool syncing RSA primes, e=65537.",
            "Generating crypt keys in background daemon thread...",
            "Encrypting stream payload segment [OK].",
            "Checking SHA-256 message integrity values...",
            "Ciphers block: 0x8f2d59ca18bb... resolved.",
            "Thread execution completed successfully."
        ];
        let logIndex = 0;

        setInterval(() => {
            const currentLog = streamLogs[logIndex];
            cryptoStreamBox.innerHTML += `<div class="stream-line">> ${currentLog}</div>`;
            cryptoStreamBox.scrollTop = cryptoStreamBox.scrollHeight;
            
            logIndex = (logIndex + 1) % streamLogs.length;
            if (logIndex === 0) {
                setTimeout(() => {
                    cryptoStreamBox.innerHTML = "[SYS] Decoupled thread refreshed. Standby.";
                }, 2000);
            }
        }, 3000);
    }

    const heroStreamBox = document.getElementById('hero-stream-box');
    if (heroStreamBox) {
        const heroLogs = [
            "Scanning packet threat boundary... [OK]",
            "Handshake signature validation: COMPLIANT",
            "Initializing secure daemon. PID: 8192",
            "Auditing heap memory offsets... no leaks",
            "Active proxy tunnels: vit_bhopal_node_84a",
            "Log stream hashes: SHA-256 MATCHED",
            "Applied cryptography metrics: 100% safe"
        ];
        let heroLogIndex = 0;

        setInterval(() => {
            const currentHeroLog = heroLogs[heroLogIndex];
            heroStreamBox.innerHTML += `<div class="stream-line text-cyan">> ${currentHeroLog}</div>`;
            
            // Keep maximum 4 lines visible to prevent overflow clutter
            const lines = heroStreamBox.getElementsByClassName('stream-line');
            if (lines.length > 4) {
                heroStreamBox.removeChild(lines[0]);
            }
            heroStreamBox.scrollTop = heroStreamBox.scrollHeight;
            
            heroLogIndex = (heroLogIndex + 1) % heroLogs.length;
        }, 2500);
    }

    // 9. Interactive Canvas Particles Network
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const maxParticles = window.innerWidth < 768 ? 40 : 80;
        const maxDistance = 120;
        
        let mouse = {
            x: null,
            y: null,
            radius: 140
        };

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        window.addEventListener('mouseout', () => {
            mouse.x = null;
            mouse.y = null;
        });

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.4;
                this.vy = (Math.random() - 0.5) * 0.4;
                this.radius = Math.random() * 2 + 1;
                this.color = Math.random() > 0.4 ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 229, 255, 0.35)';
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            update() {
                if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
                if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
                
                this.x += this.vx;
                this.y += this.vy;

                if (mouse.x != null && mouse.y != null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist < mouse.radius) {
                        const force = (mouse.radius - dist) / mouse.radius;
                        this.x -= dx * force * 0.02;
                        this.y -= dy * force * 0.02;
                    }
                }
            }
        }

        function initParticles() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particles = [];
            for (let i = 0; i < maxParticles; i++) {
                particles.push(new Particle());
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxDistance) {
                        const alpha = (maxDistance - dist) / maxDistance * 0.12;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        
                        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }

                if (mouse.x !== null && mouse.y !== null) {
                    const dx = particles[i].x - mouse.x;
                    const dy = particles[i].y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < mouse.radius) {
                        const alpha = (mouse.radius - dist) / mouse.radius * 0.15;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(animateParticles);
        }

        window.addEventListener('resize', () => {
            initParticles();
        });

        initParticles();
        animateParticles();
    }

    // 10. REAL-WORLD WORKING EMAILJS CONTACT FORM
    const contactForm = document.getElementById('portfolio-contact-form');
    const successModal = document.getElementById('success-modal');
    const errorModal = document.getElementById('error-modal');
    const errorMsgSpan = document.getElementById('error-modal-msg');
    
    const closeModal = document.getElementById('close-modal');
    const closeErrorModal = document.getElementById('close-error-modal');
    const submitBtn = contactForm ? contactForm.querySelector('.btn-submit') : null;

    if (contactForm && successModal && errorModal && submitBtn) {
        const formStatus = document.querySelector('.form-status');
        const submitText = submitBtn.querySelector('span');

        // Form Input Focus Scramble Effects
        const formInputs = contactForm.querySelectorAll('.form-group input, .form-group textarea');
        formInputs.forEach(input => {
            const label = input.parentNode.querySelector('label');
            if (!label) return;
            const originalText = label.textContent;
            let scrambleInterval = null;

            input.addEventListener('focus', () => {
                let iteration = 0;
                clearInterval(scrambleInterval);
                
                const chars = "0101011001100100SECUREPAYLOADTRANSMIT";
                
                scrambleInterval = setInterval(() => {
                    label.innerHTML = originalText.split("")
                        .map((char, index) => {
                            if (char === " ") return " ";
                            if (index < iteration) {
                                return originalText[index];
                            }
                            return chars[Math.floor(Math.random() * chars.length)];
                        })
                        .join("");
                    
                    if (iteration >= originalText.length) {
                        clearInterval(scrambleInterval);
                        label.textContent = originalText;
                    }
                    
                    iteration += 1 / 2;
                }, 25);
            });
        });

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('form-name').value.trim();
            const email = document.getElementById('form-email').value.trim();
            const subject = document.getElementById('form-subject').value.trim();
            const message = document.getElementById('form-message').value.trim();

            if (!name || !email || !subject || !message) return;

            submitBtn.disabled = true;
            formStatus.textContent = 'ROUTE: ENCRYPTING...';
            formStatus.style.color = 'var(--accent-orange)';
            submitText.textContent = 'Encrypting Message Payload...';

            await new Promise(r => setTimeout(r, 1000));
            
            formStatus.textContent = 'ROUTE: TRANSMITTING...';
            formStatus.style.color = 'var(--accent-cyan)';
            submitText.textContent = 'Transiting Packet Node...';

            try {
                const result = await emailjs.sendForm('service_krish', 'template_xm0mjeb', contactForm);

                if (result.status === 200 || result.text === 'OK') {
                    successModal.classList.add('active');
                    contactForm.reset();
                } else {
                    errorMsgSpan.textContent = `[✗] Gateway response: ${result.text}`;
                    errorModal.classList.add('active');
                }
            } catch (err) {
                console.error("EmailJS Gateway Error: ", err);
                errorMsgSpan.textContent = `[✗] SSL gateway error. ${err.message || 'Verification failed.'}`;
                errorModal.classList.add('active');
            } finally {
                resetSubmitButtonState();
            }
        });

        function resetSubmitButtonState() {
            submitBtn.disabled = false;
            formStatus.textContent = 'ROUTE: READY';
            formStatus.style.color = 'var(--accent-green)';
            submitText.textContent = 'Transit Message';
        }

        if (closeModal) {
            closeModal.addEventListener('click', () => {
                successModal.classList.remove('active');
            });
        }
        if (closeErrorModal) {
            closeErrorModal.addEventListener('click', () => {
                errorModal.classList.remove('active');
            });
        }

        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) successModal.classList.remove('active');
        });
        errorModal.addEventListener('click', (e) => {
            if (e.target === errorModal) errorModal.classList.remove('active');
        });
    }

    // 10.5 Project Video Modal Player Logic
    const videoModal = document.getElementById('video-modal');
    const closeVideoModal = document.getElementById('close-video-modal');
    const projectVideo = document.getElementById('project-demo-video');
    const videoModalTitle = document.getElementById('video-modal-title');
    const watchDemoButtons = document.querySelectorAll('.btn-watch-demo');

    if (videoModal && projectVideo && watchDemoButtons) {
        watchDemoButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const videoSrc = btn.getAttribute('data-video');
                const videoTitle = btn.getAttribute('data-title') || 'PROJECT_DEMO_STREAM';
                
                if (videoSrc) {
                    if (videoModalTitle) {
                        videoModalTitle.textContent = `STREAMING: ${videoTitle}`;
                    }
                    projectVideo.src = videoSrc;
                    projectVideo.load();
                    projectVideo.play().catch(err => {
                        console.log("Autoplay blocked or video loading failed:", err);
                    });
                    videoModal.classList.add('active');
                }
            });
        });

        const closeVideoPlayer = () => {
            projectVideo.pause();
            projectVideo.src = '';
            videoModal.classList.remove('active');
        };

        if (closeVideoModal) {
            closeVideoModal.addEventListener('click', closeVideoPlayer);
        }

        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                closeVideoPlayer();
            }
        });
    }

    // 11. Senior Developer Scroll Reveal Slide-ups Observer
    const revealElements = document.querySelectorAll(
        '.project-case-card, .premium-build-card, .premium-timeline-entry, .premium-process-step, .beyond-card, .achievement-bubble'
    );
    
    // Add scroll-reveal class programmatically
    revealElements.forEach(el => el.classList.add('scroll-reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px"
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // 12. Hero Portrait Pop-out & Greeting Dispenser (Triggered on hover/mouseenter & click)
    const portraitWrap = document.querySelector('.hero-portrait-wrap');
    if (portraitWrap) {
        let lastGreetTime = 0;
        const cooldown = 15000; // 15 seconds cooldown to prevent spamming

        const triggerGreeting = () => {
            const now = Date.now();
            if (now - lastGreetTime < cooldown) return;
            lastGreetTime = now;

            showToast("System Greeting: Welcome to my secure space! I'm Krish Attri, a Cybersecurity Engineer & Defensive Developer. Thanks for visiting my profile!");
            
            // Log to hero console stream
            const heroStreamBox = document.getElementById('hero-stream-box');
            if (heroStreamBox) {
                heroStreamBox.innerHTML += `<div class="stream-line text-green">> System greeting: DISPATCHED [OK]</div>`;
                const lines = heroStreamBox.getElementsByClassName('stream-line');
                if (lines.length > 4) {
                    heroStreamBox.removeChild(lines[0]);
                }
                heroStreamBox.scrollTop = heroStreamBox.scrollHeight;
            }
        };

        portraitWrap.addEventListener('mouseenter', triggerGreeting);
        portraitWrap.addEventListener('click', triggerGreeting);
    }

    function showToast(message) {
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container';
            document.body.appendChild(toastContainer);
        }

        const toast = document.createElement('div');
        toast.className = 'toast-message';
        toast.innerHTML = `
            <span class="toast-icon">✉</span>
            <div class="toast-text">${message}</div>
        `;
        
        toastContainer.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 50);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 500);
        }, 4000);
    }

    // 13. High-Tech Blog Article Modal Asynchronous Loader
    const blogModal = document.getElementById('blog-modal');
    const closeBlogModal = document.getElementById('close-blog-modal');
    const blogModalArticle = document.getElementById('blog-modal-article');
    const blogModalTitle = document.getElementById('blog-modal-title');
    const blogModalLoader = document.querySelector('.blog-modal-loader');
    const blogLinks = document.querySelectorAll('.btn-read-blog');

    if (blogModal && blogModalArticle && blogModalLoader && blogLinks) {
        blogLinks.forEach(link => {
            link.addEventListener('click', async (e) => {
                e.preventDefault();
                
                const url = link.getAttribute('href');
                const title = link.getAttribute('data-title') || 'ARTICLE_DECRYPT';
                
                if (!url) return;
                
                // Set modal title and show modal + loader
                if (blogModalTitle) {
                    blogModalTitle.textContent = `SYS_DECRYPT // ACCESSING: ${title.toUpperCase()}...`;
                }
                blogModalLoader.classList.remove('hidden');
                blogModal.classList.add('active');
                
                // Clear old content
                blogModalArticle.innerHTML = '';
                
                // Keep track of start time for artificial high-tech sweep delay (min 1000ms)
                const startTime = Date.now();
                
                try {
                    const response = await fetch(url);
                    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                    
                    const htmlText = await response.text();
                    
                    // Parse response HTML
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(htmlText, 'text/html');
                    
                    // Extract article content and header
                    const articleHeader = doc.querySelector('.blog-header');
                    const articleContent = doc.querySelector('.blog-content');
                    
                    if (articleHeader && articleContent) {
                        // Create containers and inject clean clone contents
                        const headerClone = articleHeader.cloneNode(true);
                        const contentClone = articleContent.cloneNode(true);
                        
                        blogModalArticle.appendChild(headerClone);
                        blogModalArticle.appendChild(contentClone);
                    } else {
                        // Fallback: try parsing general article or whole body
                        const articleElem = doc.querySelector('article');
                        if (articleElem) {
                            blogModalArticle.appendChild(articleElem.cloneNode(true));
                        } else {
                            blogModalArticle.textContent = 'Decryption failed: Structural nodes not found.';
                        }
                    }
                    
                    // Update header title to success
                    if (blogModalTitle) {
                        blogModalTitle.textContent = `DECRYPT_SUCCESS // SECURE_ARCHIVE: ${title.toUpperCase()}`;
                    }
                    
                } catch (error) {
                    console.error("Archive fetch error:", error);
                    blogModalArticle.innerHTML = `
                        <div class="font-code text-red" style="padding: 20px 0;">
                            <p>[✗] DECRYPTION RUNTIME FAILURE.</p>
                            <p>[✗] Error details: ${error.message}</p>
                            <p>[!] Please fallback to direct access: <a href="${url}" target="_blank" style="color: var(--accent-cyan); text-decoration: underline;">Open direct link</a></p>
                        </div>
                    `;
                    if (blogModalTitle) {
                        blogModalTitle.textContent = `SYS_ALERT // ACCESS_DENIED`;
                    }
                } finally {
                    // Hide loader after loading is complete and minimum duration elapsed (1000ms)
                    const elapsedTime = Date.now() - startTime;
                    const remainingTime = Math.max(0, 1000 - elapsedTime);
                    
                    setTimeout(() => {
                        blogModalLoader.classList.add('hidden');
                    }, remainingTime);
                }
            });
        });
        
        const closeBlogPlayer = () => {
            blogModal.classList.remove('active');
            // Safely reset content after fade animation completes
            setTimeout(() => {
                blogModalArticle.innerHTML = '';
                if (blogModalTitle) {
                    blogModalTitle.textContent = 'SYS_DECRYPT // ACCESSING ARCHIVE...';
                }
            }, 300);
        };
        
        if (closeBlogModal) {
            closeBlogModal.addEventListener('click', closeBlogPlayer);
        }
        
        blogModal.addEventListener('click', (e) => {
            if (e.target === blogModal) {
                closeBlogPlayer();
            }
        });
    }
});
