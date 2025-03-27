// Prevent auto-scrolling on refresh
if (window.location.hash) {
  history.replaceState(null, null, ' ');
}

// Enable scrolling only when clicking a navbar link or button
function scrollToSection(event, sectionId) {
  event.preventDefault();
  const target = document.getElementById(sectionId);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

// Mailchimp form setup (to handle form data)
(function($) {
  window.fnames = new Array();
  window.ftypes = new Array();
  fnames[0] = 'EMAIL';
  ftypes[0] = 'email';
  fnames[1] = 'FNAME';
  ftypes[1] = 'text';
  fnames[2] = 'LNAME';
  ftypes[2] = 'text';
})(jQuery);

var $mcj = jQuery.noConflict(true);
