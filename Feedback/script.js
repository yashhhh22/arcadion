const form = document.getElementById('feedbackForm');
const thankYouScreen = document.getElementById('thankYouScreen');
const formSection = document.getElementById('form-section');

// Show thank you after submit
form.addEventListener('submit', function (e) {
  e.preventDefault();
  formSection.style.display = 'none';
  thankYouScreen.classList.remove('hidden');
});

// Highlight selected radio buttons
document.querySelectorAll('.radio-group').forEach(group => {
  group.addEventListener('change', () => {
    const radios = group.querySelectorAll('input[type="radio"]');
    radios.forEach(radio => {
      radio.closest('.radio-btn').classList.remove('selected');
    });
    const selected = group.querySelector('input[type="radio"]:checked');
    if (selected) {
      selected.closest('.radio-btn').classList.add('selected');
    }
  });
});
