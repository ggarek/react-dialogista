export const initialState = () => ({ items: [] });
export const showManyDialogs = (state, dialogs) => ({ ...state, items: [...state.items, ...dialogs] });
export const showDialog = (state, dialog) => ({ ...state, items: [...state.items, dialog] });
export const closeById = (state, id) => ({ ...state, items: state.items.filter(d => d.id !== id) });
