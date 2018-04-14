const assert = require('assert');

const User = require('../src/user');

describe('Virtual types', () => {
  it('postCount returns number of posts', async () => {
    const joe = new User({ name: 'Joe',
      posts: [
        { title: 'Post Title' },
        { title: 'Another Post Title' },
      ]
    });
    await joe.save();
    const user = await User.findById(joe._id);
    assert(user.postCount === 2);
  });
});
