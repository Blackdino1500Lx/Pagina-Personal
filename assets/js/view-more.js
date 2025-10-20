// /assets/js/view-more.js

// Arreglo de datos de proyectos
const projectData = [
    {
        name: "Andrea's Body Skin",
        description: "Sitio web de e-commerce centrado en el cuidado personal y la estética.",
        image: "assets/img/andrea-body-skin.png", 
        link: "https://blackdino1500lx.github.io/Andrea-s-Body-Skin/"
    },
    {
        name: "Gestion Cultural Alajuelita",
        description: "Aplicación para la gestión de recursos culturales y administrativos.",
        image: "assets/img/GestAlajuelitaMuni.png", 
        link: "https://gestioncultural-alajuelita.netlify.app/"
    },
    {
        name: "Panel de administracion",
        description: "Panel que permite agregar elementos mediante el uso de una base de datos.",
        image: "assets/img/Panel-Admin.png", 
        link: "#" 
    }
];

// Estado para saber si ya cargamos los proyectos
let projectsLoaded = false;
// Número de proyectos a mostrar inicialmente (IGUAL QUE LA GALERÍA)
const INITIAL_DISPLAY_COUNT = 2;

// 1. Función principal para generar el HTML de un proyecto
function createProjectElement(project) {
    const projectDiv = document.createElement('a');
    projectDiv.className = 'projects-child';
    projectDiv.href = project.link;
    projectDiv.target = '_blank'; // Abre en una nueva pestaña
    
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

// 2. Función para cargar y mostrar una parte de los proyectos
// 'startIndex' define desde dónde empezar a cargar los datos.
function renderProjectsItems(startIndex, count) {
    const container = document.getElementById('projects-list');
    
    // Si es la carga inicial, limpia el contenedor. Para esta lógica, no es necesario append.
    if (startIndex === 0) {
        container.innerHTML = '';
    }

    // Determina el final del slice, asegurando que no exceda el array
    const endIndex = Math.min(startIndex + count, projectData.length);
    const itemsToRender = projectData.slice(startIndex, endIndex);

    itemsToRender.forEach(project => {
        const element = createProjectElement(project);
        container.appendChild(element);
    });
}

// 3. Función para manejar el clic del botón (muestra el resto)
function showRemainingProjects() {
    const button = document.getElementById('loadProjectsButton');

    if (projectsLoaded) return;
    
    // Cargar los elementos restantes después de los iniciales
    // Se suma INITIAL_DISPLAY_COUNT al start index para empezar donde terminó la carga inicial
    renderProjectsItems(INITIAL_DISPLAY_COUNT, projectData.length - INITIAL_DISPLAY_COUNT);
    
    projectsLoaded = true;
    button.classList.add('hidden'); 
}


// 4. Inicialización: Muestra los primeros N elementos al cargar
function initializeProjects() {
    const button = document.getElementById('loadProjectsButton');
    const body = document.body;
    
    // Animación de carga (usando la clase loaded)
    setTimeout(() => {
        body.classList.add('loaded');
    }, 10);

    // 4.1 Verificar si hay proyectos
    if (projectData.length === 0) {
        const container = document.getElementById('projects-list');
        container.innerHTML = '<p style="text-align: center; color: var(--jet);">No hay proyectos disponibles para mostrar.</p>';
        if (button) button.classList.add('hidden'); 
        return;
    }

    // 4.2 Si hay menos o igual elementos que el inicio, mostrar todos y ocultar botón
    if (projectData.length <= INITIAL_DISPLAY_COUNT) {
        renderProjectsItems(0, projectData.length);
        projectsLoaded = true;
        if (button) button.classList.add('hidden');
    } else {
        // 4.3 Mostrar solo los elementos iniciales
        renderProjectsItems(0, INITIAL_DISPLAY_COUNT);
        
        // Asignar el listener al botón para cargar el resto
        if (button) {
            button.addEventListener('click', showRemainingProjects);
            // El botón se queda visible para cargar el resto
        }
    }
}

// 5. Event Listener principal
document.addEventListener("DOMContentLoaded", initializeProjects);
