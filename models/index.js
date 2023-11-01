// models/index.js
const User = require('./user')


User.hasMany(Profile, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Profile.belongsTo(User, {
    foreignKey: 'user_id'
});


module.exports = { User }