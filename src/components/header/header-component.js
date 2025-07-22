class HeaderComponent extends HTMLElement {
    constructor() {
      super();
      this._isMenuOpen = false;
    }
  
    connectedCallback() {
      this.render();
      this.setupEventListeners();
    }
  
    render() {
      this.innerHTML = `
        <header class="bg-gfo-blue shadow-md py-6 sticky top-0 z-10 circle-pattern">
          <div class="container mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between px-4">
            <div class="flex items-center mb-4 md:mb-0">
              <div class="bg-gfo-orange text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-2xl mr-3">
                <img src="../../../public/assets/images/logos/icongfo.PNG"alt="Logo" class="w-17 h-17 rounded-lg">
              </div>
              <div class="text-white">
                <h1 class="text-2xl md:text-3xl font-bold">GRUPO FARMACIAS OSPINO</h1>
                <p class="text-sm md:text-base font-medium">POR TU SALUD!</p>
              </div>
            </div>
            
            <div class="relative">
              <button id="menu-button" type="button" class="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full text-white hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gfo-blue focus:ring-white transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
  
              <div id="menu-dropdown" class="hidden absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition ease-out duration-100 transform opacity-0 scale-95">
                <div class="py-1" role="none">
                  <a href="/src/templates/pages/index.html" class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem">Sedes</a>
                  <a href="/src/templates/pages/ofertas" class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem">Ofertas</a>
                  <a href="/src/templates/pages/about.html" class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem">Sobre Nosotros</a>
                  <div class="border-t border-gray-200 my-1"></div>
                  <a href="/src/templates/pages/admin" class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem">Admin</a>
                </div>
              </div>
            </div>
          </div>
        </header>
      `;
    }
  
    setupEventListeners() {
      const menuButton = this.querySelector('#menu-button');
      const menuDropdown = this.querySelector('#menu-dropdown');
  
      const toggleMenu = (shouldOpen = !this._isMenuOpen) => {
        this._isMenuOpen = shouldOpen;
        
        if (this._isMenuOpen) {
          menuDropdown.classList.remove('hidden');
          setTimeout(() => {
            menuDropdown.classList.remove('opacity-0', 'scale-95');
          }, 10);
        } else {
          menuDropdown.classList.add('opacity-0', 'scale-95');
          setTimeout(() => {
            menuDropdown.classList.add('hidden');
          }, 100);
        }
      };
  
      menuButton.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleMenu();
      });
  
      // Cerrar menú al hacer clic fuera
      document.addEventListener('click', (event) => {
        if (this._isMenuOpen && !this.contains(event.target)) {
          toggleMenu(false);
        }
      });
  
      // Cerrar menú al presionar Escape
      document.addEventListener('keydown', (event) => {
        if (this._isMenuOpen && event.key === 'Escape') {
          toggleMenu(false);
        }
      });
    }
  
    disconnectedCallback() {
      // Limpiar event listeners cuando el componente se elimine
      document.removeEventListener('click', this.handleDocumentClick);
      document.removeEventListener('keydown', this.handleKeyDown);
    }
  }
  
  customElements.define('header-component', HeaderComponent);