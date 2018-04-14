const assert = require('assert');

const User = require('../src/user');

describe('Validating records', () => {
  it('requires a user name', async () => {
    const user = new User({ name: undefined });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === 'Name is required.');
  });

  it('requires a name longer than 2 characters', async () => {
    const user = new User({ name: 'J' });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === 'Name must be at least 1 character.');
  });

  it('disallows invalid records from being saved', async () => {
    const user = new User({ name: undefined });
    try {
      await user.save()
    } catch (validationResult) {
      const { message } = validationResult.errors.name;
      assert(message === 'Name is required.');
    }
  });
});
