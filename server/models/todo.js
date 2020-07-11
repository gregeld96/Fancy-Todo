'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Todo.belongsTo(models.User, {foreignKey: "userId"})
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Title cannot be empty"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Description cannot be empty"
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Status cannot be empty"
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isDate: {
          msg: "Must be in date format"
        },
        notEmpty: {
          msg: "Date cannot be empty"
        },
        isAfter: {
          args: new Date().toISOString().slice(0, 10),
          msg: "Due date cannot before today"
        }
      }
    },
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
    hooks: {
      beforeValidate: (data) => {
        let title = data.title;
        let newFormated = '';
        for(let i = 0; i < title.length; i++){
          if(i === 0){
            newFormated += title[i].toUpperCase();
          } else if (title[i-1] === " "){
            newFormated += title[i].toUpperCase(); 
          } else {
            newFormated += title[i]
          }
        }
        data.title = newFormated;
      }
    }
  });
  return Todo;
};