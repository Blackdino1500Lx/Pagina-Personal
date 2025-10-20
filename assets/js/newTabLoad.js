document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded");
  const cards = document.querySelectorAll("[data-href]");

  cards.forEach(card => {
    const trigger = () => {
      card.classList.add("grow");
      const destino = card.getAttribute("data-href");
      setTimeout(() => {
        window.location.href = destino;
      }, 600); // duración de la animación
    };

    card.addEventListener("click", trigger);
    card.addEventListener("touchstart", trigger);
  });
});