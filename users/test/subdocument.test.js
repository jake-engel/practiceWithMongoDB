const assert = require('assert');

const User = require('../src/user');

describe('Subdocuments', () => {
  it('can create a subdocument', async () => {
    const joe = new User({ name: 'Joe',
      posts: [
        { title: 'Post Title' },
        { title: 'Another Post Title' },
      ]
    });
    await joe.save();
    const user = await User.findById(joe._id);
    assert(user.posts.length === 2);
    assert(user.posts[0].title === 'Post Title');
    assert(user.posts[1].title === 'Another Post Title');
  });

  it('can add subdocuments to an existing record', async () => {
    const joe = new User({ name: 'Joe', posts: [] });
    await joe.save();
    let user = await User.findById(joe._id);
    user.posts.push({ title: 'New Post' });
    await user.save();
    user = await User.findById(joe._id);
    assert(user.posts[0].title === 'New Post');
  });

  it('can remove subdocuments to an existing record', async () => {
    const joe = new User({ name: 'Joe',
      posts: [
        { title: 'Post Title' }
      ]
    });
    await joe.save();
    let user = await User.findById(joe._id);
    user.posts[0].remove();
    await user.save();
    user = await User.findById(joe._id);
    assert(user.posts.length === 0);
  });
});
