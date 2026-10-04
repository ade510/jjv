// Interactive behaviors for Trevor's Showcase Card

document.addEventListener('DOMContentLoaded', () => {
  const card = document.getElementById('profileCard') || document.getElementById('aboutProfileCard');
  const greetBtn = document.getElementById('greetBtn');
  const copyBtn = document.getElementById('copyBtn');
  const copyBtnText = document.getElementById('copyBtnText');
  const aboutContactBtn = document.getElementById('aboutContactBtn');
  const toast = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');

  let toastTimeout = null;

  // Show Toast notification helper
  function showToast(message, duration = 3000) {
    if (toastTimeout) {
      clearTimeout(toastTimeout);
    }
    toastMessage.textContent = message;
    toast.classList.add('show');

    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }

  // 1. Mouse Spotlight & Subtle 3D Tilt Effect
  if (card) {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update CSS spotlight coordinates
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // 3D tilt calculation
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6; // max 6 deg
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  }

  // 2. "Say Hello" button interaction
  if (greetBtn) {
    const greetings = [
      'Hey there! Trevor says hi! 👋',
      'Thanks for dropping by! 🚀',
      'Hope you have a fantastic day! ✨',
      'Let\'s build something extraordinary! 💡'
    ];
    let greetIndex = 0;

    greetBtn.addEventListener('click', (e) => {
      // Micro-scale click animation
      greetBtn.style.transform = 'scale(0.95)';
      setTimeout(() => {
        greetBtn.style.transform = '';
      }, 150);

      // Trigger sparkle effect around cursor/button
      createSparkles(e.clientX, e.clientY);

      // Display friendly toast
      showToast(greetings[greetIndex]);
      greetIndex = (greetIndex + 1) % greetings.length;
    });
  }

  // 3. "Copy Email" button interaction
  if (copyBtn) {
    const demoEmail = 'trevor@example.com';

    copyBtn.addEventListener('click', async () => {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(demoEmail);
        }
        
        copyBtnText.textContent = 'Copied!';
        showToast(`Copied "${demoEmail}" to clipboard! 📋`);

        setTimeout(() => {
          copyBtnText.textContent = 'Copy Email';
        }, 2200);
      } catch (err) {
        showToast(`Email: ${demoEmail}`);
      }
    });
  }

  // 4. "Let's Connect" button on About page
  if (aboutContactBtn) {
    const demoEmail = 'trevor@example.com';

    aboutContactBtn.addEventListener('click', async (e) => {
      createSparkles(e.clientX, e.clientY);
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(demoEmail);
        }
        showToast(`Copied "${demoEmail}"! Let's build something awesome 🚀`);
      } catch (err) {
        showToast(`Reach Trevor at: ${demoEmail} 📬`);
      }
    });
  }

  // 5. Lightweight Particle Sparkle Effect
  function createSparkles(x, y) {
    const sparkleColors = ['#a855f7', '#38bdf8', '#ec4899', '#ffffff'];
    const count = 12;

    for (let i = 0; i < count; i++) {
      const sparkle = document.createElement('div');
      sparkle.style.position = 'fixed';
      sparkle.style.left = `${x}px`;
      sparkle.style.top = `${y}px`;
      sparkle.style.width = '6px';
      sparkle.style.height = '6px';
      sparkle.style.borderRadius = '50%';
      sparkle.style.backgroundColor = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
      sparkle.style.pointerEvents = 'none';
      sparkle.style.zIndex = '999';
      sparkle.style.boxShadow = `0 0 8px ${sparkle.style.backgroundColor}`;

      const angle = (Math.PI * 2 * i) / count;
      const velocity = 40 + Math.random() * 45;
      const destX = Math.cos(angle) * velocity;
      const destY = Math.sin(angle) * velocity;

      sparkle.style.transition = 'transform 0.65s cubic-bezier(0.1, 0.9, 0.2, 1), opacity 0.65s ease';
      document.body.appendChild(sparkle);

      // Trigger frame transition
      requestAnimationFrame(() => {
        sparkle.style.transform = `translate(${destX}px, ${destY}px) scale(0)`;
        sparkle.style.opacity = '0';
      });

      setTimeout(() => {
        sparkle.remove();
      }, 700);
    }
  }
});
