// /assets/js/view-more.js

const projectData = [
    {
        name: "TeachNest",
        tag: "Plataforma EdTech",
        description: "Plataforma educativa para docentes independientes: gestión de alumnos, prácticas inteligentes y sandbox de matemáticas.",
        image: "assets/img/teachnest.png",
        link: "https://teachnestcr.com"
    },
    {
        name: "Andrea's Body Skin",
        tag: "E-Commerce",
        description: "Sitio web de e-commerce centrado en el cuidado personal y la estética.",
        image: "assets/img/andrea-body-skin.png", 
        link: "https://blackdino1500lx.github.io/Andrea-s-Body-Skin/"
    },
    {
        name: "Gestion Cultural Alajuelita",
        tag: "App Web",
        description: "Aplicación para la gestión de recursos culturales y administrativos.",
        image: "assets/img/GestAlajuelitaMuni.png", 
        link: "https://gestioncultural-alajuelita.netlify.app/"
    },
    {
        name: "Panel de administracion",
        tag: "Dashboard",
        description: "Panel que permite agregar elementos mediante el uso de una base de datos.",
        image: "assets/img/Panel-Admin.png", 
        link: "#" 
    }
];

let projectsLoaded = false;
const INITIAL_DISPLAY_COUNT = 2;

function createProjectElement(project) {
    const projectDiv = document.createElement('a');
    projectDiv.className = 'projects-child';
    projectDiv.href = project.link;
    projectDiv.target = '_blank';
    
    projectDiv.innerHTML = `
        <div class="child-info title-container">
            ${project.tag ? `<span class="project-tag">${project.tag}</span>` : ''}
            <h4 class="quicksand-font">${project.name}</h4> 
        </div>
        <div class="child-image vertical-image" style="background-image: url('${project.image}');"></div>
        <div class="child-info description-container">
            <p class="quicksand-font">${project.description}</p>
            <span class="project-cta">Ver proyecto →</span>
        </div>
    `;

    return projectDiv;
}

function renderProjectsItems(startIndex, count) {
    const container = document.getElementById('projects-list');
    
    if (startIndex === 0) {
        container.innerHTML = '';
    }

    const endIndex = Math.min(startIndex + count, projectData.length);
    const itemsToRender = projectData.slice(startIndex, endIndex);

    itemsToRender.forEach(project => {
        const element = createProjectElement(project);
        container.appendChild(element);
    });
}

function showRemainingProjects() {
    const button = document.getElementById('loadProjectsButton');
    if (projectsLoaded) return;
    renderProjectsItems(INITIAL_DISPLAY_COUNT, projectData.length - INITIAL_DISPLAY_COUNT);
    projectsLoaded = true;
    button.classList.add('hidden'); 
}

function initializeProjects() {
    const button = document.getElementById('loadProjectsButton');
    const body = document.body;
    
    setTimeout(() => {
        body.classList.add('loaded');
    }, 10);

    if (projectData.length === 0) {
        const container = document.getElementById('projects-list');
        container.innerHTML = '<p style="text-align: center; color: var(--jet);">No hay proyectos disponibles para mostrar.</p>';
        if (button) button.classList.add('hidden'); 
        return;
    }

    if (projectData.length <= INITIAL_DISPLAY_COUNT) {
        renderProjectsItems(0, projectData.length);
        projectsLoaded = true;
        if (button) button.classList.add('hidden');
    } else {
        renderProjectsItems(0, INITIAL_DISPLAY_COUNT);
        if (button) {
            button.addEventListener('click', showRemainingProjects);
        }
    }
}

document.addEventListener("DOMContentLoaded", initializeProjects);
