import tape from 'tape';
const proxyquire = require('proxyquire');
import sinon from 'sinon';

const spyHandlers = {
  showDialog: sinon.spy(),
  showManyDialogs: sinon.spy(),
  closeById: sinon.spy(),
  initialState: sinon.spy(),
};

const createReducer = proxyquire('../reducer', {
  './actionHandlers': spyHandlers,
}).default;
const reducer = createReducer();


tape('reducer', test => {
  const state = { items: [] };
  reducer(state, { type: 'SHOW_DIALOG', ...{ a: 1 } });
  test.ok(spyHandlers.showDialog.calledOnce, 'should call "showDialog"');
  test.deepEqual(spyHandlers.showDialog.args[0], [state, { a: 1 }], 'should call "showDialog" with proper args');

  reducer(state, { type: 'SHOW_MANY_DIALOGS', ...{ dialogs: [1, 2, 3] } });
  test.ok(spyHandlers.showManyDialogs.calledOnce, 'should call "showManyDialogs"');
  test.deepEqual(spyHandlers.showManyDialogs.args[0], [state, [1, 2, 3]], 'should call "showManyDialogs" with proper args');

  reducer(state, { type: 'DISMISS_DIALOG' });
  test.ok(spyHandlers.closeById.calledOnce, 'should call "closeById"');

  reducer(state, { type: 'CONFIRM_DIALOG', id: 888 });
  test.ok(spyHandlers.closeById.calledTwice, 'should call "closeById"');
  test.deepEqual(spyHandlers.closeById.args[1], [state, 888], 'should call closeById with proper args');

  test.end();
});
