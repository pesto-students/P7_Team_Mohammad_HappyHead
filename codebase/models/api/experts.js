// Import Mongoose and bcrypt
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the expertSchema
const expertSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  expertname: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  qualifications: {
    type: String,
    required: true
  },
  yearsOfExperience: {
    type: Number,
    required: true
  },
  speciality: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  availability: [
    {
      day: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        required: true
      },
      date: {
        type: Date,
        required: true
      },
      timeSlots: [
        {
          startTime: {
            type: String,
            required: true
          },
          endTime: {
            type: String,
            required: true
          },
        }
      ]
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  }
});

// Pre-save middleware to hash the password before saving
expertSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    return next();
  } catch (error) {
    return next(error);
  }
});

// Create the Expert model
const Expert = mongoose.model('Expert', expertSchema);

// Export the Expert model
module.exports = Expert;
