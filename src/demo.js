const tabs = new justTabs( 'tabs-name', {
  activeBtnClass: 'new_active_btn_class',
  activePanelClass: 'new_active_panel_class',
  isChanged: ( tabs ) => {
    console.log( tabs );
  }
} );

tabs.switchTabs( document.querySelector( '#tabs-name3' ) );
