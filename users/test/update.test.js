const assert = require('assert');

const User = require('../src/user');

describe('Updating a user', () => {
  let joe;
  beforeEach(async () => {
    joe = new User({ name: "Joe", age: 20 });
    await joe.save();
  });

  const assertName = async (operation) => {
    await operation;
    const users = await User.find({});
    assert(users.length === 1);
    assert(users[0].name === "Alex" );
  };

  it('instance type using set and save', async () => {
    joe.set('name', 'Alex');
    await assertName(joe.save());
  });

  it('model instance can update', async () => {
    await assertName(joe.update({ name: 'Alex' }));
  });

  it('A model class can update', async () => {
    await assertName(User.update({ name: 'Joe' }, { name: 'Alex' }));
  });

  it('A model class can update one record', async () => {
    await assertName(User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' }));
  });

  it('A model class can find record by Id and update', async () => {
    await assertName(User.findByIdAndUpdate(joe._id, { name: 'Alex' }));
  });

  it('A user can have their postCount incremented by one', async () => {
    await User.update({ name: 'Joe' }, { $inc: { age: 1 } });
    const user = await User.findOne({ name: 'Joe' });
    assert(user.age === 21);
  });
});
