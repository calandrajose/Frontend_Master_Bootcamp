var mySwiper = new Swiper('.swiper-container', {
  // Optional parameters
  speed: 1000,
  spaceBetween: 100,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  effect:'coverflow',
  coverflowEffect: {
    rotate: 30,
    slideShadows: false,
    stretch: 0,
  },
  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },
  /*   "centeredSlides": true, */
  loop: true,
  autoplay: {
    delay: 1000,
  },

  slidesPerView: 3,
});

const { styler, spring, listen, pointer, value } = window.popmotion;

const ball = document.querySelector('.brand');
const divStyler = styler(ball);
const ballXY = value({ x: 0, y: 0 }, divStyler.set);

listen(ball, 'mousedown touchstart')
  .start((e) => {
    e.preventDefault();
    pointer(ballXY.get()).start(ballXY);
  });

listen(document, 'mouseup touchend')
  .start(() => {
    spring({
      from: ballXY.get(),
      velocity: ballXY.getVelocity(),
      to: { x: 0, y: 0 },
      stiffness: 200,
      // mass: 1,
      // damping: 10
    }).start(ballXY);
  });

  