module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Review', {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    propertyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Review must be associated with a property'
        },
        isInt: {
          msg: 'Property ID must be an integer'
        }
      }
    },
    reviewerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Review must have a reviewer'
        },
        isInt: {
          msg: 'Reviewer ID must be an integer'
        }
      }
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Rating is required'
        },
        min: {
          args: [1],
          msg: 'Rating must be at least 1 star'
        },
        max: {
          args: [5],
          msg: 'Rating cannot exceed 5 stars'
        },
        isInt: {
          msg: 'Rating must be a whole number'
        }
      }
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Review comment cannot be empty'
        },
        len: {
          args: [10, 1000],
          msg: 'Review comment must be between 10 and 1000 characters'
        }
      }
    }
  }, {
    tableName: 'Review',
    timestamps: true,
    indexes: [
      {
        fields: ['propertyId']
      },
      {
        fields: ['reviewerId']
      },
      {
        fields: ['rating']
      },
      {
        fields: ['createdAt']
      },
      {
        unique: true,
        fields: ['propertyId', 'reviewerId'],
        name: 'unique_property_reviewer'
      }
    ],
    hooks: {
      beforeCreate: (review) => {
        // Ensure rating is an integer
        if (review.rating) {
          review.rating = Math.round(review.rating);
        }
      },
      beforeUpdate: (review) => {
        // Ensure rating is an integer
        if (review.rating) {
          review.rating = Math.round(review.rating);
        }
      }
    }
  });
};
