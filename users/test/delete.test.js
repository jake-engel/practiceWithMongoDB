const assert = require('assert');

const User = require('../src/user');

describe('Deleting a user', () => {
  let joe;
  beforeEach(async () => {
    joe = new User({ name: "Joe"});
    await joe.save();
  });

  const assertUser = async (operation) => {
    await operation;
    const user = await User.findById(joe._id);
    assert(!user);
  };

  it('should model instance remove', async () => {
    await assertUser(joe.remove());
  });

  it('should class method remove', async () => {
    await assertUser(User.remove({ name: "Joe" }));
  });

  it('should findAndRemove', async () => {
    await assertUser(User.findOneAndRemove({ name: "Joe" }));
  });

  it('should findByIdAndRemove', async () => {
    await assertUser(User.findByIdAndRemove(joe._id));
  });
});
