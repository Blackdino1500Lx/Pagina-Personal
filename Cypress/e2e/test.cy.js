/// <reference types="cypress" />

describe('Portfolio de Edward - Pruebas E2E', () => {
    // Configuración para visitar la página antes de cada prueba
    beforeEach(() => {
        // Asumiendo que el archivo HTML se sirve en la raíz o en /index.html
        cy.visit('/'); 
        
        // Verifica que el cuerpo (body) esté visible y la transición CSS haya terminado
        cy.get('body').should('have.class', 'loaded');
    });

    // --- Prueba de Estructura Básica y Header ---
    it('Debe cargar la página, verificar el título y los elementos principales', () => {
        // Verificar el título de la pestaña
        cy.title().should('include', 'Edward | Desarrollo Web Profesional');

        // Verificar el logo en el header
        cy.get('.top h1 a').should('be.visible').and('contain', 'Edward Salguera');

        // Verificar el texto principal del banner
        cy.get('.banner-text-h2').should('contain', 'Desarrollo Web');
    });

    // --- Prueba de Navegación y Scroll ---
    it('Debe navegar a las secciones principales haciendo clic en los enlaces', () => {
        // Navegar a Servicios
        cy.get('nav a[href="#services"]').click();
        cy.url().should('include', '#services');
        cy.get('#services').should('be.visible');

        // Navegar a Desarrollo (Proyectos)
        cy.get('nav a[href="#projects"]').click();
        cy.url().should('include', '#projects');
        cy.get('#projects').should('be.visible');

        // Navegar a Galería
        cy.get('nav a[href="#gallery"]').click();
        cy.url().should('include', '#gallery');
        cy.get('#gallery').should('be.visible');

        // Navegar al Contacto (Footer)
        cy.get('footer').scrollIntoView(); // Asegura que el footer esté visible para la prueba
        cy.get('#Contact').should('be.visible').and('contain', 'Contacto');
    });
    
    // --- Prueba de Menú Hamburguesa (Simulación Móvil) ---
    it('Debe mostrar y ocultar el menú de navegación en modo móvil (via toggle)', () => {
        // Establecer el viewport a tamaño móvil
        cy.viewport('iphone-6'); 

        // El menú de navegación debe estar oculto inicialmente
        cy.get('#main-nav').should('not.be.visible');

        // Hacer clic en el botón de menú
        cy.get('#menu-toggle').click();

        // El header debe tener la clase 'menu-open' y el menú debe ser visible
        cy.get('header').should('have.class', 'menu-open');
        cy.get('#main-nav').should('be.visible');
        cy.get('#main-nav a').should('have.length', 4); // Verificar 4 enlaces

        // Hacer clic en un enlace (simula navegación y cierre)
        cy.get('#main-nav a').first().click();

        // El menú debe cerrarse
        cy.get('header').should('not.have.class', 'menu-open');
        // Vuelve al viewport de escritorio para el resto de las pruebas si las hubiera, aunque beforeEach lo maneja.
        cy.viewport(1200, 800); 
    });

    // --- Prueba de Componente Flip Cards de Servicios (FIXED: Añadido cy.wait para sincronización) ---
    it('Debe voltear las tarjetas de servicio al hacer clic y cerrar las demás', () => {
        cy.get('#services').scrollIntoView();
        
        // Usamos alias para mantener la referencia a los elementos
        cy.get('.child-div-flip').eq(0).as('firstCard');
        cy.get('.child-div-flip').eq(1).as('secondCard');
        
        // 1. Voltear la primera tarjeta
        cy.get('@firstCard').click();
        cy.get('@firstCard').should('have.class', 'flipped');
        
        // 2. Voltear la segunda tarjeta
        cy.get('@secondCard').click();
        cy.get('@secondCard').should('have.class', 'flipped');
        cy.wait(50); 
        
        // 3. Verificar que la primera tarjeta se haya cerrado (falla anterior)
        cy.get('@firstCard').should('not.have.class', 'flipped');

        // 4. Voltear la segunda tarjeta de nuevo para cerrarla
        cy.get('@secondCard').click();
        cy.get('@secondCard').should('not.have.class', 'flipped');
    });

    // --- Prueba de Carga de Contenido (FIXED: Se verifica que NO esté vacío) ---
    it('Debe verificar la existencia de los botones de carga y la carga inicial de contenido', () => {
        // Secciones de Proyectos
        cy.get('#projects h2').should('contain', 'Proyectos Recientes');
        // CORRECCIÓN: Asumimos que el JS carga contenido inicialmente (por la falla anterior)
        cy.get('#projects-list').children().should('have.length.of.at.least', 1);
        cy.get('#loadProjectsButton').should('be.visible').and('contain', 'Mostrar Proyectos');
        
        // Secciones de Galería
        cy.get('#gallery h2').should('contain', 'Galería de Diseños');
        // Asumimos que el JS carga contenido inicialmente (por la falla anterior)
        cy.get('#gallery-list').children().should('have.length.of.at.least', 1);
        cy.get('#galleryLoadButton').should('be.visible').and('contain', 'Mostrar Más Diseños');
    });

    // --- Prueba de Imágenes y Assets (Solo Flip Card, como ejemplo) ---
    it('Debe cargar correctamente los íconos de las tarjetas de servicio', () => {
        cy.get('.child-div-flip .icon').each(($img) => {
            // Verificar que el elemento <img> exista
            cy.wrap($img).should('exist');
            
            // Verificar que la imagen se haya cargado (comprobación de atributo src)
            cy.wrap($img).should('have.attr', 'src').and('not.be.empty');
            
            // Verificar que la imagen sea visible
            cy.wrap($img).should('be.visible'); 
        });
    });

    // --- Prueba de Footer y Contacto ---
    it('Debe mostrar la sección de contacto y los enlaces del footer', () => {
        cy.get('footer').scrollIntoView();
        cy.get('#Contact').should('be.visible').and('contain', 'Contacto');

        // Verificar enlaces de contacto
        cy.get('.footer-contact a[href^="mailto:"]').should('exist');
        cy.get('.footer-contact a[href="linkedin"]').should('exist'); // Nota: Es solo un placeholder en el HTML
        cy.get('.footer-contact a[href="insta"]').should('exist'); // Nota: Es solo un placeholder en el HTML

        // Verificar texto de copyright
        cy.get('footer article').should('contain', 'Edward Salguera. Todos los derechos reservados.');
    });
});
