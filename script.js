document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // INTERACTIVE FEATURE: Service/Preference Selector
  // ==========================================
  const servicesData = [
    { id: "service1", name: "Daily Bread Subscription", description: "Fresh artisan bread baked and reserved for you every single morning." },
    { id: "service2", name: "Custom Birthday/Celebration Cake", description: "Hand-decorated multi-tier cakes tailored to your special event theme." },
    { id: "service3", name: "Weekly Pastry Box Delivery", description: "A rotating assortment of our finest flaky pastries and croissants delivered weekly." }
  ];

  const selector = document.getElementById("serviceSelector");
  const displayArea = document.getElementById("serviceInfoDisplay");

  // Load stored preference on page load (Browser Storage Requirement)
  const savedServiceId = localStorage.getItem("preferredService");
  if (savedServiceId && selector) {
    selector.value = savedServiceId;
    renderServiceInfo(savedServiceId);
  }

  // Event listener for user selection
  if (selector) {
    selector.addEventListener("change", (event) => {
      const selectedId = event.target.value;

      // Save data to localStorage
      if (selectedId) {
        localStorage.setItem("preferredService", selectedId);
      } else {
        localStorage.removeItem("preferredService");
      }

      // Update page dynamically
      renderServiceInfo(selectedId);
    });
  }

  // Function to organize logic
  function renderServiceInfo(id) {
    if (!displayArea) return;

    if (!id) {
      displayArea.innerHTML = "<p>Please select a service to see details.</p>";
      return;
    }

    const foundService = servicesData.find(service => service.id === id);
    if (foundService) {
      displayArea.innerHTML = `
        <div class="selected-card" style="padding: 10px; border: 1px solid #ccc; margin-top: 10px;">
          <h4>${foundService.name}</h4>
          <p>${foundService.description}</p>
          <small style="color: green;">✓ Preference saved successfully!</small>
        </div>
      `;
    }
  }


  // ==========================================
  // FORM VALIDATION (For your contact.html page)
  // ==========================================
  const form = document.getElementById("contactForm");
  const emailInput = document.getElementById("emailInput");
  const nameInput = document.getElementById("nameInput");

  const emailError = document.getElementById("emailError");
  const nameError = document.getElementById("nameError");

  if (form) {
    form.addEventListener("submit", (event) => {
      let isValid = true;

      if (emailError) emailError.textContent = "";
      if (nameError) nameError.textContent = "";

      // Required field check for Name
      if (!nameInput || nameInput.value.trim() === "") {
        if (nameError) nameError.nameError = "Name is required.";
        if (nameError) nameError.textContent = "Name is required.";
        isValid = false;
      }

      // Email format validation
      const emailValue = emailInput ? emailInput.value.trim() : "";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (emailValue === "") {
        if (emailError) emailError.textContent = "Email address is required.";
        isValid = false;
      } else if (!emailRegex.test(emailValue)) {
        if (emailError) emailError.textContent = "Please enter a valid email address (e.g., name@example.com).";
        isValid = false;
      }

      if (!isValid) {
        event.preventDefault();
      }
    });
  }
});
