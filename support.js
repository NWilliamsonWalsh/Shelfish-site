// A connector setup link opens the matching native disclosure before scrolling.
const revealConnectorSetup = () => {
  const target = document.getElementById(window.location.hash.slice(1));
  if (!target?.matches('[data-connector-setup] details')) return;
  target.open = true;
  target.scrollIntoView({ block: 'start', behavior: 'auto' });
};

window.addEventListener('hashchange', revealConnectorSetup);
revealConnectorSetup();
