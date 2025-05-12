// Theme toggle
const toggleButton = document.getElementById('theme-toggle');
toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  document.body.classList.toggle('light-mode');
});

// Scroll-triggered reveal
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
  const triggerPoint = window.innerHeight * 0.85;
  revealElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < triggerPoint) {
      el.classList.add('show');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Floating image animation on hover
const gamesImage = document.getElementById('games-image');
if (gamesImage) {
  gamesImage.addEventListener('mouseenter', () => gamesImage.classList.add('floating'));
  gamesImage.addEventListener('mouseleave', () => gamesImage.classList.remove('floating'));
}

// Subtle CTA bounce on load
window.addEventListener('load', () => {
  const ctaButton = document.querySelector('.cta-button');
  if (ctaButton) {
    ctaButton.classList.add('bounce');
    setTimeout(() => ctaButton.classList.remove('bounce'), 2000);
  }
});

// Add bounce effect to each game card on initial reveal
document.addEventListener('DOMContentLoaded', () => {
  const gameCards = document.querySelectorAll('.game-card');
  gameCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    setTimeout(() => {
      card.style.transition = 'all 0.6s ease-out';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 300 + index * 150);
  });
});

// Interactive hover sounds or vibration (optional enhancement)
const gameButtons = document.querySelectorAll('.game-button');
gameButtons.forEach(button => {
  button.addEventListener('mouseenter', () => {
    button.style.boxShadow = '0 0 20px #ffcc00';
  });
  button.addEventListener('mouseleave', () => {
    button.style.boxShadow = '0 0 10px #ffcc00aa';
  });
});

// Subtle animation on feedback button when in view
const feedbackButton = document.querySelector('.feedback-button');
const feedbackSection = document.querySelector('.feedback-section');

if (feedbackSection && feedbackButton) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        feedbackButton.classList.add('bounce');
        setTimeout(() => feedbackButton.classList.remove('bounce'), 2000);
      }
    });
  }, {
    threshold: 0.5
  });

  observer.observe(feedbackSection);
}

