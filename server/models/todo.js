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
      // define association here
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
        // statusCond(input) {
        //   if(input.toLowerCase() != "pending" || input.toLowerCase() != "on-going" || input.toLowerCase() != "late" || input != "done"){
        //     throw new Error(`use pending, on-going, late or done format`)
        //   }
        // },
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
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};