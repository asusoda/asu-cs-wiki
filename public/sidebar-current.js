(() => {
  const revealCurrentSidebarItem = () => {
    const sidebar = document.getElementById('starlight__sidebar');
    const currentLink = sidebar?.querySelector('a[aria-current="page"]');

    if (!sidebar || !currentLink) return;

    for (const details of currentLink.closest('li')?.querySelectorAll('details') ?? []) {
      details.open = true;
    }

    let parent = currentLink.parentElement;
    while (parent && parent !== sidebar) {
      if (parent instanceof HTMLDetailsElement) parent.open = true;
      parent = parent.parentElement;
    }

    const sidebarRect = sidebar.getBoundingClientRect();
    const linkRect = currentLink.getBoundingClientRect();
    const linkIsVisible = linkRect.top >= sidebarRect.top && linkRect.bottom <= sidebarRect.bottom;

    if (!linkIsVisible) {
      currentLink.scrollIntoView({ block: 'nearest' });
    }
  };

  const revealAfterSidebarRestore = () => {
    revealCurrentSidebarItem();
    setTimeout(revealCurrentSidebarItem, 0);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', revealAfterSidebarRestore);
  } else {
    revealAfterSidebarRestore();
  }

  document.addEventListener('astro:page-load', revealAfterSidebarRestore);
})();
