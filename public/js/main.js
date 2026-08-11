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

  // Contact form: submit to the Node/Express API. Falls back to a mailto
  // link if the API is unreachable (e.g. the page is opened as a static
  // file rather than served by server.js).
  var form = document.getElementById('contact-form');
  if (form) {
    var statusEl = document.createElement('p');
    statusEl.className = 'form-status';
    statusEl.style.marginTop = '14px';
    statusEl.style.fontSize = '14px';
    form.appendChild(statusEl);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var submitBtn = form.querySelector('button[type="submit"]');
      var payload = {
        name: form.name.value,
        email: form.email.value,
        topic: form.topic.value,
        message: form.message.value
      };

      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending…'; }
      statusEl.textContent = '';

      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(function (r) { if (!r.ok) throw new Error('Request failed'); return r.json(); })
        .then(function () {
          statusEl.textContent = 'Message sent — thanks, we\'ll be in touch.';
          statusEl.style.color = '#0A8C97';
          form.reset();
        })
        .catch(function () {
          // Fallback: open the visitor's email client with the message pre-filled.
          var subject = encodeURIComponent('Website inquiry: ' + (payload.topic || 'General inquiry'));
          var body = encodeURIComponent('Name: ' + payload.name + '\nEmail: ' + payload.email + '\n\n' + payload.message);
          window.location.href = 'mailto:alamai.ee.eng@gmail.com?subject=' + subject + '&body=' + body;
        })
        .finally(function () {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Send message'; }
        });
    });
  }
});
