// models/User.js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: { msg: 'First name cannot be empty'
        },
        len: {
          args: [2, 50],
          msg: 'First name must be between 2 and 50 characters'
        },
        is: {
          args: /^[a-zA-Z\s'-]+$/,
          msg: 'First name can only contain letters, spaces, apostrophes, or hyphens.'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Last name cannot be empty'
        },
        len: {
          args: [2, 50],
          msg: 'Last name must be between 2 and 50 characters'
        },
        is: {
          args: /^[a-zA-Z\s'-]+$/,
          msg: 'First name can only contain letters, spaces, apostrophes, or hyphens.'
        }
      }
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: {
        msg: 'Email address is already in use'
      },
      validate: {
        notEmpty: {
          msg: 'Email cannot be empty' },
        isEmail: {
          msg: 'Please enter a valid email address' },
        len: {
          args: [5, 100],
          msg: 'Email must be between 5 -100 characters'
        }
      }
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password cannot be empty'
        },
        len: {
          args: [8, 255],
          msg: 'Password must be at least 8 characters long'
        }
      }
    },
    role: {
      type: DataTypes.ENUM('user', 'host'),
      allowNull: false,
      defaultValue: 'user',
      validate: {
        isIn: {
          args: [['user', 'host']],
          msg: 'Role must be user or host'
        }
      }
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Address cannot be empty'
        },
        len: {
          args: [5, 255],
          msg: 'Address must be between 5 and 255 characters'
        }
      }
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Phone number cannot be empty'
        },
        is: {
          args: /^[\+]?[1-9][\d]{0,15}$/,
          msg: 'Please enter a valid phone number'
        }
      }
    }
  }, {
    tableName: 'User',
    timestamps: true,


    defaultScope: {
      attributes: { exclude: ['password'] }
    },
    indexes: [
      { 
        unique: true,
        fields: ['email']
      },
      {
        fields: ['role']
      }
    ],
    hooks: {
      beforeCreate: async (user) => {
    
        // Hash password before saving
        if (user.password) {
          user.password = await AuthUtils.hashPassword(user.password);
        }
      },
      beforeUpdate: async (user) => {
        // Ensure email is lowercase
        if (user.email) {
          user.email = user.email.toLowerCase();
        }
        // Hash password if it's being updated
        if (user.changed('password')) {
          user.password = await AuthUtils.hashPassword(user.password);
        }
      }
    }
  });
};