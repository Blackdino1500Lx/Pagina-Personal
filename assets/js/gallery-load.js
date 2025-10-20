// /assets/js/gallery-load.js
// Este módulo se encarga de cargar una segunda galería independiente.

// Datos de la galería
const galleryData = [
    {
        name: "Fotos de Parejas",
        description: "Sesión fotográfica al aire libre capturando momentos románticos.",
        image: "assets/img/parejas.png", 
        link: "https://edphotocr.pixieset.com/leoandrosa/"
    },
    {
        name: "Sesion de Bodas",
        description: "Cobertura completa de bodas, desde la ceremonia hasta la recepción.",
        image: "assets/img/boda.png", 
        link: "https://edphotocr.pixieset.com/joshuaandmonse/" 
    },
    {
        name: "Sesion Familiar",
        description: "Retratos familiares en estudio y exteriores, creando recuerdos duraderos.",
        image: "assets/img/familiares.png", 
        link: "https://edphotocr.pixieset.com/familiawilliams/" 
    },
    {
        name: "Sesion de Compromiso",
        description: "Captura de la alegría y emoción de los compromisos matrimoniales.",
        image: "assets/img/compromiso.png", 
        link: "https://edphotocr.pixieset.com/stevenandaimee/" 
    }
];

// Estado para saber si ya cargamos la galería completa
let galleryLoaded = false;
// Número de proyectos a mostrar inicialmente
const INITIAL_DISPLAY_COUNT = 2;

// 1. Función principal para generar el HTML de un proyecto (misma estructura visual)
function createGalleryElement(project) {
    const projectDiv = document.createElement('a');
    projectDiv.className = 'projects-child'; // Reutiliza la clase de estilo
    projectDiv.href = project.link;
    projectDiv.target = '_blank';
    
    // Estructura interna del proyecto: Título, Foto, Descripción (Vertical)
    projectDiv.innerHTML = `
        <div class="child-info title-container">
            <h4 class="quicksand-font">${project.name}</h4> 
        </div>
        <div class="child-image vertical-image" style="background-image: url('${project.image}');"></div>
        <div class="child-info description-container">
            <p class="quicksand-font">${project.description}</p>
        </div>
    `;

    return projectDiv;
}

// 2. Función para cargar y mostrar una parte de la galería o toda
// 'startIndex' define desde dónde empezar a cargar los datos.
function renderGalleryItems(startIndex, count, append = false) {
    const container = document.getElementById('gallery-list');
    
    // Si no es para agregar, limpia el contenedor primero (aunque aquí siempre será para agregar)
    if (!append) {
        container.innerHTML = '';
    }

    // Determina el final del slice, asegurando que no exceda el array
    const endIndex = Math.min(startIndex + count, galleryData.length);
    const itemsToRender = galleryData.slice(startIndex, endIndex);

    itemsToRender.forEach(project => {
        const element = createGalleryElement(project);
        container.appendChild(element);
    });
}

// 3. Función para manejar el clic del botón (muestra el resto)
function showRemainingGallery() {
    const button = document.getElementById('galleryLoadButton');

    if (galleryLoaded) return;
    
    // Cargar los elementos restantes después de los iniciales
    renderGalleryItems(INITIAL_DISPLAY_COUNT, galleryData.length - INITIAL_DISPLAY_COUNT, true);
    
    galleryLoaded = true;
    button.classList.add('hidden'); 
}

// 4. Inicialización: Muestra los primeros N elementos al cargar
function initializeGallery() {
    const button = document.getElementById('galleryLoadButton');

    // 4.1 Verificar si hay proyectos
    if (galleryData.length === 0) {
        const container = document.getElementById('gallery-list');
        container.innerHTML = '<p style="text-align: center; color: var(--jet);">No hay elementos en esta galería.</p>';
        if (button) button.classList.add('hidden'); 
        return;
    }

    // 4.2 Si hay menos o igual elementos que el inicio, mostrar todos y ocultar botón
    if (galleryData.length <= INITIAL_DISPLAY_COUNT) {
        renderGalleryItems(0, galleryData.length, false);
        galleryLoaded = true;
        if (button) button.classList.add('hidden');
    } else {
        // 4.3 Mostrar solo los elementos iniciales
        renderGalleryItems(0, INITIAL_DISPLAY_COUNT, false);
        
        // Asignar el listener al botón para cargar el resto
        if (button) {
            button.addEventListener('click', showRemainingGallery);
            // El botón se queda visible para cargar el resto
        }
    }
}

// 5. Event Listener principal
document.addEventListener("DOMContentLoaded", initializeGallery);
