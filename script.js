/* ==========================================================================
   Apple Style — Interactive Scripts for Toyota Fortuner Page (English)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  /* --------------------------------------------------------------------------
     1. Sticky Navigation Scroll Effect
     -------------------------------------------------------------------------- */
  const mainNav = document.getElementById('main-nav');
  
  const handleScroll = () => {
    if (window.scrollY > 40) {
      mainNav.classList.add('scrolled');
    } else {
      mainNav.classList.remove('scrolled');
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  // Initial check on load
  handleScroll();


  /* --------------------------------------------------------------------------
     2. Interactive Showroom Color Selector
     -------------------------------------------------------------------------- */
  const colorDots = document.querySelectorAll('.color-dot');
  const showroomImg = document.getElementById('showroom-img');
  const colorNameDisplay = document.getElementById('color-name');

  colorDots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      // 1. Skip if already active
      if (dot.classList.contains('active')) return;

      // 2. Remove active state from other dots
      colorDots.forEach(d => d.classList.remove('active'));
      
      // 3. Add active state to clicked dot
      dot.classList.add('active');

      // 4. Retrieve variables from dataset
      const newImgSrc = dot.getAttribute('data-image');
      const colorName = dot.getAttribute('data-name');

      // 5. Trigger transition class
      showroomImg.classList.add('changing');

      // 6. Swap assets after fade animation (250ms)
      setTimeout(() => {
        showroomImg.src = newImgSrc;
        showroomImg.alt = `Toyota Fortuner in ${colorName}`;
        colorNameDisplay.textContent = colorName;
        
        // Remove class to fade back in
        showroomImg.classList.remove('changing');
      }, 250);
    });
  });


  /* --------------------------------------------------------------------------
     3. Interactive Smartwatch Complications
     -------------------------------------------------------------------------- */
  const btnEngine = document.getElementById('watch-btn-engine');
  const btnClimate = document.getElementById('watch-btn-climate');
  const btnLock = document.getElementById('watch-btn-lock');
  
  const dialValueText = document.getElementById('dial-value-text');
  const dialProgressBar = document.getElementById('dial-progress-bar');
  const watchStatusText = document.getElementById('watch-status-text');

  // Watch states
  let isEngineRunning = false;
  let isClimateActive = false;
  let isLocked = true;

  // Total stroke dasharray for the SVG circle (2 * PI * r) where r=42 -> ~263.89
  const maxDashOffset = 264;

  const updateFuelDial = (percentage) => {
    // Offset calculation: percentage = 100% -> offset = 0, percentage = 0% -> offset = maxDashOffset
    const offset = maxDashOffset - (maxDashOffset * (percentage / 100));
    dialProgressBar.style.strokeDashoffset = offset;
    dialValueText.textContent = `${percentage}%`;
  };

  // Button: ENGINE CONTROL
  btnEngine.addEventListener('click', () => {
    if (!isEngineRunning) {
      // Start Engine
      btnEngine.style.pointerEvents = 'none';
      watchStatusText.textContent = 'Fortuner: Starting...';
      watchStatusText.style.color = 'var(--color-signal-orange)';
      
      // Simulate starter
      let progress = 75;
      const starterInterval = setInterval(() => {
        progress = progress === 75 ? 78 : 75;
        updateFuelDial(progress);
      }, 200);

      setTimeout(() => {
        clearInterval(starterInterval);
        isEngineRunning = true;
        btnEngine.classList.add('active');
        btnEngine.style.pointerEvents = 'auto';
        watchStatusText.textContent = 'Fortuner: Engine running';
        watchStatusText.style.color = 'var(--color-neon-green)';
        updateFuelDial(74); // Starting engine consumes slight fuel
      }, 1500);

    } else {
      // Stop Engine
      isEngineRunning = false;
      btnEngine.classList.remove('active');
      watchStatusText.textContent = 'Fortuner: Engine off';
      watchStatusText.style.color = 'var(--color-frost-white)';
      updateFuelDial(75);
    }
  });

  // Button: CLIMATE CONTROL
  btnClimate.addEventListener('click', () => {
    if (!isClimateActive) {
      isClimateActive = true;
      btnClimate.classList.add('active');
      watchStatusText.textContent = 'Climate: Active (22°C)';
      
      // Animate fuel consumption over time if engine is off
      if (!isEngineRunning) {
        updateFuelDial(73);
      }
    } else {
      isClimateActive = false;
      btnClimate.classList.remove('active');
      watchStatusText.textContent = isEngineRunning ? 'Fortuner: Engine running' : 'Fortuner: Connected';
      if (!isEngineRunning) {
        updateFuelDial(75);
      }
    }
  });

  // Button: LOCK CONTROL
  btnLock.addEventListener('click', () => {
    isLocked = !isLocked;
    
    if (isLocked) {
      btnLock.classList.add('active');
      // Update Lock Icon to Lock Closed
      btnLock.querySelector('svg').innerHTML = `
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      `;
      btnLock.querySelector('.btn-label').textContent = 'LOCK';
      watchStatusText.textContent = 'Fortuner: Locked';
    } else {
      btnLock.classList.remove('active');
      // Update Lock Icon to Lock Open
      btnLock.querySelector('svg').innerHTML = `
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 9.9-1"/>
      `;
      btnLock.querySelector('.btn-label').textContent = 'UNLOCK';
      watchStatusText.textContent = 'Fortuner: Unlocked';
    }
  });

  // Set initial button active state for Lock (since it starts locked)
  btnLock.classList.add('active');


  /* --------------------------------------------------------------------------
     4. Scroll Reveal Animations (Intersection Observer)
     -------------------------------------------------------------------------- */
  // Add trigger classes to various layout blocks dynamically
  const revealElements = [
    document.querySelector('.feature-card-dark'),
    document.querySelector('.smart-text-col'),
    document.querySelector('.watch-container'),
    ...document.querySelectorAll('.detail-block')
  ];

  revealElements.forEach(el => {
    if (el) el.classList.add('fade-in-trigger');
  });

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Trigger only once
        }
      });
    }, {
      threshold: 0.1, // Trigger when 10% of the element is visible
      rootMargin: '0px 0px 0px 0px'
    });

    const triggers = document.querySelectorAll('.fade-in-trigger');
    triggers.forEach(trigger => revealObserver.observe(trigger));
  } else {
    // Fallback: make all elements immediately visible if IntersectionObserver is unsupported
    document.querySelectorAll('.fade-in-trigger').forEach(el => el.classList.add('visible'));
  }

  // Trigger Hero elements instantly on load with delay
  const heroImg = document.getElementById('hero-img');
  const heroHeadline = document.querySelector('.hero-headline');
  const heroEyebrow = document.querySelector('.hero-eyebrow');
  const heroBottom = document.querySelector('.hero-bottom-bar');

  if (heroImg) {
    heroImg.style.opacity = '0';
    heroImg.style.transform = 'scale(0.95)';
    heroImg.style.transition = 'opacity 1.2s cubic-bezier(0.25, 1, 0.5, 1), transform 1.2s cubic-bezier(0.25, 1, 0.5, 1)';
    
    setTimeout(() => {
      heroImg.style.opacity = '1';
      heroImg.style.transform = 'scale(1)';
    }, 150);
  }

  if (heroHeadline) {
    heroHeadline.style.opacity = '0';
    heroHeadline.style.transform = 'translateY(20px)';
    heroHeadline.style.transition = 'opacity 1s cubic-bezier(0.25, 1, 0.5, 1), transform 1s cubic-bezier(0.25, 1, 0.5, 1)';
    
    setTimeout(() => {
      heroHeadline.style.opacity = '1';
      heroHeadline.style.transform = 'translateY(0)';
    }, 300);
  }

  if (heroEyebrow) {
    heroEyebrow.style.opacity = '0';
    heroEyebrow.style.transform = 'translateY(10px)';
    heroEyebrow.style.transition = 'opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
    
    setTimeout(() => {
      heroEyebrow.style.opacity = '0.85';
      heroEyebrow.style.transform = 'translateY(0)';
    }, 150);
  }

  if (heroBottom) {
    heroBottom.style.opacity = '0';
    heroBottom.style.transform = 'translateY(20px)';
    heroBottom.style.transition = 'opacity 1s cubic-bezier(0.25, 1, 0.5, 1), transform 1s cubic-bezier(0.25, 1, 0.5, 1)';
    
    setTimeout(() => {
      heroBottom.style.opacity = '1';
      heroBottom.style.transform = 'translateY(0)';
    }, 450);
  }
});
