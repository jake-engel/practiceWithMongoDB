const assert = require('assert');

const User = require('../src/user');

describe('Creating Records', () => {
  it('saves a user', async () => {
    const joe = new User({ name: "Joe" });
    await joe.save();
    // isNew is mocha property. If only in mocha then isNew === false.
    // if in mocha and mongo then isNew === true
    assert(!joe.isNew);
  });
});
