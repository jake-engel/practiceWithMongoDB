const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = require('./postSchema');

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required.'],
    validate: {
      validator: (name) => name.length > 1,
      message: 'Name must be at least 1 character.'
    }
  },
  posts: [PostSchema],
  age: Number,
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'blogPost'
  }]
});

UserSchema.virtual('postCount').get(function() {
  return this.posts.length;
});

UserSchema.pre('remove', async function(next) {
  // You don't want import statement at top otherwise user/blogPost.js will require eachother,
  // which will end up in a cyclic dependency
  const BlogPost = mongoose.model('blogPost');
  await BlogPost.remove({ _id: {
    $in: this.blogPosts
  }});
  next();
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
