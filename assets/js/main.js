/* MK Textile Service — site behaviour (no dependencies) */
(function () {
  'use strict';

  /* Business details. The enquiry form posts to its own action attribute
     (FormSubmit, set once in build.mjs). */
  var CONFIG = {
    whatsapp: '923212308070',
    email: 'info@mktextileservice.com',
    maxFile: 10 * 1024 * 1024, // FormSubmit rejects attachments over 10 MB
    whatsappMessage: 'Hello MK Textile Service, I would like to enquire about your inspection services.'
  };

  var doc = document;
  var root = doc.documentElement;
  var $ = function (sel, ctx) { return (ctx || doc).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); };

  /* Header shadow once the page scrolls */
  var header = $('.site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-stuck', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* Mobile menu */
  var toggle = $('.nav-toggle');
  function setNav(open) {
    root.classList.toggle('nav-open', open);
    if (toggle) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
  }
  if (toggle) {
    toggle.addEventListener('click', function () { setNav(!root.classList.contains('nav-open')); });
    window.addEventListener('resize', function () { if (window.innerWidth >= 1180) setNav(false); });
  }

  /* Dropdown (click / touch; hover and focus are handled in CSS) */
  $$('.sub-toggle').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var li = btn.closest('.has-sub');
      var open = !li.classList.contains('is-open');
      li.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
    });
  });
  doc.addEventListener('click', function (e) {
    $$('.has-sub.is-open').forEach(function (li) {
      if (!li.contains(e.target) && window.innerWidth >= 1180) {
        li.classList.remove('is-open');
        var b = $('.sub-toggle', li);
        if (b) b.setAttribute('aria-expanded', 'false');
      }
    });
    var lang = $('.lang');
    if (lang && lang.open && !lang.contains(e.target)) lang.open = false;
  });
  doc.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    setNav(false);
    $$('.has-sub.is-open').forEach(function (li) { li.classList.remove('is-open'); });
    var lang = $('.lang');
    if (lang) lang.open = false;
  });

  /* Reveal on scroll */
  var reveals = $$('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -5% 0px', threshold: 0 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* WhatsApp links: direct chat with a prefilled message. */
  if (CONFIG.whatsapp) {
    var wa = 'https://wa.me/' + CONFIG.whatsapp.replace(/\D/g, '') + '?text=' + encodeURIComponent(CONFIG.whatsappMessage);
    $$('[data-whatsapp]').forEach(function (a) {
      a.href = wa;
      a.target = '_blank';
      a.rel = 'noopener';
    });
  }

  /* Language menu. English is the source; other languages are translated in
     the browser by Google Translate, which reads the googtrans cookie on load. */
  var readLang = function () {
    var m = doc.cookie.match(/(?:^|;\s*)googtrans=\/[^/;]*\/([^;]+)/);
    return m ? decodeURIComponent(m[1]) : 'en';
  };
  var setLangCookie = function (value) {
    var host = location.hostname;
    var v = 'googtrans=' + (value || '') + (value ? '' : '; expires=Thu, 01 Jan 1970 00:00:00 GMT') + '; path=/';
    doc.cookie = v;
    if (host.indexOf('.') > -1 && !/^[\d.]+$/.test(host)) {
      doc.cookie = v + '; domain=' + host;
      doc.cookie = v + '; domain=.' + host.replace(/^www\./, '');
    }
  };
  var currentLang = readLang();
  var langMenu = $('.lang');
  if (langMenu) {
    var currentBtn = $('[data-lang="' + currentLang + '"]', langMenu) || $('[data-lang="en"]', langMenu);
    $('[data-lang-current]', langMenu).textContent = currentBtn.getAttribute('data-short');
    currentBtn.setAttribute('aria-current', 'true');
    $$('[data-lang]', langMenu).forEach(function (b) {
      b.addEventListener('click', function () {
        var code = b.getAttribute('data-lang');
        langMenu.open = false;
        if (code === currentLang) return;
        setLangCookie(code === 'en' ? '' : '/en/' + code);
        window.location.reload();
      });
    });
  }
  if (currentLang !== 'en') {
    window.mkTranslateInit = function () {
      /* global google */
      new google.translate.TranslateElement({ pageLanguage: 'en', autoDisplay: false }, 'mk-translate');
    };
    var holder = doc.createElement('div');
    holder.id = 'mk-translate';
    holder.hidden = true;
    doc.body.appendChild(holder);
    var gt = doc.createElement('script');
    gt.src = 'https://translate.google.com/translate_a/element.js?cb=mkTranslateInit';
    gt.async = true;
    doc.body.appendChild(gt);
  }

  /* Footer year */
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  var params = new URLSearchParams(window.location.search);

  /* Sample Reports page: choose report types, then continue to the enquiry form */
  var picker = $('[data-report-picker]');
  if (picker) {
    var boxes = $$('input[type="checkbox"]', picker);
    var go = $('[data-report-go]');
    var count = $('[data-report-count]');
    var pre = (params.get('reports') || '').split(',');
    boxes.forEach(function (b) { if (pre.indexOf(b.value) > -1) b.checked = true; });
    var sync = function () {
      var picked = boxes.filter(function (b) { return b.checked; }).map(function (b) { return b.value; });
      go.href = 'contact.html?service=sample-report' + (picked.length ? '&reports=' + picked.join(',') : '') + '#enquiry';
      go.setAttribute('aria-disabled', String(!picked.length));
      if (!picked.length) go.setAttribute('tabindex', '-1'); else go.removeAttribute('tabindex');
      count.textContent = picked.length
        ? picked.length + ' report type' + (picked.length > 1 ? 's' : '') + ' selected'
        : 'Select at least one report type to continue.';
    };
    picker.addEventListener('change', sync);
    sync();
  }

  /* Common enquiry form, delivered to the inbox by FormSubmit: in the
     background when there is no file, or as a normal form post (needed for
     attachments) that returns to the thank-you page. */
  var form = $('#enquiry-form');
  if (form) {
    var type = form.elements['Enquiry type'];
    var reportField = $('[data-report-field]', form);
    var reportBoxes = $$('input[data-report]', form);
    var fileInput = form.elements['attachment'];
    var msg = form.elements['Message'];
    var status = $('.form-status', form);
    var btn = $('button[type="submit"]', form);
    var typeKey = function () { return type.options[type.selectedIndex].getAttribute('data-key'); };

    var service = (params.get('service') || '').replace(/[^a-z-]/g, '');
    var preset = service && $('option[data-key="' + service + '"]', type);
    if (preset) type.value = preset.value;
    var chosen = (params.get('reports') || '').split(',');
    reportBoxes.forEach(function (b) { if (chosen.indexOf(b.value) > -1) b.checked = true; });

    // Sample-report requests: show report checkboxes; the message becomes optional.
    var syncReports = function () {
      var sample = typeKey() === 'sample-report';
      reportField.hidden = !sample;
      msg.required = !sample;
      $('[data-msg-req]', form).hidden = sample;
      $('[data-msg-opt]', form).hidden = !sample;
      if (sample) { msg.closest('.field').classList.remove('is-invalid'); msg.removeAttribute('aria-invalid'); }
    };
    type.addEventListener('change', syncReports);
    syncReports();

    var say = function (kind, text) {
      status.className = 'form-status is-' + kind;
      status.textContent = text;
      status.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    };

    var fileOk = function () {
      var f = fileInput.files && fileInput.files[0];
      var ok = !f || f.size <= CONFIG.maxFile;
      fileInput.closest('.field').classList.toggle('is-invalid', !ok);
      fileInput.setAttribute('aria-invalid', String(!ok));
      return ok;
    };
    fileInput.addEventListener('change', fileOk);

    var validate = function () {
      var firstBad = null;
      $$('[required]', form).forEach(function (input) {
        var field = input.closest('.field');
        var ok = input.value.trim() !== '' && input.checkValidity();
        field.classList.toggle('is-invalid', !ok);
        input.setAttribute('aria-invalid', String(!ok));
        if (!ok && !firstBad) firstBad = input;
      });
      if (!fileOk() && !firstBad) firstBad = fileInput;
      if (firstBad) firstBad.focus();
      return !firstBad;
    };
    form.addEventListener('input', function (e) {
      var field = e.target.closest('.field.is-invalid');
      if (field && e.target.type !== 'file' && e.target.value.trim() !== '' && e.target.checkValidity()) {
        field.classList.remove('is-invalid');
        e.target.setAttribute('aria-invalid', 'false');
      }
    });

    var sending = false;
    // Coming back from the thank-you page restores this page from cache: unlock the button.
    window.addEventListener('pageshow', function () {
      sending = false;
      btn.disabled = false;
      $$('input:disabled, select:disabled, textarea:disabled', form).forEach(function (el) { el.disabled = false; });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (sending) return;
      status.className = 'form-status';
      if (form.elements['_honey'].value) { say('success', 'Thank you. Your enquiry has been sent.'); return; } // bots only
      if (!validate()) { say('error', 'Please complete the highlighted fields.'); return; }

      var sample = typeKey() === 'sample-report';
      form.elements['Report types'].value = sample
        ? reportBoxes.filter(function (b) { return b.checked; }).map(function (b) { return b.parentNode.textContent.trim(); }).join('; ')
        : '';
      form.elements['_subject'].value = 'Website enquiry: ' + type.value + ' - ' + form.elements['Full name'].value.trim();
      form.elements['_next'].value = window.location.origin + '/thank-you.html';

      sending = true;
      btn.disabled = true;

      // A file can only travel with a normal form post.
      if (fileInput.files && fileInput.files.length) {
        say('info', 'Sending your enquiry and file...');
        // Leave empty optional fields out of the email.
        $$('input, select, textarea', form).forEach(function (el) {
          if (el.name && el.type !== 'file' && el.name !== '_honey' && el.value === '') el.disabled = true;
        });
        form.submit();
        return;
      }

      var payload = {};
      new FormData(form).forEach(function (v, k) {
        if (k === 'attachment' || k === '_honey' || k === '_next' || v === '') return;
        payload[k] = v;
      });
      say('info', 'Sending your enquiry...');
      fetch(form.action.replace('formsubmit.co/', 'formsubmit.co/ajax/'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      }).then(function (res) {
        return res.json().catch(function () { return {}; }).then(function (data) {
          if (!res.ok || String(data.success) !== 'true') throw new Error(data.message || 'HTTP ' + res.status);
        });
      }).then(function () {
        form.reset();
        syncReports();
        say('success', 'Thank you. Your enquiry has been sent and MK Textile Service will reply to you by email.');
      }).catch(function () {
        say('error', 'Sorry, your enquiry could not be sent. Please try again, or email us at ' + CONFIG.email + '.');
      }).then(function () { sending = false; btn.disabled = false; });
    });
  }
})();
