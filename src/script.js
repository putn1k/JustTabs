class justTabs {
  constructor(selector, options) {
    const defaultOptions = {
      isChanged: () => {},
      activeBtnClass: null,
      activePanelClass: null,
    }
    this.options = Object.assign(defaultOptions, options);
    this.selector = selector;
    this.tabs = document.querySelector(`[data-tabs="${selector}"]`);
    if (this.tabs) {
      this.tabList = this.tabs.querySelector('[data-tabs="nav"]');
      this.tabsBtns = this.tabList.querySelectorAll('[data-tabs="btn"]');
      this.tabsPanels = this.tabs.querySelectorAll('[data-tabs="panel"]');
    } else {
      console.error(`Selector data-tabs="${this.selector} not found`);
      return;
    }

    this.check();
    this.init();
    this.events();
  }

  check() {
    if (document.querySelectorAll(`[data-tabs="${this.selector}"]`).length > 1) {
      console.error(`Selector data-tabs="${this.selector}" already exists!`);
      return;
    }

    if (this.tabsBtns.length !== this.tabsPanels.length) {
      console.error('The number of buttons and panels does not match!');
      return;
    }
  }

  init() {
    this.tabList.setAttribute('role', 'tablist');

    this.tabsBtns.forEach((el, i) => {
      el.setAttribute('role', 'tab');
      el.setAttribute('tabindex', '-1');
      el.setAttribute('id', `${this.selector}${i + 1}`);
      if (this.options.activeBtnClass !== null) {
        el.classList.remove(this.options.activeBtnClass);
      }
    });

    this.tabsPanels.forEach((el, i) => {
      el.setAttribute('role', 'tabpanel');
      el.setAttribute('tabindex', '-1');
      el.setAttribute('aria-labelledby', this.tabsBtns[i].id);
      el.classList.remove('active-tab-panel');
      if (this.options.activePanelClass !== null) {
        el.classList.remove(this.options.activePanelClass);
      }
    });

    if (this.options.activeBtnClass !== null) {
      this.tabsBtns[0].classList.add(this.options.activeBtnClass);
    }
    this.tabsBtns[0].removeAttribute('tabindex');
    this.tabsBtns[0].setAttribute('aria-selected', 'true');
    this.tabsPanels[0].classList.add('active-tab-panel');
    if (this.options.activePanelClass !== null) {
      this.tabsPanels[0].classList.add(this.options.activePanelClass);
    }
  }

  events() {
    this.tabsBtns.forEach((el, i) => {
      el.addEventListener('click', (e) => {
        let currentTab = this.tabList.querySelector('[aria-selected]');

        if (e.currentTarget !== currentTab) {
          this.switchTabs(e.currentTarget, currentTab);
        }
      });

      el.addEventListener('keydown', (e) => {
        let index = Array.prototype.indexOf.call(this.tabsBtns, e.currentTarget);

        let dir = null;

        switch (e.which) {
          case 37:
            dir = index - 1;
            break;
          case 39:
            dir = index + 1;
            break;
          case 40:
            dir = 'down';
            break;
          default:
            dir = null;
        }

        if (dir !== null) {
          if (dir === 'down') {
            this.tabsPanels[i].focus();
          } else if (this.tabsBtns[dir]) {
            this.switchTabs(this.tabsBtns[dir], e.currentTarget);
          }
        }
      });
    });
  }

  switchTabs(newTab, oldTab = this.tabs.querySelector('[aria-selected]')) {
    newTab.focus();
    newTab.removeAttribute('tabindex');
    newTab.setAttribute('aria-selected', 'true');

    oldTab.removeAttribute('aria-selected');
    oldTab.setAttribute('tabindex', '-1');

    let index = Array.prototype.indexOf.call(this.tabsBtns, newTab);
    let oldIndex = Array.prototype.indexOf.call(this.tabsBtns, oldTab);

    this.tabsPanels[oldIndex].classList.remove('active-tab-panel');
    this.tabsPanels[index].classList.add('active-tab-panel');
    if (this.options.activePanelClass !== null) {
      this.tabsPanels[oldIndex].classList.remove(this.options.activePanelClass);
      this.tabsPanels[index].classList.add(this.options.activePanelClass);
    }

    if (this.options.activeBtnClass !== null) {
      this.tabsBtns[oldIndex].classList.remove(this.options.activeBtnClass);
      this.tabsBtns[index].classList.add(this.options.activeBtnClass);
    }
    this.options.isChanged(this);
  }
} 