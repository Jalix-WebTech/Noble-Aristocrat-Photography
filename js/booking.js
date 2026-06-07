/* ================================================================
   BOOKING.JS — Booking form → WhatsApp
   Builds a clean, structured message from the booking form and
   redirects to WhatsApp. No backend required — perfect for a
   static luxury site.
   Developed by: Jalixon — https://jalixon.vercel.app/
================================================================ */
(function () {
  'use strict';

  // Reuse the global WhatsApp number set in app.js (with a safe fallback).
  const WHATSAPP_NUMBER = (window.NOBLE && window.NOBLE.WHATSAPP_NUMBER) || '15550142090';

  const form = document.getElementById('bookingForm');
  const toast = document.getElementById('toast');

  // Small helper: show a temporary confirmation toast.
  function showToast(text) {
    toast.textContent = text;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const v = id => document.getElementById(id).value.trim();

    // Basic validation for required fields
    if (!v('bName') || !v('bPhone') || !v('bEmail') || !v('bService') || !v('bDate')) {
      showToast('Please complete all required fields.');
      return;
    }

    // Build a neatly formatted WhatsApp message
    const message =
`✦ NEW BOOKING REQUEST — Noble Aristocrat ✦
─────────────────────────
Name: ${v('bName')}
Phone: ${v('bPhone')}
Email: ${v('bEmail')}
Service: ${v('bService')}
Event Date: ${v('bDate')}
Location: ${v('bLocation') || '—'}
Details: ${v('bDetails') || '—'}
─────────────────────────
Sent from noblearistocrat.com`;

    showToast('Opening WhatsApp to confirm your booking…');
    setTimeout(() => {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
      form.reset();
    }, 800);
  });

})();
