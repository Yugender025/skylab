class Example {
  constructor(options) {
    this.root = options.root;

    this.init();

    setTimeout(this.showImages.bind(this), 1000);
  }

  init() {
    this.scroll = new LocomotiveScroll({
      el: this.root,
      direction: "horizontal",
      smooth: true,
      lerp: 0.05,
      tablet: {
        smooth: true,
      },
      smartphone: {
        smooth: true,
      },
    });

    this.images = this.root.querySelectorAll(".image");

    [].forEach.call(this.images, (image) => {
      image.addEventListener("click", () => {
        image.classList.add("-clicked");
        this.hideImages();
      });
    });
  }

  showImages() {
    [].forEach.call(this.images, (image) => {
      image.classList.remove("-clicked");
      image.classList.add("-active");
    });
  }

  hideImages() {
    [].forEach.call(this.images, (image) => {
      image.classList.remove("-active");
    });

    setTimeout(this.showImages.bind(this), 2000);
  }
}

window.addEventListener("DOMContentLoaded", (event) => {
  const example = new Example({
    root: document.querySelector(".scroll-animations-example"),
  });
});

// Get all service items and images
const serviceItems = document.querySelectorAll(".service-item");
const roomImages = document.querySelectorAll(".room-image");

// Add click event listeners to service items
serviceItems.forEach((item) => {
  item.addEventListener("click", function () {
    // Remove active class from all items
    serviceItems.forEach((service) => service.classList.remove("active"));

    // Add active class to clicked item
    this.classList.add("active");

    // Hide all images
    roomImages.forEach((img) => img.classList.add("hidden"));

    // Show corresponding image
    const imageType = this.getAttribute("data-image");
    const targetImage = document.getElementById(imageType + "-image");
    if (targetImage) {
      targetImage.classList.remove("hidden");
    }
  });
});

// Add hover effects
serviceItems.forEach((item) => {
  item.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-5px) scale(1.02)";
  });

  item.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Add click effect to CTA button
const ctaButton = document.querySelector(".cta-button");
ctaButton.addEventListener("click", function (e) {
  e.preventDefault();

  // Create ripple effect
  const ripple = document.createElement("span");
  ripple.style.position = "absolute";
  ripple.style.background = "rgba(255,255,255,0.6)";
  ripple.style.borderRadius = "50%";
  ripple.style.transform = "scale(0)";
  ripple.style.animation = "ripple 0.6s linear";
  ripple.style.left = "50%";
  ripple.style.top = "50%";
  ripple.style.width = "20px";
  ripple.style.height = "20px";
  ripple.style.marginLeft = "-10px";
  ripple.style.marginTop = "-10px";

  this.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600);
});

// Add CSS animation for ripple effect
const style = document.createElement("style");
style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
document.head.appendChild(style);
