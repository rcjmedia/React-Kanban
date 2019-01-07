const bookshelf = require('./bookshelf');

const PriorityModel = bookshelf.Model.extend({
    tableName: 'priorities',
    idAttribute: 'id',   
    hasTimestamps: true    
});

module.exports = PriorityModel;