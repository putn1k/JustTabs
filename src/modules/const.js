const CONSOLE_STYLES = 'color: #FF0000';
const START_INDEX = 0;
const STEP_INDEX = 1;

const Selectors = {
  tabsDataAttribute: 'jtabs',
  dataNavValue: 'nav',
  dataControlValue: 'control',
  dataPanelValue: 'panel',
  activeControlClass: 'is-selected',
  activePanelClass: 'is-visible'
};

const Messages = {
  MainError: 'JustTabs error',
  NameError: 'Name is a required parameter',
  IsSelectorExist: ( selectorName ) => `Selector data-jtabs="${selectorName}" already exists!`,
  TabsCountError: 'The count of buttons and panels does not match!',
  StartIndexError: ( rangeTo ) => `The starting index must be in the range from 0 to ${rangeTo}. Index "0" applied.`,
  SwitchIndexError: ( rangeTo ) => `The index must be in the range from 0 to ${rangeTo}. Index "0" applied.`,
  RequiredIndexError: 'The index is required',
};

export {
  CONSOLE_STYLES,
  START_INDEX,
  STEP_INDEX,
  Selectors,
  Messages,
};
