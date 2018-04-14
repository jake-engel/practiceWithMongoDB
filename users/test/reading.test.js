const assert = require('assert');

const User = require('../src/user');

describe('Reading users out of database', () => {
  let joe, maria, alex, zach;
  beforeEach(async () => {
    joe = new User({ name: 'Joe'});
    maria = new User({ name: 'Maria'});
    alex = new User({ name: 'Alex'});
    zach = new User({ name: 'Zach'});
    await Promise.all([joe.save(), alex.save(), maria.save(), zach.save()]);
  });

  it('finds all users with the name of joe', async () => {
    const user = await User.findOne({ name: 'Joe' });
    // Need toString because ._id returns an ObjectID, not a plain string
    assert(user._id.toString() === joe._id.toString());
  });

  it('finds all users a certain id', async () => {
    const user = await User.findById(joe._id);
    // Need toString because ._id returns an ObjectID, not a plain string
    assert(user._id.toString() === joe._id.toString());
    assert(user.name === 'Joe');
  });

  it('can skip and limit the result set', async () => {
    const users = await User.find({})
      .sort({ name: 1 })
      .skip(1)
      .limit(2);
    assert(users[0].name === 'Joe');
    assert(users[1].name === 'Maria');
    assert(users.length === 2);
  });
});
