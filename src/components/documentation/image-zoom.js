// Image zoom functionality
function initImageZoom() {
  const images = document.querySelectorAll('.markdown img, .theme-doc-markdown img');
  
  images.forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', function() {
      const overlay = document.createElement('div');
      overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);z-index:9999;display:flex;align-items:center;justify-content:center;cursor:zoom-out';
      
      const zoomedImg = document.createElement('img');
      zoomedImg.src = this.src;
      zoomedImg.style.cssText = 'max-width:90%;max-height:90%;object-fit:contain';
      
      overlay.appendChild(zoomedImg);
      document.body.appendChild(overlay);
      
      overlay.addEventListener('click', () => overlay.remove());
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initImageZoom);
} else {
  initImageZoom();
}
