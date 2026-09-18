document.addEventListener('DOMContentLoaded', () => {
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
  const filterBtns = document.querySelectorAll('.filter-btn');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('closeBtn');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  let visibleItems = [...galleryItems];
  let currentIndex = 0;

  // 1. Lightbox Open Function
  function openLightbox(index) {
    currentIndex = index;
    const currentItem = visibleItems[currentIndex];
    const imgSrc = currentItem.querySelector('img').src;
    const title = currentItem.querySelector('h3').textContent;

    lightboxImg.src = imgSrc;
    lightboxCaption.textContent = title;
    lightbox.classList.add('active');
  }

  // 2. Lightbox Close Function
  function closeLightbox() {
    lightbox.classList.remove('active');
  }

  // 3. Navigation Controls (Next & Previous)
  function showNextImage() {
    currentIndex = (currentIndex + 1) % visibleItems.length;
    openLightbox(currentIndex);
  }

  function showPrevImage() {
    currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
    openLightbox(currentIndex);
  }

  // Event Listeners for Images
  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const activeIndex = visibleItems.indexOf(item);
      if (activeIndex !== -1) {
        openLightbox(activeIndex);
      }
    });
  });

  // Modal Control Event Listeners
  closeBtn.addEventListener('click', closeLightbox);
  nextBtn.addEventListener('click', showNextImage);
  prevBtn.addEventListener('click', showPrevImage);

  // Close Lightbox on Background Click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard Navigation (Arrow Keys & Escape)
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNextImage();
    if (e.key === 'ArrowLeft') showPrevImage();
  });

  // 4. Category Filter Logic (Bonus Requirement)
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-category');

      visibleItems = [];

      galleryItems.forEach((item) => {
        const itemCategory = item.getAttribute('data-category');

        if (filterValue === 'all' || itemCategory === filterValue) {
          item.classList.remove('hide');
          visibleItems.push(item);
        } else {
          item.classList.add('hide');
        }
      });
    });
  });
});
