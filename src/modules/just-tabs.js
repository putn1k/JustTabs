import {CONSOLE_STYLES, START_INDEX, STEP_INDEX, Selectors, Messages} from './const.js';

export default class JustTabs {
  #errorFlag = false;
  #tabsName = null;
  #tabs = null;
  #tabList = null;
  #tabsPanels = null;
  #tabsControls = null;
  #currentTabIndex = null;
  #oldTabIndex = null;
  #options = {
    startTabIndex: START_INDEX,
  };

  constructor( name = null, options ) {
    this.#tabsName = name;
    if( !this.#tabsName ) {
      this.#switchErrorFlag( Messages.NameError );
      return;
    }

    if ( document.querySelectorAll( `[data-${Selectors.tabsDataAttribute}="${this.#tabsName}"]` ).length > 1 ) {
      this.#switchErrorFlag( Messages.IsSelectorExist( this.#tabsName ) );
      return;
    }

    this.#tabs = document.querySelector( `[data-${Selectors.tabsDataAttribute}="${this.#tabsName}"]` );
    this.#options = Object.assign( this.#options, options );
    try {
      this.#setupSettings();
      this.#addListeners();
      this.#onInit();
    } catch ( err ) {
      console.group( `%c${Messages.MainError}: `, CONSOLE_STYLES );
      this.#switchErrorFlag( err );
      console.groupEnd();
    }
  }

  #setupSettings() {
    this.#tabList = this.#tabs.querySelector( `[data-${Selectors.tabsDataAttribute}="${Selectors.dataNavValue}"]` );
    this.#tabsControls = this.#tabList.querySelectorAll( `[data-${Selectors.tabsDataAttribute}="${Selectors.dataControlValue}"]` );
    this.#tabsPanels = this.#tabs.querySelectorAll( `[data-${Selectors.tabsDataAttribute}="${Selectors.dataPanelValue}"]` );

    if ( this.#tabsControls.length !== this.#tabsPanels.length ) {
      this.#switchErrorFlag( Messages.TabsCountError );
      return;
    }

    if ( ( this.#options.startTabIndex >= this.#tabsControls.length ) || ( this.#options.startTabIndex < START_INDEX ) ) {
      console.log( `%c${Messages.StartIndexError( this.#tabsControls.length - STEP_INDEX )}`, CONSOLE_STYLES );
      this.#currentTabIndex = this.#options.startTabIndex = START_INDEX;
    } else {
      this.#currentTabIndex = this.#options.startTabIndex;
    }

    this.#options.activeIndex = this.#currentTabIndex;

    this.#tabList.setAttribute( 'role', 'tablist' );

    this.#tabsControls.forEach( ( controlBtn, index ) => {
      controlBtn.setAttribute( 'role', 'tab' );
      controlBtn.setAttribute( 'tabindex', '-1' );
      controlBtn.setAttribute( 'id', `jt-${this.#tabsName}-${index + 1}` );
    } );
    this.#tabsControls[ this.#options.startTabIndex ].removeAttribute( 'tabindex' );
    this.#tabsControls[ this.#options.startTabIndex ].setAttribute( 'aria-selected', 'true' );
    this.#tabsControls[ this.#options.startTabIndex ].classList.add( Selectors.activeControlClass );

    this.#tabsPanels.forEach( ( panel, index ) => {
      panel.setAttribute( 'role', 'tabpanel' );
      panel.setAttribute( 'tabindex', '-1' );
      panel.setAttribute( 'aria-labelledby', this.#tabsControls[ index ].id );
    } );
    this.#tabsPanels[ this.#options.startTabIndex ].classList.add( Selectors.activePanelClass );

    this.#options.el = this.#tabs;
    this.#options.name = this.#tabs;
  }

  #addListeners() {
    this.#tabsControls.forEach( ( controlBtn ) => {
      controlBtn.addEventListener( 'click', this.#onTabClick );
      controlBtn.addEventListener( 'keydown', this.#onTabKeydown );
    } );
  }

  #onTabClick = ( evt ) => {
    const currentTab = this.#tabsControls[ this.#currentTabIndex ];
    if ( evt.currentTarget !== currentTab ) {
      this.#oldTabIndex = this.#currentTabIndex;
      this.#currentTabIndex = Array.from( this.#tabsControls ).indexOf( evt.currentTarget );
      this.#switchTabs();
    }
  };

  #onTabKeydown = ( evt ) => {
    const currentPosIndex = Array.from( this.#tabsControls ).indexOf( evt.currentTarget );
    switch ( evt.key ) {
      case 'ArrowLeft':
        if ( this.#tabsControls[ currentPosIndex - STEP_INDEX ] ) {
          this.switchTo( currentPosIndex - STEP_INDEX );
        }
        break;
      case 'ArrowRight':
        if ( this.#tabsControls[ currentPosIndex + STEP_INDEX ] ) {
          this.switchTo( currentPosIndex + STEP_INDEX );
        }
        break;
      case 'ArrowDown':
        this.#tabsPanels[ currentPosIndex ].focus();
        break;
      default:
        return;
    }
  };

  #switchTabs() {
    if ( !this.#errorFlag ) {
      this.#tabsControls[ this.#oldTabIndex ].setAttribute( 'tabindex', '-1' );
      this.#tabsControls[ this.#oldTabIndex ].removeAttribute( 'aria-selected' );
      this.#tabsControls[ this.#oldTabIndex ].classList.remove( Selectors.activeControlClass );
      this.#tabsPanels[ this.#oldTabIndex ].classList.remove( Selectors.activePanelClass );

      this.#tabsControls[ this.#currentTabIndex ].focus();
      this.#tabsControls[ this.#currentTabIndex ].removeAttribute( 'tabindex' );
      this.#tabsControls[ this.#currentTabIndex ].setAttribute( 'aria-selected', 'true' );
      this.#tabsControls[ this.#currentTabIndex ].classList.add( Selectors.activeControlClass );
      this.#tabsPanels[ this.#currentTabIndex ].classList.add( Selectors.activePanelClass );

      this.#options.activeIndex = this.#currentTabIndex;

      this.#onSwitch();
    }
  }

  #updateIndex(index) {
    this.#oldTabIndex = this.#currentTabIndex;

    if ( ( index >= this.#tabsControls.length ) || ( index < START_INDEX ) ) {
      console.log( `%c${Messages.SwitchIndexError( this.#tabsControls.length - STEP_INDEX )}`, CONSOLE_STYLES );
      this.#currentTabIndex = START_INDEX;
    } else {
      this.#currentTabIndex = index;
    }
  }

  #switchErrorFlag( messageText = null ) {
    if ( messageText ) {
      console.error( messageText );
    }
    this.#errorFlag = true;
  }

  #onInit() {
    if ( this.#options.onInit && ( typeof this.#options.onInit === 'function' ) ) {
      this.#options.onInit(this);
    }
  }

  #onSwitch() {
    if ( this.#options.onSwitch && ( typeof this.#options.onSwitch === 'function' ) ) {
      this.#options.onSwitch(this);
    }
  }

  getOptions(option = null) {
    return option ? this.#options[option] : this.#options;
  }

  switchTo( index ){
    if ( !index && index !== START_INDEX ) {
      console.log( `%c${Messages.RequiredIndexError}`, CONSOLE_STYLES );
      return;
    }
    this.#updateIndex( index );
    this.#switchTabs();
  }
}
