const mongoose = require('mongoose');
const assert = require('assert');

const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
  let joe, blogPost, comment;
  beforeEach(async () => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({ title: 'JS is great', content: 'Yep it really is' });
    comment = new Comment({ content: 'Congrats on a great post!' });
    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.author = joe;

    // Below it won't end the beforeEach until all three of the save functions are executed (due to Promise.all)
    await Promise.all([joe.save(), blogPost.save(), comment.save()]);
  });

  it('saves a relation between a user and a blogpost', async () => {
    // populate is used as a modifier on the query to populate the BlogPosts with the full object, not just the id (eager loading)
    const user = await User.findById(joe._id).populate('blogPosts');
    assert(user.blogPosts[0].title === 'JS is great');
    assert(user.blogPosts[0].content === 'Yep it really is');
  });

  it('saves a full relation graph', async () => {
    const user = await User.findById(joe._id).populate({
      path: 'blogPosts',
      populate: {
        path: 'comments',
        model: 'comment',
        populate: {
          path: 'author',
          model: 'user'
        }
      }
    });
    assert(user.name === 'Joe');
    assert(user.blogPosts[0].title === 'JS is great')
    assert(user.blogPosts[0].content === 'Yep it really is');
    assert(user.blogPosts[0].comments[0].content === 'Congrats on a great post!');
    assert(user.blogPosts[0].comments[0].author.name === 'Joe');
  });
});
