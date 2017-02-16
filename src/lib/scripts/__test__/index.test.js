import tape from 'tape';
import { createDialogActions } from '../';


tape('library exports', test => {
  test.test('createDialogActions', assert => {
    const storeMock = { dispatch: x => x };
    const actions = createDialogActions(storeMock);

    const [id1, id2] = [ actions.showDialog(), actions.showDialog() ];

    assert.ok(Number.isFinite(id1) && Number.isFinite(id2), 'showDialog() should return dialog id, and it should be a number');
    assert.ok(id1 !== id2, 'dialogs ids should be unique');

    const manyIds = actions.showManyDialogs([[], [], []]);

    assert.equal(manyIds.length, 3, 'showManyDialogs() should return ids for all dialogs');
    assert.ok(manyIds.every(Number.isFinite), 'all ids should be numbers');
    assert.ok(
      manyIds[0] !== manyIds[1] &&
      manyIds[0] !== manyIds[2] &&
      manyIds[1] !== manyIds[2],
      'all ids should be unique'
    );

    assert.end();
  });

  test.end();
});
