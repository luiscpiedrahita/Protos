import { Navbar } from "bootstrap";
import { bsToggle } from "../../../utilities/navbar";
import { aosToGsap } from "../../../utilities/aosToGsap";
import { hostingGsap } from "./hostingGsap";

document.addEventListener("click", function (e) {
  // Hamburger menu
  if (e.target.classList.contains("hamburger-toggle")) {
    e.target.children[0].classList.toggle("active");
  }
});
// AOS to GSAP migration implementation
aosToGsap.init();

// Other GSAP Implementation
hostingGsap.init();

// Bootstrap Mobile Navbar
bsToggle.init();
