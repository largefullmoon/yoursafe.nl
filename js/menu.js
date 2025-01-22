// as of yoursafesitemap_v2.docx (edited on 4.4.2023)
const menuItems = [
  {
    "id": "you",
    "label": "You",
    "icon": null,
    "children": [
      {
        "label": "YOU",
        "icon": "YOU-icon",
        "slug": "index.html",
        "id": "you-you"
      },
      {
        "label": "IBAN's",
        "icon": "account-number-icon",
        "slug": "ibans.html",
        "id": "you-ibans"
      },
      {
        "label": "Yoursafe App",
        "icon": "yoursafe-app-icon",
        "slug": "yoursafeapp.html",
        "id": "you-yoursafe-app"
      },
      {
        "label": "Betaalkaart",
        "icon": "debit-card-icon",
        "slug": "betaalkaart.html",
        "id": "you-betaalkaart"
      },
      {
        "label": "Prijsoverzicht",
        "icon": "pricechart-icon",
        "slug": "prijsoverzicht-you.html",
        "id": "you-prijsoverzicht"
      }
    ]
  },
  {
    "id": "adverteren",
    "label": "Adverteren",
    "icon": null,
    "children": [
      {
        "label": "Yoursafe Ads",
        "icon": "yoursafe-ads-icon",
        "slug": "ads.html",
        "id": "adverteren-yoursafe-ads"
      },
      {
        "label": "Sponsorships",
        "icon": "sponsorships-icon",
        "slug": "sponsorships.html",
        "id": "adverteren-sponsorships"
      },
      {
        "label": "Tariefkaart",
        "icon": "pricechart-icon",
        "slug": "prijsoverzicht-adverteren.html",
        "id": "adverteren-prijsoverzicht"
      }
    ]
  },
  {
    "id": "banken",
    "label": "Banken",
    "icon": null,
    "children": [
      {
        "label": "Banken",
        "icon": "banks-icon",
        "slug": "banken.html",
        "id": "banken-banken"
      },
      {
        "label": "Transactie-informatie",
        "icon": "transactions-questions-icon",
        "slug": "transactie-informatie.html",
        "id": "banken-transactie-informatie"
      }
    ]
  },
  {
    "id": "over-ons",
    "label": "Over Ons",
    "icon": null,
  }
]

document.addEventListener('DOMContentLoaded', () => {

  class MenuService {
    constructor() {
      this.init();
    }

    init() {
      if (typeof document === "undefined") return;

      // Desktop menu logic (touch events)
      document.querySelector('.menu__level-1').addEventListener('touchstart', (e) => {
        const item = e.target.closest('.main-menu-item');
        if (item) {
          const isSubmenuItem = !!item.querySelector('.menu__level-2');
          const link = item.querySelector('a');

          if (isSubmenuItem) {
            // Submenu toggle logic
            e.preventDefault();
            e.stopPropagation();
            this.toggleSubmenu(item); // Toggle submenu
          } else if (link) {
            // Allow links to work normally
          }
        }
      });

      // For closing the submenu when touching outside
      document.addEventListener('touchstart', (e) => {
        if (!e.target.closest('.menu__level-1')) {
          // Close all open submenus when touching outside the menu
          this.closeAllSubmenus();
        }
      });

      // Mobile menu logic
      const mobileMenuItems = document.querySelectorAll('.mobile-menu__level-1 > .mobile-menu-item');
      mobileMenuItems.forEach(item => {
        item.addEventListener('mousedown', () => this.setMobileMenu({ level: 2, item, siblings: mobileMenuItems }));
        item.addEventListener('touchstart', () => this.setMobileMenu({ level: 2, item, siblings: mobileMenuItems }));
      });

      const mobileSubItems = document.querySelectorAll('.mobile-menu__level-1 > .mobile-menu-item:not(.main-menu-item--without-3rd-level) > .mobile-menu__level-2 > .mobile-menu-item');
      mobileSubItems.forEach((mobileSubItem) => {
        mobileSubItem.addEventListener('mousedown', (e) => {
          this.setMobileMenu({ level: 3, item: mobileSubItem, siblings: mobileSubItems });
          e.stopPropagation();
        });
        mobileSubItem.addEventListener('touchstart', (e) => {
          this.setMobileMenu({ level: 3, item: mobileSubItem, siblings: mobileSubItems });
          e.stopPropagation();
        });
      });
    }

    // Submenu toggle logic for desktop
    toggleSubmenu(item) {
      const submenu = item.querySelector('.menu__level-2');
      if (submenu) {
        submenu.classList.toggle('open'); // Toggle the open class for submenu
      }
    }

    // Close all submenus (used for touch outside)
    closeAllSubmenus() {
      const submenus = document.querySelectorAll('.menu__level-2.open');
      submenus.forEach(submenu => submenu.classList.remove('open'));
    }

    // MOBILE MENU LOGIC
    setMobileMenu({ level, item, siblings }) {
      siblings.forEach(sibling => sibling.classList.remove('mobile-menu-item--active'));
      item.classList.add('mobile-menu-item--active');
      this.slideToLevel(level);
    }

    openMobileMenu() {
      const menuElm = document.querySelector('#mobile-menu');
      menuElm.classList.add('mobile-menu-open');

      const closeMenuElement = document.querySelector('.mobile-menu-header__close');
      closeMenuElement.classList.toggle('mobile-menu-header__close--show');

      this.slideToLevel(1);
    }

    async closeMobileMenu() {
      this.slideToLevel(0);

      const menuElm = document.querySelector('#mobile-menu');
      menuElm.classList.remove('mobile-menu-open');

      const closeMenuElement = document.querySelector('.mobile-menu-header__close');
      closeMenuElement.classList.toggle('mobile-menu-header__close--show');
    }

    slideToLevel(level) {
      const menuElm = document.getElementById('mobile-menu');
      menuElm.style.setProperty('--mobile-menu-level', level);

      this.updateBackIconOpacity(level);
    }

    menuBackOneLevel() {
      const menuElm = document.getElementById('mobile-menu');
      let menuLevel = parseInt(menuElm.style.getPropertyValue('--mobile-menu-level')) || 1;

      if (menuLevel === 1) return;

      menuLevel -= 1;
      this.slideToLevel(menuLevel);
    }

    updateBackIconOpacity(level) {
      const menuElm = document.getElementById('mobile-menu');
      const opacity = level > 1 ? '1' : '0';
      menuElm.style.setProperty('--back-icon-opacity', opacity);
    }
  }

  // Instantiate menu service globally
  window.menuService = new MenuService(); // This makes menuService available globally
});
