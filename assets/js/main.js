document.addEventListener("DOMContentLoaded", function () {
  if (window.AOS) {
    AOS.init({
      duration: 700,
      once: true,
      offset: 80
    });
  }

  document.querySelectorAll("[data-year]").forEach(function (node) {
    node.textContent = new Date().getFullYear();
  });

  if (window.Swiper && document.querySelector(".testimonialSwiper")) {
    new Swiper(".testimonialSwiper", {
      loop: true,
      autoHeight: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      autoplay: {
        delay: 5200,
        disableOnInteraction: false
      }
    });
  }

  document.querySelectorAll(".comparison").forEach(function (comparison) {
    var input = comparison.querySelector("input[type='range']");
    if (!input) return;
    input.addEventListener("input", function () {
      comparison.style.setProperty("--position", input.value + "%");
    });
  });

  var form = document.getElementById("appointmentForm");
  if (!form) return;

  var status = form.querySelector(".form-status");
  var validators = {
    name: function (value) {
      return value.trim().length >= 2 ? "" : "Please enter your name.";
    },
    phone: function (value) {
      return value.trim().length >= 7 ? "" : "Please enter a valid phone number.";
    },
    email: function (value) {
      if (!value.trim()) return "";
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? "" : "Please enter a valid email address.";
    },
    service: function (value) {
      return value ? "" : "Please select a preferred service.";
    }
  };

  function setError(field, message) {
    var wrapper = field.closest("div");
    var error = wrapper ? wrapper.querySelector(".field-error") : null;
    field.classList.toggle("is-invalid", Boolean(message));
    if (error) error.textContent = message;
  }

  function validateField(field) {
    var validator = validators[field.name];
    if (!validator) return true;
    var message = validator(field.value);
    setError(field, message);
    return !message;
  }

  form.querySelectorAll("input, select, textarea").forEach(function (field) {
    field.addEventListener("blur", function () {
      validateField(field);
    });
    field.addEventListener("input", function () {
      if (field.classList.contains("is-invalid")) validateField(field);
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var fields = Array.from(form.querySelectorAll("input, select"));
    var isValid = fields.map(validateField).every(Boolean);

    status.className = "form-status";
    status.textContent = "";

    if (!isValid) {
      status.classList.add("error");
      status.textContent = "Please check the highlighted fields and try again.";
      return;
    }

    status.classList.add("success");
    status.textContent = "Thank you. Your request is ready for server-side handling. This demo form does not send data yet.";
    form.reset();
  });
});
