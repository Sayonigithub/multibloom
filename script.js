// MultiBloom interactions
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    mainNav.classList.toggle('open', !isOpen);
    menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation');
    });
  });
}

// Automatically select a service when someone clicks a service-card arrow.
const serviceSelect = document.querySelector('#service');
document.querySelectorAll('[data-service]').forEach((link) => {
  link.addEventListener('click', () => {
    if (serviceSelect) {
      const serviceName = link.dataset.service;
      const matchingOption = [...serviceSelect.options].find((option) => option.value === serviceName || option.textContent === serviceName);
      if (matchingOption) serviceSelect.value = matchingOption.value || matchingOption.textContent;
    }
  });
});

// This is a front-end-only enquiry form. It opens a prefilled email draft.
const contactForm = document.querySelector('#contactForm');
const toast = document.querySelector('#toast');

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 3600);
}

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const service = String(formData.get('service') || '').trim();
    const message = String(formData.get('message') || '').trim();

    const subject = `MultiBloom enquiry — ${service}`;
    const body = [
      'Hello MultiBloom,',
      '',
      'I would like to enquire about your services.',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Service: ${service}`,
      '',
      'Project details:',
      message || 'I would like to discuss my requirements.',
      '',
      'Please let me know the next steps and an estimated quote.',
      '',
      'Thank you.'
    ].join('\n');

    const mailto = `mailto:multibloom3@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    showToast('Opening your email app with the enquiry…');
    window.location.href = mailto;
  });
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
