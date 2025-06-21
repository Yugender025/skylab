// Service interaction and image switching
const serviceItems = document.querySelectorAll(".service-item");
const roomImages = document.querySelectorAll(".room-image");
const currentTitle = document.getElementById("current-title");
const currentSubtitle = document.getElementById("current-subtitle");

const serviceData = {
  office: {
    title: "Office Interiors",
    subtitle: "Are you looking for modern office interior solutions?",
  },
  retail: {
    title: "Retail Store Design",
    subtitle: "Are you looking to enhance your retail customer experience?",
  },
  hospitality: {
    title: "Hotel & Hospitality Design",
    subtitle: "Are you looking to create luxury hospitality spaces?",
  },
  restaurant: {
    title: "Restaurant Interiors",
    subtitle: "Are you looking to design ambience-rich dining spaces?",
  },
  healthcare: {
    title: "Healthcare & Clinics",
    subtitle:
      "Are you looking for functional and calming healthcare interiors?",
  },
};

serviceItems.forEach((item) => {
  item.addEventListener("click", function () {
    // Remove active class from all items
    serviceItems.forEach((service) => service.classList.remove("active"));

    // Add active class to clicked item
    this.classList.add("active");

    // Hide all images with smooth transition
    roomImages.forEach((img) => {
      img.classList.add("hidden");
    });

    // Show corresponding image
    const imageType = this.getAttribute("data-image");
    const targetImage = document.getElementById(imageType + "-image");

    setTimeout(() => {
      if (targetImage) {
        targetImage.classList.remove("hidden");
      }

      // Update overlay content
      if (serviceData[imageType]) {
        currentTitle.textContent = serviceData[imageType].title;
        currentSubtitle.textContent = serviceData[imageType].subtitle;
      }
    }, 200);
  });

  // Add enhanced hover effects
  item.addEventListener("mouseenter", function () {
    if (!this.classList.contains("active")) {
      this.style.transform = "translateX(8px) translateY(-3px) scale(1.01)";
    }
  });

  item.addEventListener("mouseleave", function () {
    if (!this.classList.contains("active")) {
      this.style.transform = "translateX(0) translateY(0) scale(1)";
    }
  });
});

// Enhanced CTA button interaction
const ctaButton = document.getElementById("main-cta");
ctaButton.addEventListener("click", function (e) {
  e.preventDefault();

  // Create multiple ripple effects
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      const ripple = document.createElement("span");
      ripple.style.cssText = `
                        position: absolute;
                        background: rgba(255,255,255,0.4);
                        border-radius: 50%;
                        transform: scale(0);
                        animation: ripple 1s linear;
                        left: 50%;
                        top: 50%;
                        width: 20px;
                        height: 20px;
                        margin-left: -10px;
                        margin-top: -10px;
                        pointer-events: none;
                    `;

      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 1000);
    }, i * 100);
  }

  // Add success feedback
  const originalText = this.innerHTML;
  this.innerHTML = "✓ Message Sent!";
  this.style.background = "linear-gradient(135deg, #10b981 0%, #059669 100%)";

  setTimeout(() => {
    this.innerHTML = originalText;
    this.style.background = "var(--accent-gradient)";
  }, 2000);
});

// Counter animation
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number");

  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-target"));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };

    updateCounter();
  });
}

// Scroll reveal animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed");

      // Trigger counter animation when stats section is visible
      if (entry.target.classList.contains("stats-section")) {
        animateCounters();
      }
    }
  });
}, observerOptions);

document.querySelectorAll(".scroll-reveal").forEach((el) => {
  observer.observe(el);
});

// Add CSS animations dynamically
const style = document.createElement("style");
style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(6);
                    opacity: 0;
                }
            }
            
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
            
            .service-item.active {
                animation: pulse 2s ease-in-out infinite;
            }
        `;
document.head.appendChild(style);

// Smooth page load
window.addEventListener("load", () => {
  document.body.style.opacity = "1";
});

// Enhanced mobile touch interactions
if ("ontouchstart" in window) {
  serviceItems.forEach((item) => {
    item.addEventListener("touchstart", function () {
      this.style.transform = "scale(0.98)";
    });

    item.addEventListener("touchend", function () {
      setTimeout(() => {
        this.style.transform = "";
      }, 150);
    });
  });
}

// Parallax effect for floating elements
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallax = scrolled * 0.5;

  document.querySelectorAll(".floating-circle").forEach((circle, index) => {
    const speed = (index + 1) * 0.1;
    circle.style.transform = `translateY(${parallax * speed}px) rotate(${
      scrolled * 0.1
    }deg)`;
  });
});

// Performance optimization - throttle scroll events
let ticking = false;
function updateOnScroll() {
  if (!ticking) {
    requestAnimationFrame(() => {
      // Add any scroll-based animations here
      ticking = false;
    });
    ticking = true;
  }
}

window.addEventListener("scroll", updateOnScroll);

// Add loading states
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.querySelectorAll(".loading").forEach((el, index) => {
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, index * 100);
    });
  }, 300);
});

// Enhanced accessibility
serviceItems.forEach((item) => {
  item.setAttribute("role", "button");
  item.setAttribute("tabindex", "0");

  item.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      item.click();
    }
  });
});

// Add focus styles for accessibility
const focusStyle = document.createElement("style");
focusStyle.textContent = `
            .service-item:focus {
                outline: 2px solid rgba(79, 172, 254, 0.8);
                outline-offset: 2px;
            }
            
            .cta-button:focus {
                outline: 2px solid rgba(255, 255, 255, 0.8);
                outline-offset: 2px;
            }
        `;
