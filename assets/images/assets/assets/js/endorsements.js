(() => {
  const showcase = document.querySelector('[data-endorsement-showcase]');

  if (!showcase) return;

  const featuredImage =
    showcase.querySelector('#featuredEndorserImage');

  const featuredQuote =
    showcase.querySelector('#featuredEndorserQuote');

  const featuredName =
    showcase.querySelector('#featuredEndorserName');

  const featuredTitle =
    showcase.querySelector('#featuredEndorserTitle');

  const featuredLink =
    showcase.querySelector('#featuredEndorserLink');

  const selector =
    showcase.querySelector('.endorsement-selector');

  const buttons =
    Array.from(
      showcase.querySelectorAll('.endorsement-selector__item')
    );


  function selectEndorsement(button) {
    if (!button) return;

    const {
      image,
      alt,
      name,
      title,
      profile,
      quote
    } = button.dataset;


    /*
     * Update selected state
     */
    buttons.forEach(item => {
      const active = item === button;

      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });


    /*
     * Subtle image transition
     */
    featuredImage.style.opacity = '0';

    window.setTimeout(() => {
      featuredImage.src = image;
      featuredImage.alt = alt || name || '';
      featuredImage.style.opacity = '1';
    }, 120);


    /*
     * Name and title
     */
    featuredName.textContent = name || '';
    featuredTitle.textContent = title || '';


    /*
     * Optional endorsement quotation.
     *
     * If data-quote is absent, the quotation area
     * stays completely hidden.
     */
    if (quote && quote.trim()) {
      featuredQuote.textContent = quote.trim();
      featuredQuote.hidden = false;
    } else {
      featuredQuote.textContent = '';
      featuredQuote.hidden = true;
    }


    /*
     * Optional external profile
     */
    if (profile && profile.trim()) {
      featuredLink.href = profile;
      featuredLink.hidden = false;
    } else {
      featuredLink.removeAttribute('href');
      featuredLink.hidden = true;
    }
  }


  /*
   * Mouse / touch
   */
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      selectEndorsement(button);
    });
  });


  /*
   * Keyboard navigation:
   * Left / Right / Home / End
   */
  selector.addEventListener('keydown', event => {
    const currentIndex =
      buttons.indexOf(document.activeElement);

    if (currentIndex === -1) return;

    let nextIndex = currentIndex;

    switch (event.key) {

      case 'ArrowRight':
      case 'ArrowDown':
        nextIndex =
          (currentIndex + 1) % buttons.length;
        break;

      case 'ArrowLeft':
      case 'ArrowUp':
        nextIndex =
          (currentIndex - 1 + buttons.length)
          % buttons.length;
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

    buttons[nextIndex].focus();
    selectEndorsement(buttons[nextIndex]);

    buttons[nextIndex].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest'
    });
  });

})();
