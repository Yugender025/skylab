document.addEventListener("DOMContentLoaded", function () {
  // Get form and related elements
  const contactForm = document.getElementById("contact-form");
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.innerHTML;

  // Create status div and append after the button
  const formStatus = document.createElement("div");
  formStatus.className = "form-status";
  formStatus.id = "formStatus";
  contactForm.insertBefore(formStatus, document.querySelector(".mt-4"));

  // Form fields
  const formFields = {
    name: document.getElementById("name"),
    email: document.getElementById("email"),
    phone: document.getElementById("phone"),
    message: document.getElementById("message"),
  };

  // Create error message elements for each field
  Object.keys(formFields).forEach((field) => {
    if (formFields[field]) {
      const errorDiv = document.createElement("div");
      errorDiv.className = "error-message";
      errorDiv.id = `${field}Error`;
      formFields[field].insertAdjacentElement("afterend", errorDiv);
    }
  });

  // Error elements
  const errorElements = {
    name: document.getElementById("nameError"),
    email: document.getElementById("emailError"),
    phone: document.getElementById("phoneError"),
    message: document.getElementById("messageError"),
  };

  // Label elements
  const labelElements = {
    name: document.querySelector('label[for="name"]'),
    email: document.querySelector('label[for="email"]'),
    phone: document.querySelector('label[for="phone"]'),
    message: document.querySelector('label[for="message"]'),
  };

  // Add input event listeners to clear errors when user types
  Object.keys(formFields).forEach((field) => {
    if (formFields[field]) {
      formFields[field].addEventListener("input", function () {
        clearError(field);
      });
    }
  });

  // Form submission handler
  contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Reset previous errors and status
    resetAllErrors();
    hideStatus();

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Show loading state
    setLoadingState(true);

    try {
      // Google Script URL
      const scriptURL =
        "https://script.google.com/macros/s/AKfycbxR1MOVe3jeSdpNLRVJjbNS35P6Tb3X3XsWoEL0LTB8cP_aglMHHPTsxUhsuyLRsFJVPw/exec";

      // Add form name attribute value to formData
      const formData = new FormData(contactForm);

      // Add timeout to ensure minimum loading time for better UX
      const [response] = await Promise.all([
        fetch(scriptURL, {
          method: "POST",
          body: formData,
        }),
        new Promise((resolve) => setTimeout(resolve, 800)), // Minimum 800ms loading time
      ]);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Show success message
      showStatus(
        "success",
        "Thanks for contacting us! We will get back to you soon."
      );
      contactForm.reset();
    } catch (error) {
      console.error("Error!", error.message);
      showStatus(
        "error",
        "There was an error submitting the form. Please try again."
      );
    } finally {
      // Reset button state
      setLoadingState(false);
    }
  });

  // Form validation function
  function validateForm() {
    let isValid = true;

    // Validate name (required)
    if (!formFields.name.value.trim()) {
      showError("name", "Please enter your full name");
      isValid = false;
    }

    // Validate email (required and format)
    const emailValue = formFields.email.value.trim();
    if (!emailValue) {
      showError("email", "Please enter your email address");
      isValid = false;
    } else if (!isValidEmail(emailValue)) {
      showError("email", "Please enter a valid email address");
      isValid = false;
    }

    // Validate phone (required)
    if (!formFields.phone.value.trim()) {
      showError("phone", "Please enter your phone number");
      isValid = false;
    }

    // Validate message (required)
    if (!formFields.message.value.trim()) {
      showError("message", "Please enter your message");
      isValid = false;
    }

    return isValid;
  }

  // Validate email format
  function isValidEmail(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // Show error for a specific field
  function showError(field, message) {
    if (formFields[field] && errorElements[field] && labelElements[field]) {
      formFields[field].classList.add("error-input");
      labelElements[field].classList.add("error-label");
      errorElements[field].textContent = message;
      errorElements[field].style.display = "block";
    }
  }

  // Clear error for a specific field
  function clearError(field) {
    if (formFields[field] && errorElements[field] && labelElements[field]) {
      formFields[field].classList.remove("error-input");
      labelElements[field].classList.remove("error-label");
      errorElements[field].style.display = "none";
    }
  }

  // Reset all errors
  function resetAllErrors() {
    Object.keys(formFields).forEach((field) => {
      clearError(field);
    });
  }

  // Set loading state
  function setLoadingState(isLoading) {
    if (isLoading) {
      submitButton.disabled = true;
      submitButton.innerHTML = '<span class="spinner"></span> Submitting...';
    } else {
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonText;
    }
  }

  // Show status message
  function showStatus(type, message) {
    formStatus.textContent = message;
    formStatus.className = "form-status " + type;
  }

  // Hide status message
  function hideStatus() {
    formStatus.className = "form-status";
  }

  // Make sure all form fields have name attributes for proper form submission
  Object.keys(formFields).forEach((field) => {
    if (formFields[field] && !formFields[field].hasAttribute("name")) {
      formFields[field].setAttribute("name", field);
    }
  });
});
