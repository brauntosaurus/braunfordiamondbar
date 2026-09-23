(() => {
  /* ==========================================================================
     Mobile Navigation
     ========================================================================== */
  const nav = document.getElementById('site-nav');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileBreakpoint = 900;

  const setMenuOpen = (open) => {
    if (!nav || !mobileToggle) return;

    nav.classList.toggle('active', open);
    mobileToggle.setAttribute('aria-expanded', String(open));
    mobileToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    mobileToggle.textContent = open ? '×' : '☰';
  };

  if (nav && mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      setMenuOpen(!nav.classList.contains('active'));
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMenuOpen(false));
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && nav.classList.contains('active')) {
        setMenuOpen(false);
        mobileToggle.focus();
      }
    });

    document.addEventListener('click', (event) => {
      if (
        nav.classList.contains('active') &&
        !nav.contains(event.target) &&
        !mobileToggle.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    });

    window.addEventListener(
      'resize',
      () => {
        if (window.innerWidth > mobileBreakpoint && nav.classList.contains('active')) {
          setMenuOpen(false);
        }
      },
      { passive: true }
    );
  }

  /* ==========================================================================
     Multi-Video Topic Switcher
     ========================================================================== */
  const video = document.getElementById('campaignVideo');
  const source = document.getElementById('videoSource');
  const topicPills = document.querySelectorAll('.topic-pill');

  if (video && source && topicPills.length > 0) {
    topicPills.forEach((pill) => {
      pill.addEventListener('click', (event) => {
        const selectedPill = event.currentTarget;
        const videoSrc = selectedPill.dataset.video;
        const posterSrc = selectedPill.dataset.poster;

        if (!videoSrc) return;

        video.pause();
        source.src = videoSrc;

        if (posterSrc) {
          video.poster = posterSrc;
        }

        video.load();

        topicPills.forEach((item) => item.classList.remove('active'));
        selectedPill.classList.add('active');
      });
    });
  }

  /* ==========================================================================
     Endorsement Showcase
     ========================================================================== */
  const showcase = document.querySelector('[data-endorsement-showcase]');

  if (showcase) {
    const featuredImage = showcase.querySelector('#featuredEndorserImage');
    const featuredQuote = showcase.querySelector('#featuredEndorserQuote');
    const featuredName = showcase.querySelector('#featuredEndorserName');
    const featuredTitle = showcase.querySelector('#featuredEndorserTitle');
    const featuredLink = showcase.querySelector('#featuredEndorserLink');
    const selector = showcase.querySelector('.endorsement-selector');
    const buttons = Array.from(
      showcase.querySelectorAll('.endorsement-selector__item')
    );

    const selectEndorsement = (button) => {
      if (
        !button ||
        !featuredImage ||
        !featuredQuote ||
        !featuredName ||
        !featuredTitle ||
        !featuredLink
      ) {
        return;
      }

      const {
        image,
        alt,
        name,
        title,
        profile,
        quote
      } = button.dataset;

      buttons.forEach((item) => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });

      if (image && featuredImage.src !== new URL(image, window.location.href).href) {
        featuredImage.style.opacity = '0';

        window.setTimeout(() => {
          featuredImage.src = image;
          featuredImage.alt = alt || name || '';
          featuredImage.style.opacity = '1';
        }, 120);
      } else {
        featuredImage.alt = alt || name || '';
      }

      featuredName.textContent = name || '';
      featuredTitle.textContent = title || '';

      if (quote && quote.trim()) {
        featuredQuote.textContent = quote.trim();
        featuredQuote.hidden = false;
      } else {
        featuredQuote.textContent = '';
        featuredQuote.hidden = true;
      }

      if (profile && profile.trim()) {
        featuredLink.href = profile;
        featuredLink.hidden = false;
      } else {
        featuredLink.removeAttribute('href');
        featuredLink.hidden = true;
      }
    };

    buttons.forEach((button) => {
      button.addEventListener('click', () => selectEndorsement(button));
    });

    if (selector && buttons.length > 0) {
      selector.addEventListener('keydown', (event) => {
        const currentIndex = buttons.indexOf(document.activeElement);

        if (currentIndex === -1) return;

        let nextIndex = currentIndex;

        switch (event.key) {
          case 'ArrowRight':
          case 'ArrowDown':
            nextIndex = (currentIndex + 1) % buttons.length;
            break;

          case 'ArrowLeft':
          case 'ArrowUp':
            nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
            break;

          case 'Home':
            nextIndex = 0;
            break;

          case 'End':
            nextIndex = buttons.length - 1;
            break;

          default:
            return;
        }

        event.preventDefault();

        const nextButton = buttons[nextIndex];
        nextButton.focus();
        selectEndorsement(nextButton);

        nextButton.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'nearest'
        });
      });
    }
  }
})();
