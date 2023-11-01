// models/index.js
const User = require('./user')
const User = require('./user')
const Post = require('./post')
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})
Post.belongsTo(User, {
    foreignKey: 'user_id'
})



module.exports = { User, Post }


User.hasMany(Profile, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Profile.belongsTo(User, {
    foreignKey: 'user_id'
});

