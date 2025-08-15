// Gestion de la navigation
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    function setActiveSection(sectionId) {
        // Masquer toutes les sections avec animation
        sections.forEach(section => {
            if (section.classList.contains('active')) {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.classList.remove('active');
                }, 300);
            }
        });

        // Désactiver tous les liens
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Activer le lien correspondant
        const activeLink = document.querySelector(`[href="#${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        // Afficher la nouvelle section avec animation
        setTimeout(() => {
            const selectedSection = document.getElementById(sectionId);
            if (selectedSection) {
                selectedSection.classList.add('active');
                // Forcer le reflow pour que l'animation fonctionne
                selectedSection.offsetHeight;
                selectedSection.style.opacity = '1';
                selectedSection.style.transform = 'translateY(0)';
            }
        }, 300);
    }

    // Gestion des clics sur les liens de navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href').substring(1);
            setActiveSection(sectionId);
            
            // Mise à jour de l'URL sans rechargement de la page
            history.pushState(null, '', `#${sectionId}`);
        });
    });

    // Gestion du formulaire de contact
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupération des données du formulaire
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            // Animation du bouton pendant l'envoi
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.disabled = true;

            // Simuler l'envoi (à remplacer par votre logique d'envoi réelle)
            setTimeout(() => {
                console.log('Données du formulaire:', formData);
                
                // Réinitialisation du formulaire
                contactForm.reset();
                
                // Restaurer le bouton
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Message de confirmation
                alert('Merci pour votre message ! Je vous répondrai dans les plus brefs délais.');
            }, 1000);
        });
    }

    // Gestion de l'historique de navigation
    window.addEventListener('popstate', function() {
        const sectionId = window.location.hash.substring(1) || 'home';
        setActiveSection(sectionId);
    });

    // Définir la section active au chargement de la page
    const initialSection = window.location.hash.substring(1) || 'home';
    setActiveSection(initialSection);

    // Animation au défilement pour les éléments
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.certificates li, .project-grid > *');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initialiser les styles pour l'animation au défilement
    document.querySelectorAll('.certificates li, .project-grid > *').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Écouter l'événement de défilement
    window.addEventListener('scroll', animateOnScroll);
    // Déclencher une fois au chargement
    animateOnScroll();

    // Gestion du défilement fluide
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Animation au défilement
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observer toutes les sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Gestion du menu mobile
const createMobileMenu = () => {
    const nav = document.querySelector('.main-nav');
    
    if (window.innerWidth <= 768) {
        // Créer le bouton du menu mobile
        const menuButton = document.createElement('button');
        menuButton.className = 'mobile-menu-button';
        menuButton.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.appendChild(menuButton);
        
        // Gérer le clic sur le bouton
        menuButton.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuButton.classList.toggle('active');
        });
        
        // Fermer le menu lors du clic sur un lien
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuButton.classList.remove('active');
            });
        });
    }
};

// Appeler la fonction au chargement et au redimensionnement
window.addEventListener('load', createMobileMenu);
window.addEventListener('resize', createMobileMenu);
