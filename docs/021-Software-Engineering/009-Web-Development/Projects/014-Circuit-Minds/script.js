// Prevent auto-scrolling on refresh
if (window.location.hash) {
  history.replaceState(null, null, ' ');
}

// Enable scrolling only when clicking a navbar link
function scrollToSection(event, sectionId) {
  event.preventDefault();
  document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}
