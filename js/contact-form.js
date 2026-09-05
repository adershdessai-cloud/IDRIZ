/**
 * IDRIZ FACILITIES — Contact form live validation
 */
(function () {
  "use strict";

  const form = document.getElementById("contact-form");
  if (!form) return;

  const fields = {
    name: form.querySelector("#contact-name"),
    email: form.querySelector("#contact-email"),
    phone: form.querySelector("#contact-phone"),
    service: form.querySelector("#contact-service"),
    message: form.querySelector("#contact-message"),
  };

  const success = form.querySelector(".form-success");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const phonePattern = /^[+]?[\d\s()-]{7,20}$/;

  function getFieldWrap(input) {
    return input.closest(".form-field");
  }

  function setStatus(input, state, message) {
    const wrap = getFieldWrap(input);
    if (!wrap) return;

    wrap.classList.remove("is-valid", "is-invalid");
    if (state) wrap.classList.add(state === "valid" ? "is-valid" : "is-invalid");

    const error = wrap.querySelector(".form-field__error");
    if (error) error.textContent = message || "";

    const icons = wrap.querySelectorAll(".form-field__status");
    icons.forEach(function (icon) {
      icon.classList.remove("is-visible");
    });

    if (state === "valid") {
      const validIcon = wrap.querySelector(".form-field__status--valid");
      if (validIcon) validIcon.classList.add("is-visible");
    } else if (state === "invalid") {
      const invalidIcon = wrap.querySelector(".form-field__status--invalid");
      if (invalidIcon) invalidIcon.classList.add("is-visible");
    }
  }

  function clearStatus(input) {
    setStatus(input, null, "");
  }

  function validateName(showEmpty) {
    const value = fields.name.value.trim();
    if (!value) {
      if (showEmpty) setStatus(fields.name, "invalid", "Please enter your full name.");
      else clearStatus(fields.name);
      return false;
    }
    if (value.length < 2) {
      setStatus(fields.name, "invalid", "Name must be at least 2 characters.");
      return false;
    }
    setStatus(fields.name, "valid");
    return true;
  }

  function validateEmail(showEmpty) {
    const value = fields.email.value.trim();
    if (!value) {
      if (showEmpty) setStatus(fields.email, "invalid", "Please enter your email address.");
      else clearStatus(fields.email);
      return false;
    }
    if (!emailPattern.test(value)) {
      setStatus(fields.email, "invalid", "Enter a valid email (e.g. name@company.com).");
      return false;
    }
    setStatus(fields.email, "valid");
    return true;
  }

  function validatePhone(showEmpty) {
    const value = fields.phone.value.trim();
    if (!value) {
      if (showEmpty) clearStatus(fields.phone);
      else clearStatus(fields.phone);
      return true;
    }
    if (!phonePattern.test(value)) {
      setStatus(fields.phone, "invalid", "Enter a valid phone number.");
      return false;
    }
    setStatus(fields.phone, "valid");
    return true;
  }

  function validateService(showEmpty) {
    const value = fields.service.value;
    if (!value) {
      if (showEmpty) setStatus(fields.service, "invalid", "Please select a service.");
      else clearStatus(fields.service);
      return false;
    }
    setStatus(fields.service, "valid");
    return true;
  }

  function validateMessage(showEmpty) {
    const value = fields.message.value.trim();
    if (!value) {
      if (showEmpty) setStatus(fields.message, "invalid", "Please tell us a bit about your needs.");
      else clearStatus(fields.message);
      return false;
    }
    if (value.length < 10) {
      setStatus(fields.message, "invalid", "Message should be at least 10 characters.");
      return false;
    }
    setStatus(fields.message, "valid");
    return true;
  }

  fields.name.addEventListener("input", function () {
    validateName(false);
  });
  fields.name.addEventListener("blur", function () {
    validateName(true);
  });

  fields.email.addEventListener("input", function () {
    validateEmail(false);
  });
  fields.email.addEventListener("blur", function () {
    validateEmail(true);
  });

  fields.phone.addEventListener("input", function () {
    validatePhone(false);
  });
  fields.phone.addEventListener("blur", function () {
    validatePhone(true);
  });

  fields.service.addEventListener("change", function () {
    validateService(true);
  });

  fields.message.addEventListener("input", function () {
    validateMessage(false);
  });
  fields.message.addEventListener("blur", function () {
    validateMessage(true);
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nameOk = validateName(true);
    const emailOk = validateEmail(true);
    const phoneOk = validatePhone(true);
    const serviceOk = validateService(true);
    const messageOk = validateMessage(true);

    if (!(nameOk && emailOk && phoneOk && serviceOk && messageOk)) {
      const firstInvalid = form.querySelector(
        ".form-field.is-invalid .form-field__input, .form-field.is-invalid .form-field__select, .form-field.is-invalid .form-field__textarea"
      );
      if (firstInvalid) firstInvalid.focus();
      if (success) {
        success.classList.remove("is-visible");
        success.textContent = "";
      }
      return;
    }

    form.reset();
    Object.keys(fields).forEach(function (key) {
      clearStatus(fields[key]);
    });

    if (success) {
      success.classList.add("is-visible");
      success.textContent =
        "Thank you — your enquiry has been received. Our team will respond shortly.";
      if (typeof success.focus === "function") success.focus();
    }
  });
})();
