import tape from 'tape';
import sinon from 'sinon';
import * as all from '../actionHandlers';
import createDialogStore from '../dialogStore';

const {
  initialState,
  handleShowDialogStack,
  handleShowDialogQueue,
  handleShowManyDialogsStack,
  handleShowManyDialogsQueue,
} = all;

tape('dialogStore', test => {
  test.test('action: showDialog (stack mode)', assert => {
    const state = initialState();
    const dialog1 = { component: 'a', props: 1 };
    const state1 = handleShowDialogStack(state, dialog1);
    assert.deepEqual(state1.dialogOnTop, dialog1, 'should display given dialog');

    const dialog2 = { component: 'b', props: 2 };
    const state2 = handleShowDialogStack(state1, dialog2);
    assert.equal(state2.pendingDialogs.length, 2, 'two dialogs should be pending');
    assert.deepEqual(state2.dialogOnTop, dialog2, 'second dialog should be on top');

    assert.end();
  });

  test.test('action: showDialog (queue mode)', assert => {
    const state = initialState();
    const dialog1 = { component: 'a', props: 1 };
    const state1 = handleShowDialogQueue(state, dialog1);
    assert.deepEqual(state1.dialogOnTop, dialog1, 'should display given dialog');

    const dialog2 = { component: 'b', props: 2 };
    const state2 = handleShowDialogQueue(state1, dialog2);
    assert.equal(state2.pendingDialogs.length, 2, 'two dialogs should be pending');
    assert.deepEqual(state2.dialogOnTop, dialog1, 'first dialog should be still on top');
    assert.deepEqual(state2.pendingDialogs[1], dialog2, 'second dialog should be pending');

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
    assert.deepEqual(state2, state1, 'n show dialog actions should produce the ame result as one show many dialog action');

    const state3 = handleShowManyDialogsStack(
      handleShowDialogStack(initialState(), dialog1),
      { dialogs: [dialog2, dialog3]}
    );
    assert.deepEqual(state3, state1, 'n show dialog actions should produce the ame result as one show many dialog action');

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
    assert.deepEqual(state2, state1, 'n show dialog actions should produce the ame result as one show many dialog action');

    const state3 = handleShowManyDialogsQueue(
      handleShowDialogQueue(initialState(), dialog1),
      { dialogs: [dialog2, dialog3]}
    );
    assert.deepEqual(state3, state1, 'n show dialog actions should produce the ame result as one show many dialog action');

    assert.end();
  });

  test.test('store reducer (stack mode)', assert => {
    const store = createDialogStore({ mode: 'stack' });
    let spy = sinon.spy(all, 'handleShowDialogStack');

    store.dispatch({ type: 'SHOW_DIALOG' });
    assert.ok(spy.calledOnce, 'should call show dialog action handler');
    all.handleShowDialogStack.restore();

    spy = sinon.spy(all, 'handleShowManyDialogsStack');
    store.dispatch({ type: 'SHOW_MANY_DIALOGS', dialogs: [] });
    assert.ok(spy.calledOnce, 'should call show many dialogs handler');
    all.handleShowManyDialogsStack.restore();

    assert.end();
  });

  test.test('store reducer (queue mode)', assert => {
    const store = createDialogStore({ mode: 'queue' });
    let spy = sinon.spy(all, 'handleShowDialogQueue');

    store.dispatch({ type: 'SHOW_DIALOG' });
    assert.ok(spy.calledOnce, 'should call show dialog action handler');
    all.handleShowDialogQueue.restore();

    spy = sinon.spy(all, 'handleShowManyDialogsQueue');
    store.dispatch({ type: 'SHOW_MANY_DIALOGS', dialogs: [] });
    assert.ok(spy.calledOnce, 'should call show many dialogs handler');
    all.handleShowManyDialogsQueue.restore();

    assert.end();
  });


  test.end();
});
