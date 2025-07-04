module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Booking', {
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
          msg: 'Booking must have a user'
        },
        isInt: {
          msg: 'User ID must be an integer'
        }
      }
    },
    propertyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Booking must have a property'
        },
        isInt: {
          msg: 'Property ID must be an integer'
        }
      }
    },
    checkIn: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Check-in date is required'
        },
        isDate: {
          msg: 'Check-in must be a valid date'
        },
        isAfterToday(value) {
          if (new Date(value) <= new Date()) {
            throw new Error('Check-in date must be in the future');
          }
        }
      }
    },
    checkOut: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Check-out date is required'
        },
        isDate: {
          msg: 'Check-out must be a valid date'
        },
        isAfterCheckIn(value) {
          if (this.checkIn && new Date(value) <= new Date(this.checkIn)) {
            throw new Error('Checkout date must be after check-in date');
          }
        },
        isAfterToday(value) {
          if (new Date(value) <= new Date()) {
            throw new Error('Checkout date must be in the future');
          }
        }
      }
    },
    totalCost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Total cost is required'
        },
        min: {
          args: [0],
          msg: 'Total cost cannot be negative'
        },
        max: {
          args: [999999.99],
          msg: 'Total cost cannot exceed $999,999.99'
        }
      }
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'cancelled', 'completed'),
      allowNull: false,
      defaultValue: 'pending',
      validate: {
        isIn: {
          args: [['pending', 'confirmed', 'cancelled', 'completed']],
          msg: 'Status must be pending, confirmed, cancelled, or completed'
        }
      }
    },
    numGuests: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Number of guests is required'
        },
        min: {
          args: [1],
          msg: 'Number of guests must be at least 1'
        },
        max: {
          args: [50],
          msg: 'Number of guests cannot exceed 50'
        }
      }
    }
  }, {
    tableName: 'Booking',
    timestamps: true,
    indexes: [
      {
        fields: ['userId']
      },
      {
        fields: ['propertyId']
      },
      {
        fields: ['checkIn', 'checkOut']
      },
      {
        fields: ['status']
      },
      {
        fields: ['userId', 'propertyId']
      }
    ],
    hooks: {
      beforeCreate: (booking) => {
        // Ensure dates are properly formatted
        if (booking.checkIn) {
          booking.checkIn = new Date(booking.checkIn).toISOString().split('T')[0];
        }
        if (booking.checkOut) {
          booking.checkOut = new Date(booking.checkOut).toISOString().split('T')[0];
        }
      },
      beforeUpdate: (booking) => {
        // Ensure dates are properly formatted
        if (booking.checkIn) {
          booking.checkIn = new Date(booking.checkIn).toISOString().split('T')[0];
        }
        if (booking.checkOut) {
          booking.checkOut = new Date(booking.checkOut).toISOString().split('T')[0];
        }
      }
    }
  });
};
