// Espera a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".top");

  window.addEventListener("scroll", () => {
    // Obtiene la cantidad de scroll vertical
    const scrollY = window.scrollY;

    // Calcula opacidad en base al scroll (máximo 0.95)
    const maxOpacity = 1;
    const opacity = Math.min(scrollY / 400, maxOpacity);

    // Calcula color base y aplica opacidad
    const baseColor = "110, 164, 191"; // RGB del steel-blue
    navbar.style.backgroundColor = `rgba(${baseColor}, ${opacity})`;

    // Opcional: transición suave
    navbar.style.transition = "background-color 0.2s ease";
  });
});