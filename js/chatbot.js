/* ================================================================
   CHATBOT.JS — "Aria" AI Assistant
   A rule-based assistant that simulates intelligent answers using
   keyword matching — fully frontend, available 24/7.
   Developed by: Jalixon — https://jalixon.vercel.app/
================================================================ */
(function () {
  'use strict';

  const bot = document.getElementById('chatbot');
  const cbBody = document.getElementById('cbBody');
  const cbForm = document.getElementById('cbForm');
  const cbInput = document.getElementById('cbInput');
  const cbChips = document.getElementById('cbChips');

  // Quick-reply suggestion chips shown under the conversation.
  const QUICK = ['Services & pricing', 'How to book?', 'Wedding packages', 'Contact details'];

  // Knowledge base: each entry has trigger keywords + a crafted reply.
  const KB = [
    { k:['price','pricing','cost','rate','package','quote'], a:'Our bespoke packages begin at ₦10,000 for portrait sessions and ₦50,000 for full wedding coverage. Every commission is tailored — share your date in the Booking section for a precise quote. 💎' },
    { k:['book','booking','reserve','schedule','appointment'], a:'Booking is effortless: scroll to the Booking section, fill in your details, and we\'ll continue instantly on WhatsApp. Shall I take you there? Just tap "Book" in the menu. 📅' },
    { k:['wedding','marriage','bride','groom'], a:'Our wedding artistry includes full-day cinematic coverage, a second photographer, an online gallery and a museum-grade album. Packages start at ₦15,000. 💍' },
    { k:['service','services','offer','do you'], a:'We specialise in Weddings, Events, Portraits, Product, Commercial and Drone photography — each delivered with luxury craftsmanship. Which interests you?' },
    { k:['drone','aerial'], a:'Yes! Our licensed drone team captures breathtaking aerial cinematography for venues, estates and events. 🚁' },
    { k:['contact','phone','email','call','reach'], a:'You can reach us at +1 (555) 014-2090 or hello@noblearistocrat.com. Our Mayfair studio welcomes visits by appointment. 📞' },
    { k:['location','where','address','studio'], a:'Our flagship studio is at 120 Belgravia Crescent, Mayfair, London — though we travel worldwide for commissions. 🌍' },
    { k:['hour','open','time','availability'], a:'We\'re open Mon–Fri 9am–7pm and Sat 10am–5pm. As an AI assistant, I\'m here 24/7! ⏰' },
    { k:['portfolio','work','gallery','photos','sample'], a:'Explore our finest commissions in the Portfolio section above — filter by Weddings, Events, Corporate, Portraits or Products. 📸' },
    { k:['hello','hi','hey','good'], a:'Hello and welcome to Noble Aristocrat! ✦ I\'m Aria, your personal assistant. How may I help you create something beautiful today?' },
    { k:['thank','thanks'], a:'It\'s my pleasure! ✨ Is there anything else I can help you with?' },
    { k:['ceo','founder','alexander','owner'], a:'Our Founder & Creative Director is Alexander Noble — an award-winning photographer with 20+ years of experience. Read his story in the CEO section. 🏆' }
  ];

  // Append a message bubble (bot or user) and auto-scroll to the latest.
  function addMsg(text, who) {
    const m = document.createElement('div');
    m.className = `msg ${who}`;
    m.innerHTML = text;
    cbBody.appendChild(m);
    cbBody.scrollTop = cbBody.scrollHeight;
  }

  // Find the best matching reply from the knowledge base.
  function botReply(text) {
    const t = text.toLowerCase();
    const hit = KB.find(item => item.k.some(k => t.includes(k)));
    return hit ? hit.a : 'That\'s a wonderful question! For specific details, please reach our team at hello@noblearistocrat.com or use the Booking section. Meanwhile, I can help with services, pricing, booking or contact info. 🤍';
  }

  // Send a user message, then reply after a short human-like delay.
  function sendUser(text) {
    addMsg(text, 'user');
    setTimeout(() => addMsg(botReply(text), 'bot'), 550);
  }

  // Build quick-reply chips
  QUICK.forEach(q => {
    const c = document.createElement('span');
    c.className = 'chip';
    c.textContent = q;
    c.addEventListener('click', () => sendUser(q));
    cbChips.appendChild(c);
  });

  // Handle typed input
  cbForm.addEventListener('submit', e => {
    e.preventDefault();
    const val = cbInput.value.trim(); if (!val) return;
    sendUser(val); cbInput.value = '';
  });

  // Open/close behaviour with a one-time greeting.
  let greeted = false;
  function toggleBot() {
    bot.classList.toggle('open');
    if (bot.classList.contains('open') && !greeted) {
      greeted = true;
      setTimeout(() => addMsg('Welcome to <b>Noble Aristocrat</b> ✦ I\'m Aria. Ask me about our services, pricing or how to book your bespoke session.', 'bot'), 300);
    }
  }
  document.getElementById('botToggle').addEventListener('click', toggleBot);
  document.getElementById('cbClose').addEventListener('click', () => bot.classList.remove('open'));

})();
