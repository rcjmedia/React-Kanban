const bookshelf = require('./bookshelf');

const UserModel = bookshelf.Model.extend({
    tableName: 'users',
    idAttribute: 'id',
    hasTimestamps: true    
});

module.exports = UserModel;