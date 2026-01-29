import debounce from "lodash.debounce";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

//File migrates AOS implementation to GSAP
//
let aosToGsap = {
  init: function (settings) {
    // AOS override this.default
    this.default = Object.assign(this.default, settings);
    // gsap.utils.toArray replaces this.elements()
    let dataAosSections = gsap.utils.toArray("[data-aos]");
    let fadeLeftSections = gsap.utils.toArray(".fade-left");
    let fadeRightSections = gsap.utils.toArray(".fade-right");
    gsap.registerPlugin(ScrollTrigger);
    const tl0 = gsap.timeline({});
    // Above the fold animation
    this.aboveFoldAnimation(fadeLeftSections, tl0);
    this.aboveFoldAnimation(fadeRightSections, tl0, "left");

    /**
     * Set global settings on body, based on options
     * so CSS can use it
     */
    document
      .querySelector("body")
      .setAttribute("data-aos-easing", this.default.easing);

    document
      .querySelector("body")
      .setAttribute("data-aos-duration", this.default.duration);

    document
      .querySelector("body")
      .setAttribute("data-aos-delay", this.default.delay);

    dataAosSections.forEach((i) => {
      let marker = this.default.markers;
      const mirror = this.getInlineOption(i, "mirror", this.default.mirror);
      const once = this.getInlineOption(i, "once", this.default.once);
      let offset = this.getInlineOption(i, "offset", this.default.offset);
      const aosToggleClass = this.getInlineOption(
        i,
        "toggle",
        this.default.aosToggleClass
      );
      if (i.getAttribute("data-aos") === "fade-up") {
        offset -= 100;
      }

      i.setAttribute("data-aos-easing", this.default.easing);
      i.setAttribute("data-aos-duration", this.default.duration);
      i.setAttribute("data-aos-delay", this.default.delay);

      // It signals to the rest of the script that the element has been init
      i.classList.add("aos-init");
      if (i) {
        // if (
        //   document.querySelector(".featured-s6")?.isEqualNode(i)
        //   // true
        // ) {
        //   marker = true;
        // }
        // There is no JS animation so We use the create method instead
        ScrollTrigger.create({
          trigger: i,
          start: function (self) {
            return gsap.utils.clamp(
              0,
              ScrollTrigger.maxScroll(Window),
              "top 100%" + "-=" + offset
            );
          },
          end: "bottom 30%",
          // toggleClass: "aos-animate",
          onToggle: (self) => {
            setToggleClass(self.isActive, aosToggleClass, i);
          },
          onEnter: (self) => {
            if (self.isActive && !aosToggleClass) {
              i.classList.add("aos-animate");
            }
          },
          // onLeave: function (self) {
          //   if (
          //     document.querySelector(".featured-s6")?.isEqualNode(i)
          //     // true
          //   ) {
          //     console.log("leave");
          //   }
          //   if (!ScrollTrigger.isInViewport(i)) {
          //     i.classList.remove("aos-animate");
          //   }
          // },
          toggleAction: "play pause reverse none",
          // scrub: mirror,
          once: once,
          markers: marker,
        });
      }
    });
    /**
     * GSAP handles resize and orientationchange under the hood
     * Refresh plugin on window resize or orientation change
     */
    // window.addEventListener("resize", () => {
    //   debounce(ScrollTrigger.refresh, this.default.debounceDelay, true);
    // });

    // window.addEventListener("orientationchange", () => {
    //   debounce(ScrollTrigger.refresh, this.default.debounceDelay, true);
    // });
    function setToggleClass(active, aosToggleClass, i) {
      if (aosToggleClass) {
        // if (
        //   document.querySelector(".featured-s6")?.isEqualNode(i)
        //   // true
        // ) {
        //   // console.log("innerHeight: " + window.innerHeight);
        //   // console.log("scrollY: " + window.scrollY);
        //   // console.log("visualViewport: %0", window.visualViewport);
        //   // console.log(aosToggleClass);
        // }
        if (active) {
          i.classList.add("aos-animate");
        } else {
          i.classList.remove("aos-animate");
        }
      }
    }
    return tl0;
  },
  default: {
    offset: 120,
    delay: 0,
    easing: "ease",
    duration: 400,
    disable: false,
    once: false,
    mirror: false,
    anchorPlacement: "top-bottom",
    startEvent: "DOMContentLoaded",
    animatedClassName: "aos-animate",
    initClassName: "aos-init",
    useClassNames: false,
    disableMutationObserver: false,
    throttleDelay: 99,
    debounceDelay: 50,
    markers: false,
    aosToggleClass: true,
  },
  // If we wait for JS animation above the fold
  // the page gets penalized by Google
  // https://web.dev/articles/vitals
  aboveFoldAnimation(trigger, timeline, fadeOutEffect) {
    //Default is right 400px
    const x = fadeOutEffect == "left" ? -400 : 400;
    trigger.forEach((element) => {
      if (element) {
        timeline.to(element, {
          opacity: 0,
          x: x,
          y: 100,
          scrollTrigger: {
            trigger: element,
            start: "top 10%",
            end: "bottom 30% ",
            scrub: 3,
            toggleAction: "play restart reverse none",
          },
        });
      }
    });
  },

  /**
   * Get inline option with a fallback.
   *
   * @param  {Node} el [Dom element]
   * @param  {String} key [Option key]
   * @param  {String} fallback [Default (fallback) value]
   * @return {Mixed} [Option set with inline attributes or fallback value if not set]
   */
  getInlineOption(el, key, fallback) {
    const attr = el.getAttribute("data-lms-" + key);
    if (typeof attr !== "undefined") {
      if (attr === "true") {
        return true;
      } else if (attr === "false") {
        return false;
      }
    }

    return attr || fallback;
  },
  /**
  /**
   * Generate initial array with elements as objects
   * This array will be extended later with elements attributes values
   * like 'position'
   *
   * @return {array} [An array of nodes]
   */
  // gsap.utils.toArray replaces this.elements()
  elements() {
    const elements = document.querySelectorAll("[data-aos]");
    return Array.prototype.map.call(elements, (node) => ({ node }));
  },
};
export { aosToGsap };
