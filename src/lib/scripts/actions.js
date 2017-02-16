const uid = (() => {
  let i = 0;
  return () => ++i;
})();

const dismissDialog = (id) => ({ type: 'DISMISS_DIALOG', id });
const confirmDialog = (id) => ({ type: 'CONFIRM_DIALOG', id });

/**
 * Show one dialog
 * @param {React.Component} component
 * @param {object} props
 * @returns {Number} dialog id
 */
const showDialog = (component, props) => ({
  type: 'SHOW_DIALOG',
  id: uid(),
  component,
  props,
});

/**
 * Show any number of dialogs at once
 * @param {array} dialogs
 */
const showManyDialogs = (dialogs) => ({
  type: 'SHOW_MANY_DIALOGS',
  dialogs: dialogs.map(([component, props]) => ({ id: uid(), component, props })),
});

export {
  dismissDialog,
  confirmDialog,
  showDialog,
  showManyDialogs,
};
