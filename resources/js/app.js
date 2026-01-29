import Lightbox from 'bs5-lightbox';
import { bsToggle } from './utilities/navbar';
import { lmAnimation } from './utilities/gsap/aosToGSAPHome';
import.meta.glob(['../images/**', '../fonts/**']);

const options = {
  keyboard: true,
  size: 'fullscreen',
  constrain: false,
};

document.querySelectorAll('.catalog-industries').forEach((el) =>
  el.addEventListener('click', (e) => {
    e.preventDefault();
    const lightbox = new Lightbox(el, options);
    lightbox.show();
  }),
);

document.addEventListener('click', function (e) {
  // Hamburger menu
  if (e.target.classList.contains('hamburger-toggle')) {
    e.target.children[0].classList.toggle('active');
  }
});
// AOS to GSAP migration implementation
lmAnimation.init();
lmAnimation.credits();

bsToggle.init();
