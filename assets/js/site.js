(() => {
  const root = document.documentElement;
  const body = document.body;
  const drawer = document.getElementById('mobile-drawer');
  const openButton = document.getElementById('mobile-toggle');
  const closeButton = drawer?.querySelector('.menu-toggle-close');
  const overlay = drawer?.querySelector('.drawer-overlay');

  const updateViewportWidth = () => {
    root.style.setProperty('--scrollbar-offset', (window.innerWidth - root.clientWidth) + 'px');
  };

  const openMenu = () => {
    if (!drawer || !openButton) return;
    drawer.classList.add('show-drawer');
    requestAnimationFrame(() => drawer.classList.add('active'));
    body.classList.add('showing-popup-drawer-from-right');
    openButton.setAttribute('aria-expanded', 'true');
    closeButton?.setAttribute('aria-expanded', 'true');
    closeButton?.focus();
  };

  const closeMenu = () => {
    if (!drawer || !openButton) return;
    drawer.classList.remove('active');
    body.classList.remove('showing-popup-drawer-from-right');
    openButton.setAttribute('aria-expanded', 'false');
    closeButton?.setAttribute('aria-expanded', 'false');
    window.setTimeout(() => drawer.classList.remove('show-drawer'), 300);
    openButton.focus();
  };

  updateViewportWidth();
  window.addEventListener('resize', updateViewportWidth, { passive: true });
  openButton?.addEventListener('click', openMenu);
  closeButton?.addEventListener('click', closeMenu);
  overlay?.addEventListener('click', closeMenu);
  drawer?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && drawer?.classList.contains('active')) closeMenu();
  });
})();
