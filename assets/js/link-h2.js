document.addEventListener("DOMContentLoaded", () => {
  const enlaces = {
    bts1: "#loadProjectsButton",
    bts2: "#gallery"
  };

  // Reemplaza cada elemento por un <a>
  Object.entries(enlaces).forEach(([clase, url]) => {
    const elementos = document.querySelectorAll(`.${clase}`);
    elementos.forEach(el => {
      const enlace = document.createElement("a");
      enlace.href = url;
      enlace.className = clase;
      enlace.innerHTML = el.innerHTML;
      enlace.style.textDecoration = "underline";
      el.replaceWith(enlace);
    });
  });
});