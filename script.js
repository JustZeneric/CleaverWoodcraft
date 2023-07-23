document.addEventListener("DOMContentLoaded", function () {
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach(function (carousel) {
    const carouselInner = carousel.querySelector(".carousel-inner");
    const prevBtn = carousel.querySelector(".carousel-control.prev");
    const nextBtn = carousel.querySelector(".carousel-control.next");
    const carouselItems = carousel.querySelectorAll(".carousel-item");
    const overlay = document.getElementById('overlay');
    const enlargedImage = document.getElementById('enlarged-image');
    const mobileItemsToShow = 1; // Number of items to show on mobile
    const desktopItemsToShow = 3; // Number of items to show on desktop
    const mobileWidth = 768; // Threshold width for mobile devices
    let currentPosition = 0;

    function moveCarousel(direction) {
      let itemsToShow = mobileItemsToShow;
      if (window.innerWidth >= mobileWidth) {
        itemsToShow = desktopItemsToShow;
      }

      const itemWidth = carousel.clientWidth / itemsToShow;
      const increment = direction === "prev" ? 1 : -1;
      currentPosition += increment * itemWidth;

      // Check if the carousel has reached the end and reset position to 0
      if (currentPosition > 0 && direction === "prev") {
        currentPosition = 0;
      } else if (currentPosition < -(itemWidth * (carouselItems.length - itemsToShow)) && direction === "next") {
        currentPosition = -(itemWidth * (carouselItems.length - itemsToShow));
      }

      carouselInner.style.transform = `translateX(${currentPosition}px)`;

      if (currentPosition === 0) {
        prevBtn.style.display = "none";
      } else {
        prevBtn.style.display = "block";
      }

      const maxPosition = -(itemWidth * (carouselItems.length - itemsToShow));
      if (currentPosition <= maxPosition) {
        nextBtn.style.display = "none";
      } else {
        nextBtn.style.display = "block";
      }
    }

    carouselItems.forEach(function (item) {
      const image = item.querySelector('img');

      image.addEventListener('click', function () {
        enlargedImage.src = image.src;
        overlay.classList.add('show');
        enlargedImage.style.maxWidth = '90%';
        enlargedImage.style.maxHeight = '90%';
        enlargedImage.style.width = 'auto';
        enlargedImage.style.height = 'auto';
      });
    });

    overlay.addEventListener('click', function () {
      overlay.classList.remove('show');
    });





    function handleNextClick(event) {
      event.preventDefault();
      moveCarousel("next");
    }

    function handlePrevClick(event) {
      event.preventDefault();
      moveCarousel("prev");
    }

    function updateCarouselBehaviors() {
      const itemsToShow = window.innerWidth < mobileWidth ? mobileItemsToShow : desktopItemsToShow;
      const itemWidth = carousel.clientWidth / itemsToShow;
      const maxPosition = -(itemWidth * (carouselItems.length - itemsToShow));

      if (currentPosition < maxPosition) {
        currentPosition = maxPosition;
      }

      carouselInner.style.transform = `translateX(${currentPosition}px)`;

      if (currentPosition === 0) {
        prevBtn.style.display = "none";
      } else {
        prevBtn.style.display = "block";
      }

      if (currentPosition <= maxPosition) {
        nextBtn.style.display = "none";
      } else {
        nextBtn.style.display = "block";
      }
    }

    // Initial setup
    updateCarouselBehaviors();

    // Update behaviors on window resize
    window.addEventListener("resize", updateCarouselBehaviors);

    // Add event listeners
    prevBtn.addEventListener("click", handlePrevClick);
    nextBtn.addEventListener("click", handleNextClick);
  });
});


// JavaScript code to toggle the menu visibility
const burgerMenu = document.querySelector('.burger-menu');
const menu = document.querySelector('.menu-list');

burgerMenu.addEventListener('click', function () {
  menu.classList.toggle('show-menu');
});