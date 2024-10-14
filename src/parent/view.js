const recipenavs = document.querySelectorAll('.formo-recipe-page-header-dynamic-images-nav');

recipenavs.forEach(nav => {
  const parent = nav.parentElement;
  const images = parent.querySelectorAll('.formo-recipe-page-header-dynamic-images__item');
  const navButtons = nav.querySelectorAll('.formo-recipe-page-header-dynamic-images-nav__button');

  function getCurrentIndex() {
    let currentIndex = 0;
    images.forEach((image, index) => {
      if (image.getAttribute('data-showing') === 'true') {
        currentIndex = index;
      }
    });
    return currentIndex;
  }

  function showNextImage() {
    const currentIndex = getCurrentIndex();
    const nextIndex = currentIndex + 1 < images.length ? currentIndex + 1 : 0;
    showImage(nextIndex);
  }

  let timer = setTimeout(() => {}, 0);

  function loopThroughImagesWithDelay() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      showNextImage();
      loopThroughImagesWithDelay();
    }, 3000);
  }

  function showImage(index) {
    images.forEach(image => {
      if (image.getAttribute('data-showing') === 'true') {
        image.setAttribute('data-showing', 'false');
      }
      else {
        if (image.getAttribute('data-index') === index.toString()) {
          image.setAttribute('data-showing', 'true');
        }
      }
    });
    navButtons.forEach(button => {
      if (button.getAttribute('data-active') === 'true') {
        button.removeAttribute('data-active');
      }
      else {
        if (button.getAttribute('data-index') === index.toString()) {
          button.setAttribute('data-active', 'true');
        }
      }
    })
  }

  navButtons.forEach((button) => {
    button.addEventListener('click', () => {
      showImage(button.getAttribute('data-index'));
      loopThroughImagesWithDelay();
    });
  });

  loopThroughImagesWithDelay();

})