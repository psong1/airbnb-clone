module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Image', {
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
          msg: 'Image must be associated with a property'
        },
        isInt: {
          msg: 'Property ID must be an integer'
        }
      }
    },
    url: {
      type: DataTypes.STRING(500),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Image URL cannot be empty'
        },
        isUrl: {
          msg: 'Please provide a valid image URL'
        },
        len: {
          args: [10, 500],
          msg: 'Image URL must be between 10 and 500 characters'
        },
        isImageUrl(value) {
          const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
          const hasValidExtension = imageExtensions.some(ext => 
            value.toLowerCase().includes(ext)
          );
          if (!hasValidExtension) {
            throw new Error('Image URL must point to a valid image file (jpg, jpeg, png, gif, webp, svg)');
          }
        }
      }
    },
    altText: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: {
        len: {
          args: [0, 255],
          msg: 'Alt text must be less than 255 characters'
        }
      }
    },
    isPrimary: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        notNull: {
          msg: 'Primary image status is required'
        }
      }
    },
    orderIndex: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        notNull: {
          msg: 'Order index is required'
        },
        min: {
          args: [0],
          msg: 'Order index cannot be negative'
        },
        max: {
          args: [999],
          msg: 'Order index cannot exceed 999'
        }
      }
    }
  }, {
    tableName: 'Image',
    timestamps: true,
    indexes: [
      {
        fields: ['propertyId']
      },
      {
        fields: ['isPrimary']
      },
      {
        fields: ['orderIndex']
      },
      {
        fields: ['propertyId', 'orderIndex']
      }
    ],
    hooks: {
      beforeCreate: (image) => {
        // URL properly formatted
        if (image.url) {
          image.url = image.url.trim();
        }
        // alt text is properly formatted
        if (image.altText) {
          image.altText = image.altText.trim();
        }
      },
      beforeUpdate: (image) => {
        //  URL is properly formatted
        if (image.url) {
          image.url = image.url.trim();
        }
        // alt text is properly formatted
        if (image.altText) {
          image.altText = image.altText.trim();
        }
      }
    }
  });
};
