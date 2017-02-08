import tape from 'tape';
import * as all from '../actionHandlers';
import unqiueId from 'lodash/uniqueId';
import last from 'lodash/last';
import range from 'lodash/range';

const createDialog = () => ({ id: unqiueId(), component: 1, props: 2 });

tape('action handlers', test => {
  test.test('showDialog', assert => {
    const dlg = createDialog();
    const state = all.showDialog(all.initialState(), dlg);

    assert.equal(last(state.items), dlg, 'should add new dialog to the end of the list');
    assert.end();
  });

  test.test('showManyDialogs', assert => {
    const dlgs = range(5).map(createDialog);
    const state = all.showManyDialogs(all.initialState(), dlgs);

    assert.deepEqual(state.items.slice(-1 * dlgs.length), dlgs, 'should append new dialogs in the given order');
    assert.end();
  });

  test.test('closeById', assert => {
    const dlgs = range(5).map(createDialog);
    const d = dlgs[Math.floor(Math.random() * dlgs.length)];
    let state = all.showManyDialogs(all.initialState(), dlgs);
    state = all.closeById(state, d.id);

    assert.notOk(state.items.find(x => x.id === d.id), 'should remove given dialog');
    assert.end();
  });

  test.end();
});
