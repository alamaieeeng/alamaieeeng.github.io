// SimuSolv — shared behavior
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      var expanded = nav.classList.contains('open');
      toggle.setAttribute('aria-expanded', expanded);
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  // Animate any waveform SVG paths with a subtle drawing / drift effect,
  // respecting reduced-motion preference.
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion) {
    document.querySelectorAll('.wave-path').forEach(function (path, i) {
      path.style.animation = 'wave-drift 7s ease-in-out ' + (i * 0.4) + 's infinite';
    });
  }

  // Contact form: build a mailto link from the fields (no backend on static hosting).
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = encodeURIComponent(form.name.value || '');
      var email = form.email.value || '';
      var topic = encodeURIComponent(form.topic.value || 'General inquiry');
      var message = encodeURIComponent(form.message.value || '');
      var subject = 'Website inquiry: ' + decodeURIComponent(topic);
      var body = 'Name: ' + decodeURIComponent(name) + '%0D%0AEmail: ' + email + '%0D%0A%0D%0A' + decodeURIComponent(message);
      window.location.href = 'mailto:alamai.ee.eng@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + body;
    });
  }
});
