/* MK Textile Service — site behaviour (no dependencies) */
(function () {
  'use strict';

  /* ------------------------------------------------------------------
     Business details. Fill these in once confirmed — nothing is invented.
     whatsapp:     full number with country code, digits only, e.g. "923001234567"
     email:        official business email (used as a fallback for the form)
     formEndpoint: URL of the enquiry backend that stores the enquiry and
                   sends the email notification (accepts a JSON POST)
     ------------------------------------------------------------------ */
  var CONFIG = {
    whatsapp: '',
    email: 'info@mktextileservice.com',
    formEndpoint: '',
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
    var cw = $('.cw');
    if (cw && cw.open && !cw.contains(e.target)) cw.open = false;
  });
  doc.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    setNav(false);
    $$('.has-sub.is-open').forEach(function (li) { li.classList.remove('is-open'); });
    var cw = $('.cw');
    if (cw) cw.open = false;
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

  /* WhatsApp links: direct chat with a prefilled message once the number is set.
     Until then they fall back to the enquiry form (their default href). */
  if (CONFIG.whatsapp) {
    var wa = 'https://wa.me/' + CONFIG.whatsapp.replace(/\D/g, '') + '?text=' + encodeURIComponent(CONFIG.whatsappMessage);
    $$('[data-whatsapp]').forEach(function (a) {
      a.href = wa;
      a.target = '_blank';
      a.rel = 'noopener';
    });
  }
  $$('[data-pending]').forEach(function (el) {
    var key = el.getAttribute('data-pending');
    if (CONFIG[key]) el.textContent = key === 'whatsapp' ? '+' + CONFIG.whatsapp.replace(/\D/g, '') : CONFIG[key];
  });

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

  /* Common enquiry form */
  var form = $('#enquiry-form');
  if (form) {
    var type = form.elements['enquiryType'];
    var reportField = $('[data-report-field]', form);
    var status = $('.form-status', form);

    var service = params.get('service');
    if (service && $('option[value="' + service.replace(/[^a-z-]/g, '') + '"]', type)) type.value = service;
    var chosen = (params.get('reports') || '').split(',');
    $$('input[name="reports"]', form).forEach(function (b) { if (chosen.indexOf(b.value) > -1) b.checked = true; });

    var syncReports = function () { reportField.hidden = type.value !== 'sample-report'; };
    type.addEventListener('change', syncReports);
    syncReports();

    var say = function (kind, msg) {
      status.className = 'form-status is-' + kind;
      status.textContent = msg;
      status.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    };

    var validate = function () {
      var firstBad = null;
      $$('[required]', form).forEach(function (input) {
        var field = input.closest('.field');
        var ok = input.value.trim() !== '' && input.checkValidity();
        field.classList.toggle('is-invalid', !ok);
        input.setAttribute('aria-invalid', String(!ok));
        if (!ok && !firstBad) firstBad = input;
      });
      if (firstBad) firstBad.focus();
      return !firstBad;
    };
    form.addEventListener('input', function (e) {
      var field = e.target.closest('.field.is-invalid');
      if (field && e.target.value.trim() !== '' && e.target.checkValidity()) {
        field.classList.remove('is-invalid');
        e.target.setAttribute('aria-invalid', 'false');
      }
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      status.className = 'form-status';
      if (form.elements['website'].value) return;          // honeypot: bots only
      if (!validate()) { say('error', 'Please complete the highlighted fields.'); return; }

      var data = {
        fullName: form.elements['fullName'].value.trim(),
        companyName: form.elements['companyName'].value.trim(),
        email: form.elements['email'].value.trim(),
        country: form.elements['country'].value.trim(),
        enquiryType: type.options[type.selectedIndex].text,
        inspectionStage: form.elements['inspectionStage'].value,
        location: form.elements['location'].value.trim(),
        quantity: form.elements['quantity'].value.trim(),
        preferredDate: form.elements['preferredDate'].value,
        reports: type.value === 'sample-report'
          ? $$('input[name="reports"]:checked', form).map(function (b) { return b.parentNode.textContent.trim(); })
          : [],
        message: form.elements['message'].value.trim(),
        submittedAt: new Date().toISOString()
      };

      if (CONFIG.formEndpoint) {
        var btn = $('button[type="submit"]', form);
        btn.disabled = true;
        fetch(CONFIG.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(data)
        }).then(function (res) {
          if (!res.ok) throw new Error('HTTP ' + res.status);
          form.reset();
          syncReports();
          say('success', 'Thank you. Your enquiry has been received and MK Textile Service will respond to you by email.');
        }).catch(function () {
          say('error', 'Sorry, your enquiry could not be sent. Please try again in a moment.');
        }).then(function () { btn.disabled = false; });
        return;
      }

      if (CONFIG.email) {
        var lines = [
          'Full name: ' + data.fullName,
          'Company: ' + data.companyName,
          'Email: ' + data.email,
          'Country: ' + data.country,
          'Enquiry type: ' + data.enquiryType,
          'Inspection stage: ' + (data.inspectionStage || '-'),
          'Factory / inspection location: ' + (data.location || '-'),
          'Product quantity: ' + (data.quantity || '-'),
          'Preferred inspection date: ' + (data.preferredDate || '-')
        ];
        if (data.reports.length) lines.push('Report type(s): ' + data.reports.join('; '));
        lines.push('', data.message);
        window.location.href = 'mailto:' + CONFIG.email +
          '?subject=' + encodeURIComponent('Website enquiry: ' + data.enquiryType) +
          '&body=' + encodeURIComponent(lines.join('\n'));
        say('info', 'Your email app has been opened with the enquiry details. Please send the message to complete your enquiry.');
        return;
      }

      say('info', 'The enquiry form is not connected to the enquiry system yet, so nothing has been sent. Your details pass validation and would be submitted once the backend is configured.');
    });
  }
})();
