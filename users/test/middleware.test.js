const mongoose = require('mongoose');
const assert = require('assert');

const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middleware', () => {
  let joe, blogPost;
  beforeEach(async () => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({ title: 'JS is great', content: 'Yep it really is' });
    joe.blogPosts.push(blogPost);

    await Promise.all([joe.save(), blogPost.save()]);
  });

  it('users clean up dangling blogposts on remove', async () => {
    await joe.remove();
    const blogPostCount = await BlogPost.count();
    assert(blogPostCount === 0);
  });
});
