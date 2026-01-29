import gsap from "gsap";

let hostingGsap = {
  init: function () {
    // Scale image full screen animation
    const tl0 = gsap.timeline({});

    let expandFull = gsap.utils.toArray(".expand-full");
    expandFull.forEach((el) => {
      let q = gsap.utils.selector(el);
      let imgExpand = q("img.expand-img");
      let imgWrapperExpand = q(".expand-img-wrapper");
      tl0.to(imgWrapperExpand, {
        y: 0,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        yPercent: 0,
        scrollTrigger: {
          trigger: imgWrapperExpand,
          start: "top center",
          end: () => "+=" + imgWrapperExpand.offsetHeight / 3,
          scrub: 1,
          toggleAction: "play restart reverse none",
        },
        // Only run parallax animation when scale animation is completed
        onComplete: () => {
          this.parallax(imgExpand, el, tl0);
        },
      });
    });
  },
  /**
   * Simple Parallax effect.
   *
   * @param {TweenTarget} el - Element to apply animation.
   * @param {DOMTarget} trigger - Element to trigger animation.
   * @param {Timeline} timeline - Timeline GSAP instance.
   * @returns {string} void- A greeting message.
   */
  parallax(el, trigger, timeline) {
    timeline.to(el, {
      y: 50,
      scrollTrigger: {
        trigger: trigger,
        start: "top 50%",
        end: "bottom bottom",
        scrub: true,
        toggleAction: "play restart reverse none",
      },
    });
  },
};
export { hostingGsap };
