document.addEventListener('DOMContentLoaded', () => {
    const teamGrid = document.querySelector('.team-grid');
    
    const players = [
        {
            name: 'Carlos Mendoza',
            position: 'Delantero',
            image: 'https://randomuser.me/api/portraits/men/1.jpg',
            number: 10
        },
        {
            name: 'Diego Ramírez',
            position: 'Mediocampista',
            image: 'https://randomuser.me/api/portraits/men/2.jpg',
            number: 8
        },
        {
            name: 'Juan García',
            position: 'Defensa',
            image: 'https://randomuser.me/api/portraits/men/3.jpg',
            number: 4
        },
        {
            name: 'Miguel Torres',
            position: 'Portero',
            image: 'https://randomuser.me/api/portraits/men/4.jpg',
            number: 1
        },
        {
            name: 'Luis Fernández',
            position: 'Defensa',
            image: 'https://randomuser.me/api/portraits/men/5.jpg',
            number: 5
        },
        {
            name: 'Roberto Sánchez',
            position: 'Delantero',
            image: 'https://randomuser.me/api/portraits/men/6.jpg',
            number: 9
        }
    ];

    function createPlayerCard(player) {
        const card = document.createElement('div');
        card.classList.add('player-card', 'col-md-4', 'mb-4');
        card.innerHTML = `
            <img src="${player.image}" alt="${player.name}" class="img-fluid">
            <h3>${player.name}</h3>
            <p>${player.position} | Número ${player.number}</p>
        `;
        return card;
    }

    players.forEach(player => {
        teamGrid.appendChild(createPlayerCard(player));
    });

    // Parallax effect
    const parallaxSections = document.querySelectorAll('.parallax-section');
    window.addEventListener('scroll', () => {
        parallaxSections.forEach(section => {
            const scrollPosition = window.pageYOffset;
            section.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });
    });

    // Form submission (basic validation)
    const contactForm = document.querySelector('#contacto form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const message = contactForm.querySelector('textarea').value;

            if (name && email && message) {
                alert('Mensaje enviado con éxito! Nos pondremos en contacto pronto.');
                contactForm.reset();
            } else {
                alert('Por favor, complete todos los campos.');
            }
        });
    }
});
