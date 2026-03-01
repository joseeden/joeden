function initSidebarAccordion() {
  const sidebar = document.querySelector('.theme-doc-sidebar-menu');
  if (!sidebar) return;

  sidebar.addEventListener('click', (e) => {
    const link = e.target.closest('.menu__link');
    if (!link) return;

    const item = link.closest('.menu__list-item-collapsible');
    if (!item) return;

    const parentList = item.parentElement;
    if (!parentList) return;

    // Find sibling collapsible items (same level only)
    const siblings = Array.from(
      parentList.children
    ).filter(
      (el) =>
        el !== item &&
        el.classList.contains('menu__list-item-collapsible')
    );

    // Close all siblings
    siblings.forEach((sibling) => {
      sibling.classList.remove('menu__list-item-collapsible--active');
    });
  });
}

/**
 * Run on:
 * - Initial load
 * - Client-side route changes
 */
function waitForSidebar() {
  const sidebar = document.querySelector('.theme-doc-sidebar-menu');
  if (!sidebar) {
    requestAnimationFrame(waitForSidebar);
    return;
  }
  initSidebarAccordion();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', waitForSidebar);
} else {
  waitForSidebar();
}
