import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let lmAnimation = {
  timeline: {},
  options: {
    animation: "scale-up",
    direction: "x",
    transformorigin: "bottom bottom",
    scrub: false,
    scalex: false,
    scaley: false,
    trigger: "",
    start: "top 15%",
    end: "bottom 15%",
    toggleactions: "play restart reverse reverse",
    sections: [],
    offset: 120,
    offsetstart: 0,
    offsetend: 0,
    delay: 0,
    easing: "ease",
    duration: false,
    disable: false,
    once: false,
    mirror: false,
    startevent: "DOMContentLoaded",
    markers: false,
    x: false,
    y: false,
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
  init: function (settings, timeline) {
    this.options = Object.assign(this.options, settings);

    let dataLmSections = gsap.utils.toArray("[data-aos]");
    if (dataLmSections && dataLmSections.length < 1) {
      return false;
    }
    gsap.registerPlugin(ScrollTrigger);
    this.timeline = timeline ? timeline : gsap.timeline({});

    /**
     * Set global settings on body, based on options
     * so CSS can use it
     */
    document
      .querySelector("body")
      .setAttribute("data-aos-easing", this.options.easing);

    document
      .querySelector("body")
      .setAttribute("data-aos-duration", this.options.duration);

    document
      .querySelector("body")
      .setAttribute("data-aos-delay", this.options.delay);

    dataLmSections.forEach((i) => {
      let marker = this.options.markers;
      const mirror = this.getInlineOption(i, "mirror", this.options.mirror);
      const once = this.getInlineOption(i, "once", this.options.once);
      let offset = this.getInlineOption(i, "offset", this.options.offset);
      const aosToggleClass = this.getInlineOption(
        i,
        "toggle",
        this.options.aosToggleClass
      );
      if (i.getAttribute("data-aos") === "fade-up") {
        offset -= 100;
      }

      i.setAttribute("data-aos-easing", this.options.easing);
      i.setAttribute("data-aos-duration", this.options.duration);
      i.setAttribute("data-aos-delay", this.options.delay);

      // It signals to the rest of the script that the element has been init
      i.classList.add("aos-init");
      if (i) {
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
          toggleAction: "play pause reverse none",
          // scrub: mirror,
          once: once,
          markers: marker,
        });
      }
    });
    function setToggleClass(active, aosToggleClass, i) {
      if (aosToggleClass) {
        if (active) {
          i.classList.add("aos-animate");
        } else {
          i.classList.remove("aos-animate");
        }
      }
    }
    // this.scaleAnimation(dataLmSections);

    // Above the fold animation

    return this.timeline;
    // If we wait for JS animation above the fold
    // the page gets penalized by Google
    // https://web.dev/articles/vitals
  },
  setGlobalBodyCSSSettings: function () {},
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
   * Ititerate and save all "data" attributes of a given Dom element
   * and return an object.
   *
   * @param  {Node} el [Dom element]
   * @param  {String} dataPrefix [Options prefix default  data-lm]
   * @return {Object} obj [Option set with inline attributes or empty object]
   */
  getInlineOptions(el, dataPrefix = "data-lm", atributeName = "") {
    let obj = {};
    [].filter
      .call(el.attributes, (at) => new RegExp("^" + dataPrefix).test(at.name))
      .forEach((node) => {
        let value = null;
        //https://stackoverflow.com/questions/175739/how-can-i-check-if-a-string-is-a-valid-number
        // First check the if the node value is true/false
        // Then check if it is a number
        // Last assume it is a string
        if (
          atributeName !== "" &&
          typeof atributeName === "string" &&
          node.nodeName === atributeName
        ) {
        }
        if (node && typeof node.nodeValue !== "undefined") {
          if (node.nodeValue === "true") {
            value = true;
          } else if (node.nodeValue === "false") {
            value = false;
          } else if (
            typeof node.nodeValue === "string" &&
            !isNaN(node.nodeValue) &&
            !isNaN(parseFloat(node.nodeValue))
          ) {
            value = +node.nodeValue;
          } else {
            value = node.nodeValue;
          }
        }

        // Replace default obj property values with "data-lm-" values
        Object.assign(obj, {
          [node.nodeName.replace(dataPrefix + "-", "")]: value,
        });
        console.log(obj);
      });

    return obj;
  },
  /**
   * Property function scaleAnimation takes an Array of type gsap.utils.toArray .
   *
   * @param  {Node} el [Dom element]
   * @param  {String} key [Option key]
   * @param  {String} fallback [Default (fallback) value]
   * @return {Mixed} [Option set with inline attributes or fallback value if not set]
   */
  scaleAnimation(sections = []) {
    if (sections && sections.length > 0) {
      sections.forEach((element) => {
        let elementOptions = {};
        elementOptions = Object.assign(elementOptions, this.options);
        // TODO option property name check.
        // Currently, any data atribute getInlineOptions finds either
        // will replace an existing property value or create a new property
        // if the attribute name doesn't match a property name.
        elementOptions = Object.assign(
          elementOptions,
          this.getInlineOptions(element)
        );
        this.getInlineOptions(element, "data-lm", "animation");
        if (element) {
          if (elementOptions.animation === "scale-up") {
            if (elementOptions.direction === "x") {
              elementOptions.scalex = 1;
            } else if (elementOptions.direction === "y") {
              elementOptions.scaley = 1;
            } else if (elementOptions.direction === "xy") {
              elementOptions.scalex = 1;
              elementOptions.scaley = 1;
            }
          } else if (elementOptions.animation === "scale-down") {
            if (elementOptions.direction === "x") {
              elementOptions.scalex = 0;
            } else if (elementOptions.direction === "y") {
              elementOptions.scaley = 0;
            }
          }
          // Flag to indicate lm interface has been initiated
          element.classList.add("lm-init");

          window.addEventListener(elementOptions.startevent, (event) => {
            gsap.to(element, {
              opacity: 1,
              ...(elementOptions.duration !== false && {
                duration: elementOptions.duration,
              }),
              ...(elementOptions.scalex !== false && {
                scaleX: elementOptions.scalex,
              }),
              ...(elementOptions.scaley !== false && {
                scaleY: elementOptions.scaley,
              }),
              transformOrigin: elementOptions.transformorigin,
              ...(elementOptions.x && { x: elementOptions.x }),
              ...(elementOptions.y && { y: elementOptions.y }),
              scrollTrigger: {
                trigger: element,
                start: function (self) {
                  return gsap.utils.clamp(
                    0,
                    ScrollTrigger.maxScroll(window),
                    elementOptions.start + "-=" + elementOptions.offsetstart
                  );
                },
                end: function (self) {
                  console.log(self.getVelocity());
                  return gsap.utils.clamp(
                    0,
                    ScrollTrigger.maxScroll(window),
                    elementOptions.end + "-=" + elementOptions.offsetend
                  );
                },
                scrub: elementOptions.scrub,
                markers: elementOptions.markers,
                toggleActions: elementOptions.toggleactions,
              },
            });
          });
        }
      });
    }
  },
  credits() {
    var e = [
      `
 %c Developed with %c ❤️ %c %c By Luis Piedrahita %c 👁 %c %c https://lmseo.co %c `,
      "border: 1px solid #000;color: #fff; background: #ff0000; padding:5px 0;",
      "color: #000; background: #fff; padding:5px 0;",
      "background: transparent; ",
      "background:rgb(28, 136, 186); color:#fff; padding:5px 0; border: 1px solid #000; border-right-width:0;",
      "color: red; background: #fff; padding:5px 0; border: 1px solid #000;border-left-width:0;",
      "background: transparent; ",
      "color: #ffffff; background: #1c1c1c; padding:5px 0;",
      `line-height:40px;padding-block:25px 25px;padding-left:200px;background-repeat:no-repeat;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 200'%3E%3Cstyle%3E .wrapper %7B font-family: sans-serif; perspective: 500px; text-align: center; position: relative; width: 100%25; height: 100%25; %7D .cube %7B position: absolute; top: 20%25; left: 30%25; transform-style: preserve-3d; transform: rotateY(40deg) rotateX(-40deg); animation: wiggle_wiggle_wiggle_wiggle_wiggle_yeah 3s ease-in-out infinite alternate; %7D .side %7B width: 8rem; height: 8rem; background: rgba(0, 0, 0, 0.8); display: inline-block; position: absolute; line-height: 8rem; color: %23fff; text-align: center; box-sizing: border-box; border: 3px solid %23f00; font-size: 4rem; %7D .front %7B transform: translateZ(4rem); z-index: 1; %7D .back %7B transform: rotateY(180deg) translateZ(4rem); %7D .left %7B transform: rotateY(-90deg) translateZ(4rem); z-index: 1; %7D .right %7B transform: rotateY(90deg) translateZ(4rem); %7D .top %7B transform: rotateX(90deg) translateZ(4rem); %7D .bottom %7B transform: rotateX(-90deg) translateZ(4rem); %7D @keyframes wiggle_wiggle_wiggle_wiggle_wiggle_yeah %7B 0%25 %7B transform: rotateY(15deg) rotateX(-15deg); %7D 100%25 %7B transform: rotateY(60deg) rotateX(-45deg); %7D %7D %3C/style%3E%3CforeignObject width='100%25' height='100%25'%3E%3Cdiv xmlns='http://www.w3.org/1999/xhtml' class='wrapper'%3E%3Cdiv class='cube'%3E%3Cdiv class='side front'%3EL%3C/div%3E%3Cdiv class='side back'%3EO%3C/div%3E%3Cdiv class='side left'%3EM%3C/div%3E%3Cdiv class='side right'%3EE%3C/div%3E%3Cdiv class='side top'%3ES%3C/div%3E%3Cdiv class='side bottom'%3E❤️%3C/div%3E%3C/div%3E%3C/div%3E%3C/foreignObject%3E%3C/svg%3E")`,
    ];
    console.log.apply(console, e);
  },
};

export { lmAnimation };
