/* Contact form — validation + success popup modal */
(function () {
  var form = document.getElementById("contactForm");
  if (!form) return;
  var fields = ["name", "email", "subject", "message"];
  var modal = document.getElementById("successModal");

  function setError(field, msg) {
    var input = document.getElementById(field);
    var errorEl = form.querySelector('.error[data-for="' + field + '"]');
    if (errorEl) errorEl.textContent = msg || "";
    if (input) input.classList.toggle("invalid", Boolean(msg));
  }
  function clearErrors() { fields.forEach(function (f) { setError(f, ""); }); }

  function validate() {
    var valid = true, v = {};
    fields.forEach(function (f) { v[f] = (document.getElementById(f).value || "").trim(); });

    if (!v.name) { setError("name", "Please enter your name."); valid = false; }
    else if (v.name.length > 100) { setError("name", "Name is too long."); valid = false; }
    else setError("name", "");

    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!v.email) { setError("email", "Email is required."); valid = false; }
    else if (!emailRe.test(v.email)) { setError("email", "Please enter a valid email address."); valid = false; }
    else setError("email", "");

    if (!v.subject) { setError("subject", "Please add a subject."); valid = false; }
    else setError("subject", "");

    if (!v.message) { setError("message", "Message can't be empty."); valid = false; }
    else if (v.message.length > 1000) { setError("message", "Message is too long (max 1000)."); valid = false; }
    else setError("message", "");

    return valid;
  }

  function openModal() {
    if (!modal) return;
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    if (!modal) return;
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
  }
  if (modal) {
    modal.querySelectorAll("[data-close]").forEach(function (el) {
      el.addEventListener("click", closeModal);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeModal();
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validate()) return;
    openModal();
    form.reset();
    clearErrors();
  });

  fields.forEach(function (f) {
    var input = document.getElementById(f);
    if (input) input.addEventListener("input", function () { setError(f, ""); });
  });
})();
