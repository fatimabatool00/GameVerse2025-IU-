
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Dark Mode Toggle
    const themeToggle = document.getElementById('themeToggle');
    const body = document.documentElement;

    themeToggle.addEventListener('click', () => {
        const isDark = body.getAttribute('data-theme') === 'dark';
        body.setAttribute('data-theme', isDark ? 'light' : 'dark');
        themeToggle.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    });

    // Countdown Timer (restructured)
    const countdown = () => {
        const eventDate = new Date('May 23, 2025 00:00:00').getTime();
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = eventDate - now;

            if (distance < 0) {
                clearInterval(timer);
                document.getElementById('countdown').innerHTML = "EVENT STARTED!";
                return;
            }

            const days = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0');
            const hours = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
            const minutes = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
            const seconds = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0');

            document.getElementById('countdown').innerHTML = `
                <div class="countdown-numbers">${days}:${hours}:${minutes}:${seconds}</div>
                <div class="countdown-labels">days&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hrs&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mins&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sec</div>
            `;
        }, 1000);
    };

    countdown();

    // Load Games Dynamically
    const gameGrid = document.querySelector('.game-grid');
    const games = [
        {
            title: 'PUBG Mobile',
            mode: '4v4 TDM',
            prize: 'PKR 100,000',
            image: 'assets/images/pubg.jpg'
        },
        {
            title: 'COD: Black Ops 6',
            mode: '5v5 Search & Destroy',
            prize: 'PKR 120,000',
            image: 'assets/images/cod.jpg'
        },
        {
            title: 'FIFA 25',
            mode: '1v1 Elimination',
            prize: 'PKR 80,000',
            image: 'assets/images/fifa.jpg'
        }
    ];

    games.forEach(game => {
        const card = document.createElement('div');
        card.classList.add('game-card');
    
        // Create game-specific URLs (use lowercase, no spaces)
        const gameLink = game.title.toLowerCase().replace(/[^a-z0-9]/g, '') + '.html';
    
        card.innerHTML = `
            <a href="${gameLink}" class="game-link">
                <img src="${game.image}" alt="${game.title}" style="width:100%; border-radius: 10px;">
                <h3>${game.title}</h3>
                <p><strong>Mode:</strong> ${game.mode}</p>
                <p><strong>Prize:</strong> ${game.prize}</p>
            </a>
        `;
        gameGrid.appendChild(card);
    });
    
    
        // Registration Form Toggle
        const toggleButtons = document.querySelectorAll('.toggle-btn');
        const teamForm = document.getElementById('teamForm');
        const soloForm = document.getElementById('soloForm');
    
        toggleButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                toggleButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
    
                if (btn.dataset.form === 'team') {
                    teamForm.classList.add('active');
                    soloForm.classList.remove('active');
                } else {
                    teamForm.classList.remove('active');
                    soloForm.classList.add('active');
                }
            });
        });
    
        // Game selection dynamic input fields for Team Registration
        const gameSelect = document.getElementById('gameSelect');
        const membersDiv = document.querySelector('.members');
        
        gameSelect.addEventListener('change', () => {
            // Clear existing member input fields
            membersDiv.innerHTML = '';
    
            // Add member fields based on the selected game
            if (gameSelect.value === 'pubg') {
                // Add 4 members for PUBG Mobile
                for (let i = 1; i <= 4; i++) {
                    const inputField = document.createElement('input');
                    inputField.type = 'text';
                    inputField.placeholder = `Member ${i}`;
                    inputField.required = i === 1; // First member is required
                    membersDiv.appendChild(inputField);
                }
            } else if (gameSelect.value === 'cod') {
                // Add 5 members for Call of Duty
                for (let i = 1; i <= 5; i++) {
                    const inputField = document.createElement('input');
                    inputField.type = 'text';
                    inputField.placeholder = `Member ${i}`;
                    inputField.required = i === 1; // First member is required
                    membersDiv.appendChild(inputField);
                }
            }
        });
   
    
    
    // FAQ Section
    const faqData = [
        {
            question: "Can I participate in more than one game?",
            answer: "No, each participant can only register for one game category."
        },
        {
            question: "Is there a registration fee?",
            answer: "No, registration for GameVerse 2025 is completely free!"
        },
        {
            question: "Do I need to bring my own gear?",
            answer: "Basic equipment will be provided, but you can bring personal peripherals."
        }
    ];

    const faqGrid = document.querySelector('.faq-grid');
    faqData.forEach(faq => {
        const faqItem = document.createElement('div');
        faqItem.classList.add('faq-item');
        faqItem.innerHTML = `
            <h4 class="faq-question">${faq.question}</h4>
            <p class="faq-answer" style="display: none;">${faq.answer}</p>
        `;
        faqGrid.appendChild(faqItem);
    });

    // Toggle FAQ Answers
    document.querySelectorAll('.faq-question').forEach(q => {
        q.addEventListener('click', () => {
            const answer = q.nextElementSibling;
            const isVisible = answer.style.display === 'block';
            answer.style.display = isVisible ? 'none' : 'block';
        });
    });

    // document.querySelectorAll('.faq-question').forEach(question => {
    //     question.addEventListener('click', () => {
    //       const faqItem = question.parentElement;
    //       faqItem.classList.toggle('active');
    //       const toggle = question.querySelector('.toggle');
    //       toggle.textContent = faqItem.classList.contains('active') ? '−' : '+';
    //     });
    //   });
      
    // Registration Submission 
    const registrationForm = document.getElementById('registrationForm');

    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let activeForm;
        if (teamForm.classList.contains('active')) {
            alert('Team registration submitted successfully!');
            activeForm = teamForm;
        } else if (soloForm.classList.contains('active')) {
            alert('Solo registration submitted successfully!');
            activeForm = soloForm;
        } else {
            alert('Please select a registration type.');
            return;
        }

        // Clear fields only from the active form
        activeForm.querySelectorAll('input, textarea, select').forEach(field => {
            field.value = '';
        });
    });
});