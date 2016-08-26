import tape from 'tape';
import sinon from 'sinon';
import * as all from '../actionHandlers';
import createDialogistaReducer from '../reducer';
import { createStore } from 'redux';

const {
  initialState,
  handleShowDialogStack,
  handleShowDialogQueue,
  handleShowManyDialogsStack,
  handleShowManyDialogsQueue,
} = all;

function getThreeDialogs() {
  const dialog1 = { component: 'a', props: 1 };
  const dialog2 = { component: 'b', props: 2 };
  const dialog3 = { component: 'c', props: 3 };

  return [dialog1, dialog2, dialog3];
}

const withoutKey = ({ key, ...rest }) => rest;

const stateWithoutDialogKeys = state => {
  const { dialogOnTop, pendingDialogs } = state;
  return {
    ...state,
    dialogOnTop: withoutKey(dialogOnTop),
    pendingDialogs: pendingDialogs.map(withoutKey),
  };
};

tape('dialogStore', test => {
  test.test('action: showDialog (stack mode)', assert => {
    const state = initialState();
    const dialog1 = { component: 'a', props: 1 };
    const state1 = handleShowDialogStack(state, dialog1);
    assert.deepEqual(withoutKey(state1.dialogOnTop), dialog1, 'should display given dialog');

    const dialog2 = { component: 'b', props: 2 };
    const state2 = handleShowDialogStack(state1, dialog2);
    assert.equal(state2.pendingDialogs.length, 2, 'two dialogs should be pending');
    assert.deepEqual(withoutKey(state2.dialogOnTop), dialog2, 'second dialog should be on top');

    assert.end();
  });

  test.test('action: showDialog (queue mode)', assert => {
    const state = initialState();
    const dialog1 = { component: 'a', props: 1 };
    const state1 = handleShowDialogQueue(state, dialog1);
    assert.deepEqual(withoutKey(state1.dialogOnTop), dialog1, 'should display given dialog');

    const dialog2 = { component: 'b', props: 2 };
    const state2 = handleShowDialogQueue(state1, dialog2);
    assert.equal(state2.pendingDialogs.length, 2, 'two dialogs should be pending');
    assert.deepEqual(withoutKey(state2.dialogOnTop), dialog1, 'first dialog should be still on top');
    assert.deepEqual(withoutKey(state2.pendingDialogs[1]), dialog2, 'second dialog should be pending');

    assert.end();
  });

  test.test('action: showManyDialogs (stack mode)', assert => {
    const dialog1 = { component: 'a', props: 1 };
    const dialog2 = { component: 'b', props: 2 };
    const dialog3 = { component: 'c', props: 3 };

    const state1 = [dialog1, dialog2, dialog3].reduce((prevState, nextDialog) => {
      return handleShowDialogStack(prevState, nextDialog);
    }, initialState());

    const state2 = handleShowManyDialogsStack(initialState(), { dialogs: [dialog1, dialog2, dialog3] });
    assert.deepEqual(
      stateWithoutDialogKeys(state2),
      stateWithoutDialogKeys(state1),
      'show dialog actions should produce the same result as one show many dialog action'
    );

    const state3 = handleShowManyDialogsStack(
      handleShowDialogStack(initialState(), dialog1),
      { dialogs: [dialog2, dialog3]}
    );
    assert.deepEqual(
      stateWithoutDialogKeys(state3),
      stateWithoutDialogKeys(state1),
      'show dialog actions should produce the same result as one show many dialog action'
    );

    assert.end();
  });

  test.test('action: showManyDialogs (queue mode)', assert => {
    const dialog1 = { component: 'a', props: 1 };
    const dialog2 = { component: 'b', props: 2 };
    const dialog3 = { component: 'c', props: 3 };

    const state1 = [dialog1, dialog2, dialog3].reduce((prevState, nextDialog) => {
      return handleShowDialogQueue(prevState, nextDialog);
    }, initialState());

    const state2 = handleShowManyDialogsQueue(initialState(), { dialogs: [dialog1, dialog2, dialog3] });
    assert.deepEqual(
      stateWithoutDialogKeys(state2),
      stateWithoutDialogKeys(state1),
      'show dialog actions should produce the same result as one show many dialog action'
    );

    const state3 = handleShowManyDialogsQueue(
      handleShowDialogQueue(initialState(), dialog1),
      { dialogs: [dialog2, dialog3]}
    );
    assert.deepEqual(
      stateWithoutDialogKeys(state3),
      stateWithoutDialogKeys(state1),
      'show dialog actions should produce the same result as one show many dialog action'
    );

    assert.end();
  });

  test.test('dismiss or confirm dialog', assert => {
    const store = createStore(createDialogistaReducer({ mode: 'stack' }));

    store.dispatch({ type: 'SHOW_MANY_DIALOGS', dialogs: getThreeDialogs() });
    store.dispatch({ type: 'DISMISS_DIALOG' });
    const [dialog1, dialog2] = getThreeDialogs();
    assert.deepEqual(store.getState().dialogOnTop, dialog2, 'second dialog should be on top');
    assert.deepEqual(store.getState().pendingDialogs, [dialog2, dialog1], 'last to dialogs should be pending');

    store.dispatch({ type: 'CONFIRM_DIALOG' });
    assert.deepEqual(store.getState().dialogOnTop, dialog1, 'first dialog should be on top');
    assert.deepEqual(store.getState().pendingDialogs, [dialog1], 'one dialog should be left pending');

    assert.end();
  });

  test.test('store reducer (stack mode)', assert => {
    const store = createStore(createDialogistaReducer({ mode: 'stack' }));
    let spy = sinon.spy(all, 'handleShowDialogStack');

    store.dispatch({ type: 'SHOW_DIALOG' });
    assert.ok(spy.calledOnce, 'should call show dialog action handler');
    all.handleShowDialogStack.restore();

    spy = sinon.spy(all, 'handleShowManyDialogsStack');
    store.dispatch({ type: 'SHOW_MANY_DIALOGS', dialogs: [] });
    assert.ok(spy.calledOnce, 'should call show many dialogs handler');
    all.handleShowManyDialogsStack.restore();

    spy = sinon.spy(all, 'handleCloseDialog');
    store.dispatch({ type: 'DISMISS_DIALOG' });
    assert.ok(spy.calledOnce, 'should call close dialog handler');
    store.dispatch({ type: 'CONFIRM_DIALOG' });
    assert.ok(spy.calledTwice, 'should call close dialog handler');
    all.handleCloseDialog.restore();

    assert.end();
  });

  test.test('store reducer (queue mode)', assert => {
    const store = createStore(createDialogistaReducer({ mode: 'queue' }));
    let spy = sinon.spy(all, 'handleShowDialogQueue');

    store.dispatch({ type: 'SHOW_DIALOG' });
    assert.ok(spy.calledOnce, 'should call show dialog action handler');
    all.handleShowDialogQueue.restore();

    spy = sinon.spy(all, 'handleShowManyDialogsQueue');
    store.dispatch({ type: 'SHOW_MANY_DIALOGS', dialogs: [] });
    assert.ok(spy.calledOnce, 'should call show many dialogs handler');
    all.handleShowManyDialogsQueue.restore();

    spy = sinon.spy(all, 'handleCloseDialog');
    store.dispatch({ type: 'DISMISS_DIALOG' });
    assert.ok(spy.calledOnce, 'should call close dialog handler');
    store.dispatch({ type: 'CONFIRM_DIALOG' });
    assert.ok(spy.calledTwice, 'should call close dialog handler');
    all.handleCloseDialog.restore();

    assert.end();
  });


  test.end();
});
