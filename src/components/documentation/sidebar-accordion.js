// Sidebar accordion - only one top-level section expanded at a time
function initSidebarAccordion() {
  const sidebar = document.querySelector('.theme-doc-sidebar-menu');
  if (!sidebar) {
    setTimeout(initSidebarAccordion, 100);
    return;
  }

  sidebar.addEventListener('click', function(e) {
    const clickedLink = e.target.closest('.menu__link');
    if (!clickedLink) return;
    
    const clickedItem = clickedLink.parentElement;
    if (!clickedItem || !clickedItem.classList.contains('menu__list-item-collapsible')) return;

    // Only handle top-level items
    const isTopLevel = clickedItem.parentElement.classList.contains('menu__list') && 
                      clickedItem.parentElement.parentElement.classList.contains('theme-doc-sidebar-menu');
    
    if (!isTopLevel) return;

    setTimeout(() => {
      const topLevelItems = sidebar.querySelectorAll('.menu__list > .menu__list-item-collapsible');
      
      topLevelItems.forEach(item => {
        if (item !== clickedItem && item.classList.contains('menu__list-item-collapsible--active')) {
          item.classList.remove('menu__list-item-collapsible--active');
        }
      });
    }, 10);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSidebarAccordion);
} else {
  initSidebarAccordion();
}