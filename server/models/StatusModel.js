const bookshelf = require('./bookshelf');

const StatusModel = bookshelf.Model.extend({
    tableName: 'statuses',
    idAttribute: 'id',   
    hasTimestamps: true    
});

module.exports = StatusModel;