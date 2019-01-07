const bookshelf = require('./bookshelf');
const UserModel = require('./UserModel.js');
const StatusModel = require('./StatusModel.js');
const PriorityModel = require('./PriorityModel.js');

const CardModel = bookshelf.Model.extend({
    tableName: 'cards',
      priority_id: function () {
        return this.belongsTo(PriorityModel, "priority_id");
      },
      status_id: function () {
        return this.belongsTo(StatusModel, "status_id");
      },
      created_by: function () {
        return this.belongsTo(UserModel, "created_by");
      },
      assigned_to: function () {
        return this.belongsTo(UserModel, "assigned_to");
      },
    idAttribute: 'id',   
    hasTimestamps: true
});

module.exports = CardModel;