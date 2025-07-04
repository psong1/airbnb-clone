module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Property', {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Property must have an owner'
        },
        isInt: {
          msg: 'User ID must be an integer'
        }
      }
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Property title cannot be empty'
        },
        len: {
          args: [5, 100],
          msg: 'Property title must be between 5 and 100 characters'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Property description cannot be empty'
        },
        len: {
          args: [20, 2000],
          msg: 'Property description must be between 20 and 2000 characters'
        }
      }
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Price is required'
        },
        min: {
          args: [0],
          msg: 'Price cannot be negative'
        },
        max: {
          args: [999999.99],
          msg: 'Price cannot exceed $999,999.99'
        }
      }
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Property address cannot be empty'
        },
        len: {
          args: [5, 255],
          msg: 'Address must be between 5 and 255 characters'
        }
      }
    },
    street: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Street address cannot be empty'
        },
        len: {
          args: [5, 255],
          msg: 'Street address must be between 5 and 255 characters'
        }
      }
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'City cannot be empty'
        },
        len: {
          args: [2, 100],
          msg: 'City must be between 2 and 100 characters'
        },
        is: {
          args: /^[a-zA-Z\s'-]+$/,
          msg: 'City can only contain letters, spaces, hyphens, and apostrophes'
        }
      }
    },
    state: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'State cannot be empty'
        },
        len: {
          args: [2, 50],
          msg: 'State must be between 2 and 50 characters'
        },
        is: {
          args: /^[a-zA-Z\s'-]+$/,
          msg: 'State can only contain letters, spaces, hyphens, and apostrophes'
        }
      }
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Country cannot be empty'
        },
        len: {
          args: [2, 100],
          msg: 'Country must be between 2 and 100 characters'
        },
        is: {
          args: /^[a-zA-Z\s'-]+$/,
          msg: 'Country can only contain letters, spaces, hyphens, and apostrophes'
        }
      }
    },
    zipCode: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Zip code cannot be empty'
        },
        len: {
          args: [3, 20],
          msg: 'Zip code must be between 3 and 20 characters'
        }
      }
    },
    lat: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: true,
      validate: {
        min: {
          args: [-90],
          msg: 'Latitude must be between -90 and 90'
        },
        max: {
          args: [90],
          msg: 'Latitude must be between -90 and 90'
        }
      }
    },
    lng: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: true,
      validate: {
        min: {
          args: [-180],
          msg: 'Longitude must be between -180 and 180'
        },
        max: {
          args: [180],
          msg: 'Longitude must be between -180 and 180'
        }
      }
    },
    amenities: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: {
          args: [0, 2000],
          msg: 'Amenities description must be less than 2000 characters'
        }
      }
    },
    maxGuests: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        notNull: {
          msg: 'Maximum guests is required'
        },
        min: {
          args: [1],
          msg: 'Maximum guests must be at least 1'
        },
        max: {
          args: [50],
          msg: 'Maximum guests cannot exceed 50'
        }
      }
    },
    bathrooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        notNull: {
          msg: 'Number of bathrooms is required'
        },
        min: {
          args: [0],
          msg: 'Number of bathrooms cannot be negative'
        },
        max: {
          args: [20],
          msg: 'Number of bathrooms cannot exceed 20'
        }
      }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      validate: {
        notNull: {
          msg: 'Active status is required'
        }
      }
    }
  }, {
    tableName: 'Property',
    timestamps: true,
    indexes: [
      {
        fields: ['userId']
      },
      {
        fields: ['city', 'state']
      },
      {
        fields: ['price']
      },
      {
        fields: ['isActive']
      },
      {
        fields: ['lat', 'lng']
      }
    ],
    hooks: {
      beforeCreate: (property) => {
        //  title is properly capitalized
        if (property.title) {
          property.title = property.title.charAt(0).toUpperCase() + property.title.slice(1);
        }
        // city and state are properly capitalized
        if (property.city) {
          property.city = property.city.charAt(0).toUpperCase() + property.city.slice(1).toLowerCase();
        }
        if (property.state) {
          property.state = property.state.charAt(0).toUpperCase() + property.state.slice(1).toLowerCase();
        }
      },
      beforeUpdate: (property) => {
        // title is properly capitalized
        if (property.title) {
          property.title = property.title.charAt(0).toUpperCase() + property.title.slice(1);
        }
        // city and state are properly capitalized
        if (property.city) {
          property.city = property.city.charAt(0).toUpperCase() + property.city.slice(1).toLowerCase();
        }
        if (property.state) {
          property.state = property.state.charAt(0).toUpperCase() + property.state.slice(1).toLowerCase();
        }
      }
    }
  });
};
