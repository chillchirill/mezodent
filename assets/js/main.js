(function () {
  const languageButtons = document.querySelectorAll("[data-lang]");
  const translatable = document.querySelectorAll("[data-sk][data-en]");

  function setLanguage(language) {
    const attr = language === "en" ? "en" : "sk";

    document.documentElement.lang = attr;
    translatable.forEach((node) => {
      node.textContent = node.dataset[attr];
    });

    languageButtons.forEach((button) => {
      const isActive = button.dataset.lang === attr;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    try {
      localStorage.setItem("mezodent-language", attr);
    } catch (_) {
      // Language preference is optional; the page works without storage.
    }
  }

  languageButtons.forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.lang));
  });

  let savedLanguage = "sk";
  try {
    savedLanguage = localStorage.getItem("mezodent-language") || "sk";
  } catch (_) {
    savedLanguage = "sk";
  }

  setLanguage(savedLanguage === "en" ? "en" : "sk");
})();
