// Sidebar accordion - only one top-level section expanded at a time
document.addEventListener('DOMContentLoaded', function() {
  const sidebar = document.querySelector('.theme-doc-sidebar-menu');
  if (!sidebar) return;

  sidebar.addEventListener('click', function(e) {
    const clickedItem = e.target.closest('.menu__list-item-collapsible');
    if (!clickedItem) return;

    // Only handle top-level items (direct children of main menu)
    const isTopLevel = clickedItem.parentElement.classList.contains('menu__list') && 
                      clickedItem.parentElement.parentElement.classList.contains('theme-doc-sidebar-menu');
    
    if (!isTopLevel) return;

    // Find all other top-level collapsible items
    const topLevelItems = sidebar.querySelectorAll('.menu__list > .menu__list-item-collapsible');
    
    topLevelItems.forEach(item => {
      if (item !== clickedItem && item.classList.contains('menu__list-item-collapsible--active')) {
        // Close other expanded sections
        item.classList.remove('menu__list-item-collapsible--active');
        const nestedList = item.querySelector('.menu__list');
        if (nestedList) {
          nestedList.style.display = 'none';
        }
      }
    });
  });
});