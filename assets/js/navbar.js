class NavigationController {
  constructor() {
    this.navToggle = document.querySelector(".nav_toggle");
    this.navLinks = document.querySelector(".nav_links");
    this.navBar = document.querySelector(".nav_bar");
    this.navItems = document.querySelectorAll(".nav_links li a");
    this.isMenuOpen = false;

    this.init();
  }

  init() {
    this.bindEvents();
    this.handleScroll();
  }

  bindEvents() {
    // Toggle menu on hamburger click
    this.navToggle.addEventListener("click", (e) => {
      e.preventDefault();
      this.toggleMenu();
    });

    // Close menu when clicking nav links
    this.navItems.forEach((link) => {
      link.addEventListener("click", () => {
        if (this.isMenuOpen) {
          this.closeMenu();
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        this.isMenuOpen &&
        !this.navToggle.contains(e.target) &&
        !this.navLinks.contains(e.target)
      ) {
        this.closeMenu();
      }
    });

    // Handle window resize
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768 && this.isMenuOpen) {
        this.closeMenu();
      }
    });

    // Handle scroll effects
    window.addEventListener("scroll", () => {
      this.handleScroll();
    });

    // Keyboard accessibility
    this.navToggle.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.toggleMenu();
      }
    });

    // ESC key to close menu
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isMenuOpen) {
        this.closeMenu();
      }
    });
  }

  toggleMenu() {
    if (this.isMenuOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    this.isMenuOpen = true;
    this.navToggle.classList.add("active");
    this.navLinks.classList.add("active");

    // Add tabindex for accessibility
    this.navItems.forEach((link) => {
      link.setAttribute("tabindex", "0");
    });

    // Prevent body scroll on mobile
    document.body.style.overflow = "hidden";

    // Add ARIA attributes
    this.navToggle.setAttribute("aria-expanded", "true");
    this.navLinks.setAttribute("aria-hidden", "false");
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.navToggle.classList.remove("active");
    this.navLinks.classList.remove("active");

    // Remove tabindex
    this.navItems.forEach((link) => {
      link.removeAttribute("tabindex");
    });

    // Restore body scroll
    document.body.style.overflow = "";

    // Update ARIA attributes
    this.navToggle.setAttribute("aria-expanded", "false");
    this.navLinks.setAttribute("aria-hidden", "true");
  }

  handleScroll() {
    const scrolled = window.scrollY > 50;

    if (scrolled) {
      this.navBar.classList.add("scrolled");
    } else {
      this.navBar.classList.remove("scrolled");
    }
  }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href === "#" || href === "#interior") return;

      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        const navHeight = document.querySelector(".nav_bar").offsetHeight;
        const targetPosition = target.offsetTop - navHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new NavigationController();
  initSmoothScrolling();

  // Add ARIA attributes for accessibility
  const navToggle = document.querySelector(".nav_toggle");
  const navLinks = document.querySelector(".nav_links");

  navToggle.setAttribute("aria-label", "Toggle navigation menu");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("role", "button");
  navToggle.setAttribute("tabindex", "0");

  navLinks.setAttribute("aria-hidden", "true");
});

// Performance optimization: throttle scroll events
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
window.addEventListener(
  "scroll",
  throttle(() => {
    const navBar = document.querySelector(".nav_bar");
    const scrolled = window.scrollY > 50;

    if (scrolled) {
      navBar.classList.add("scrolled");
    } else {
      navBar.classList.remove("scrolled");
    }
  }, 100)
);
